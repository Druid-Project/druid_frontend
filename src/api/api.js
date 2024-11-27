// src/api/api.js
import axios from "axios";
import { baseUrl } from "../config";

const apiClient = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/vnd.api+json",
  },
});

export const fetchContent = async (endpoint, params = {}) => {
  try {
    const response = await apiClient.get(endpoint, { params });
    return response.data;
  } catch (e) {
    console.error(`Error fetching ${endpoint}: ${e}`);
    throw e;
  }
};
