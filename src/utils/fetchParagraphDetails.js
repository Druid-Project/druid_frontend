import { fetchContent } from "../api/api";

export const fetchParagraphDetails = async (paragraphType, paragraphId) => {
  try {
    const url = `jsonapi/paragraph/${paragraphType}/${paragraphId}`;
    const response = await fetchContent(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${paragraphType} details:`, error);
    return null;
  }
};
