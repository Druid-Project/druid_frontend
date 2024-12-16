import { fetchTaxonomyTermData } from "../redux/contentSlice";

export const fetchTaxonomyTerms = async (dispatch, taxonomyTermIds) => {
  if (!Array.isArray(taxonomyTermIds)) {
    console.error("taxonomyTermIds should be an array");
    return [];
  }

  try {
    const terms = await Promise.all(
      taxonomyTermIds.map(async (id) => {
        const response = await dispatch(fetchTaxonomyTermData(id));
        return { id, name: response.payload.data.attributes.name };
      })
    );
    console.log("Fetched taxonomy terms:", terms);
    return terms;
  } catch (error) {
    console.error("Failed to fetch taxonomy terms:", error);
    return [];
  }
};
