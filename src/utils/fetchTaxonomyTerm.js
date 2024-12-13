export const fetchTaxonomyTerms = async (baseUrl, taxonomyTermIds) => {
  if (!Array.isArray(taxonomyTermIds)) {
    console.error("taxonomyTermIds should be an array");
    return [];
  }

  try {
    const promises = taxonomyTermIds.map(async (id) => {
      const response = await fetch(
        `${baseUrl}/jsonapi/taxonomy_term/mautic_segments/${id}`
      );
      const result = await response.json();
      return { id, name: result.data.attributes.name };
    });

    const terms = await Promise.all(promises);
    return terms;
  } catch (error) {
    console.error("Failed to fetch taxonomy terms:", error);
    return [];
  }
};
