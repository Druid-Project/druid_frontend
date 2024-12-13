import { sendMtcIdToBackend } from "../api/mautic_api_services"; // Import the function
import { fetchTaxonomyTerms } from "./fetchTaxonomyTerm";

// Function to fetch taxonomy terms
export const fetchTerms = async (hero, baseUrl) => {
  const taxonomyTermIds = hero?.relationships?.field_visible_to?.data?.map(term => term.id) || [];
  const terms = await fetchTaxonomyTerms(baseUrl, taxonomyTermIds);
  const termNames = terms.map(term => term.name);
  console.log('Taxonomy term list', termNames);
  return termNames;
};

// Function to match segments and terms
export const matchSegmentsAndTerms = async (hero, baseUrl) => {
  const segmentNames = await sendMtcIdToBackend();
  if (!Array.isArray(segmentNames)) {
    console.error("Expected segmentNames to be an array, but got:", segmentNames);
    return false;
  }
  const termNames = await fetchTerms(hero, baseUrl);
  const matchedNames = segmentNames.filter(name => termNames.includes(name));
  console.log('Matched names:', matchedNames);
  return matchedNames.length > 0;
};

// Function to filter matched heroes
export const filterMatchedHeroes = async (heroSections, baseUrl, fetchBackgroundImage) => {
  const matched = [];
  for (const hero of heroSections) {
    const isMatched = await matchSegmentsAndTerms(hero, baseUrl);
    if (isMatched) {
      matched.push(hero);
      fetchBackgroundImage(hero);
    }
  }

  if (matched.length === 0) {
    const fallbackHeroes = heroSections.filter(hero => {
      const termNames = hero.relationships.field_visible_to?.data?.map(term => term.name) || [];
      return termNames.length === 0 || termNames.includes("visitor");
    });
    fallbackHeroes.forEach(hero => fetchBackgroundImage(hero));
    return fallbackHeroes;
  } else {
    return matched;
  }
};
