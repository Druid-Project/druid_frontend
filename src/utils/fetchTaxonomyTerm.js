import { fetchTaxonomyTermData } from "../redux/slices/contentSlice";

export const fetchTaxonomyTerms = async (dispatch, taxonomyTermIds) => {
  if (!Array.isArray(taxonomyTermIds)) {
    console.error("taxonomyTermIds should be an array");
    return [];
  }

  try {
    const terms = await Promise.all(
      taxonomyTermIds.map(async (id) => {
        const response = await dispatch(fetchTaxonomyTermData(id));
        const { name } = response.payload.data.attributes;
        return { id, name };
      })
    );
    return terms;
  } catch (error) {
    console.error("Failed to fetch taxonomy terms:", error);
    return [];
  }
};
