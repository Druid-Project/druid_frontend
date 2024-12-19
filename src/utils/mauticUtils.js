import { sendMtcIdToBackend } from "../api/mautic_api_services";
import { fetchTaxonomyTerms } from "./fetchTaxonomyTerm";

// Fetch taxonomy terms for hero sections
const fetchTerms = async (heroSections, dispatch) => {
  const termsWithIds = await Promise.all(
    heroSections.map(async (hero) => {
      const taxonomyTermIds = hero?.relationships?.field_visible_to?.data?.map((term) => term.id) || [];
      const terms = await fetchTaxonomyTerms(dispatch, taxonomyTermIds);
      return { id: hero.id, termNames: terms.map((term) => term.name) };
    })
  );
  return termsWithIds;
};

// Match segments and terms
const matchSegmentsAndTerms = (termsWithIds, segmentNames) => {
  return termsWithIds
    .filter(({ termNames }) => segmentNames.some((name) => termNames.includes(name)))
    .map(({ id }) => id);
};

// Fetch segment names from backend
const getSegmentNames = async () => {
  const segmentNames = await sendMtcIdToBackend();
  if (!Array.isArray(segmentNames)) {
    console.error("Expected segmentNames to be an array, but got:", segmentNames);
    return [];
  }
  return segmentNames;
};

// Find the first matched hero section
const findFirstMatchedHero = (heroSections, matchedHeroIds, fetchBackgroundImage) => {
  const matchedHeroes = heroSections.filter((hero) => matchedHeroIds.includes(hero.id));
  if (matchedHeroes.length > 0) {
    const firstMatchedHero = matchedHeroes[0];
    fetchBackgroundImage(firstMatchedHero);
    return [firstMatchedHero];
  }
  return [];
};

// Find the visitor hero section
const findVisitorHero = (heroSections, termsWithIds, fetchBackgroundImage) => {
  const visitorHero = termsWithIds.find(({ termNames }) => termNames.includes("visitor"));
  if (visitorHero) {
    const hero = heroSections.find((hero) => hero.id === visitorHero.id);
    fetchBackgroundImage(hero);
    return [hero];
  }
  return [];
};

// Fallback to the first hero section
const fallbackToFirstHero = (heroSections, fetchBackgroundImage) => {
  const firstHero = heroSections[0];
  if (firstHero) {
    fetchBackgroundImage(firstHero);
    return [firstHero];
  }
  return [];
};

// Filter matched heroes
export const filterMatchedHeroes = async (heroSections, dispatch, fetchBackgroundImage) => {
  const segmentNames = await getSegmentNames();
  const termsWithIds = await fetchTerms(heroSections, dispatch);
  const matchedHeroIds = matchSegmentsAndTerms(termsWithIds, segmentNames);

  let matchedHero = findFirstMatchedHero(heroSections, matchedHeroIds, fetchBackgroundImage);
  if (matchedHero.length > 0) return matchedHero;

  matchedHero = findVisitorHero(heroSections, termsWithIds, fetchBackgroundImage);
  if (matchedHero.length > 0) return matchedHero;

  return fallbackToFirstHero(heroSections, fetchBackgroundImage);
};
