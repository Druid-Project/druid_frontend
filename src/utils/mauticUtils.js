import { sendMtcIdToBackend } from "../api/mautic_api_services";
import { fetchTaxonomyTerms } from "./fetchTaxonomyTerm";

// Function to fetch taxonomy terms
export const fetchTerms = async (heroSections, dispatch) => {
  const termsWithIds = await Promise.all(heroSections.map(async (hero) => {
    const taxonomyTermIds = hero?.relationships?.field_visible_to?.data?.map(term => term.id) || [];
    const terms = await fetchTaxonomyTerms(dispatch, taxonomyTermIds);
    const termNames = terms.map(term => term.name);
    return { id: hero.id, termNames };
  }));
  console.log('Terms with IDs:', termsWithIds);
  return termsWithIds;
};

// Function to match segments and terms
export const matchSegmentsAndTerms = async (termsWithIds, segmentNames) => {
  const matchedHeroes = termsWithIds.filter(({ termNames }) => {
    const matchedNames = segmentNames.filter(name => termNames.includes(name));
    return matchedNames.length > 0;
  });
  console.log('Matched heroes:', matchedHeroes);
  return matchedHeroes.map(({ id }) => id);
};

// Function to filter matched heroes
export const filterMatchedHeroes = async (heroSections, dispatch, fetchBackgroundImage) => {
  const segmentNames = await sendMtcIdToBackend();
  if (!Array.isArray(segmentNames)) {
    console.error("Expected segmentNames to be an array, but got:", segmentNames);
    return [];
  }

  const termsWithIds = await fetchTerms(heroSections, dispatch);
  const matchedHeroIds = await matchSegmentsAndTerms(termsWithIds, segmentNames);

  const matchedHeroes = heroSections.filter(hero => matchedHeroIds.includes(hero.id));
  matchedHeroes.forEach(hero => fetchBackgroundImage(hero));

  if (matchedHeroes.length === 0) {
    const fallbackHeroes = heroSections.filter(hero => {
      const termNames = hero.relationships.field_visible_to?.data?.map(term => term.name) || [];
      return termNames.length === 0 || termNames.includes("visitor");
    });

    if (fallbackHeroes.length > 0) {
      fallbackHeroes.forEach(hero => fetchBackgroundImage(hero));
      return fallbackHeroes;
    } else {
      // If no "visitor" hero section is found, return the first hero section as a fallback
      const firstHero = heroSections[0];
      if (firstHero) {
        fetchBackgroundImage(firstHero);
        return [firstHero];
      }
    }
  } else {
    return matchedHeroes;
  }
};
