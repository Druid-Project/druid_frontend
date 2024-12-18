import axios from "axios";
import { baseUrl } from "../config";

export const fetchAuthorDetails = async (authorId) => {
  try {
    const response = await axios.get(`${baseUrl}/jsonapi/user/user/${authorId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching author details:", error);
    return null;
  }
};
