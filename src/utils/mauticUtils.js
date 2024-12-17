import { sendMtcIdToBackend } from "../api/mautic_api_services";
import { fetchTaxonomyTerms } from "./fetchTaxonomyTerm";

// Function to fetch taxonomy terms for hero sections
const fetchTerms = async (heroSections, dispatch) => {
  const termsWithIds = await Promise.all(
    heroSections.map(async (hero) => {
      const taxonomyTermIds =
        hero?.relationships?.field_visible_to?.data?.map((term) => term.id) ||
        [];
      const terms = await fetchTaxonomyTerms(dispatch, taxonomyTermIds);
      return { id: hero.id, termNames: terms.map((term) => term.name) };
    })
  );
  return termsWithIds;
};

// Function to match segments and terms
const matchSegmentsAndTerms = (termsWithIds, segmentNames) => {
  return termsWithIds
    .filter(({ termNames }) =>
      segmentNames.some((name) => termNames.includes(name))
    )
    .map(({ id }) => id);
};

// Function to filter matched heroes
export const filterMatchedHeroes = async (
  heroSections,
  dispatch,
  fetchBackgroundImage
) => {
  const segmentNames = await sendMtcIdToBackend();
  if (!Array.isArray(segmentNames)) {
    console.error("Expected segmentNames to be an array, but got:", segmentNames);
    return [];
  }

  const termsWithIds = await fetchTerms(heroSections, dispatch);
  const matchedHeroIds = matchSegmentsAndTerms(termsWithIds, segmentNames);

  const matchedHeroes = heroSections.filter((hero) =>
    matchedHeroIds.includes(hero.id)
  );
  if (matchedHeroes.length > 0) {
    const firstMatchedHero = matchedHeroes[0];
    fetchBackgroundImage(firstMatchedHero);
    return [firstMatchedHero];
  }

  const visitorHero = termsWithIds.find(({ termNames }) =>
    termNames.includes("visitor")
  );
  if (visitorHero) {
    const hero = heroSections.find((hero) => hero.id === visitorHero.id);
    fetchBackgroundImage(hero);
    return [hero];
  }

  // If no "visitor" hero section is found, return the first hero section as a fallback
  const firstHero = heroSections[0];
  if (firstHero) {
    fetchBackgroundImage(firstHero);
    return [firstHero];
  }

  return [];
};
