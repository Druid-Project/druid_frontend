import axios from "axios";
import { baseUrl } from "../config";
import { fetchContent } from "../api/api";

export const fetchParagraphDetails = async (paragraphType, paragraphId) => {
  try {
    const response = await fetchContent(`jsonapi/paragraph/${paragraphType}/${paragraphId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${paragraphType} details:`, error);
    return null;
  }
};
