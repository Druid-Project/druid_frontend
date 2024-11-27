import axios from "axios";
import { baseURL } from "../config";

const API_URL = `${baseURL}/jsonapi`;

export const fetchContent = async (contentType) => {
  try {
    const response = await axios.get(`${API_URL}/${contentType}`);
    console.log(`Respsonse: ${response}`);
    return response.data;
  } catch (e) {
    console.error(`Error fetching ${contentType}: ${e}`);
    throw e;
  }
};

export const fetchContentById = async (contentType, id) => {
  try {
    const response = await axios.get(`${API_URL}/${contentType}/${id}`);
    console.log(`Respsonse: ${response}`);
    return response.data;
  } catch (e) {
    console.error(`Error fetching ${contentType} by ID: ${e}`);
    throw e;
  }
};
