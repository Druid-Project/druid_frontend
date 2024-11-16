// src/redux/homeSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get base URL from environment variable
const baseUrl =
  import.meta.env.VITE_DRUPAL_HOST_URL || "https://druid-backend.lndo.site"; // default fallback

const endpoint =
  "/jsonapi/node/home?include=field_hero_section.field_image.field_media_image";

// Async thunk for fetching data
export const fetchHomeData = createAsyncThunk("home/fetchData", async () => {
  const response = await axios.get(`${baseUrl}${endpoint}`);
  const data = response.data;

  // Transform data
  return {
    baseUrl, // Store the base URL in state
    heroSections: data.included
      .filter((item) => item.type === "paragraph--card")
      .map((section) => {
        const mediaId = section.relationships.field_image?.data?.id;
        const media = data.included.find(
          (includedItem) =>
            includedItem.id === mediaId && includedItem.type === "media--image"
        );

        const fileId = media?.relationships?.field_media_image?.data?.id;
        const file = data.included.find(
          (includedItem) =>
            includedItem.id === fileId && includedItem.type === "file--file"
        );

        return {
          id: section.id,
          shortDescription: section.attributes.field_short_description,
          longDescription: section.attributes.field_long_description,
          buttonText:
            section.attributes.field_cta_button?.title || "Learn More",
          buttonLink: section.attributes.field_cta_button?.uri || "#",
          image: file
            ? {
                alt: media?.attributes?.field_media_image?.meta?.alt || "",
                url: file.attributes.uri.url,
                width:
                  media?.attributes?.field_media_image?.meta?.width || null,
                height:
                  media?.attributes?.field_media_image?.meta?.height || null,
              }
            : null,
        };
      }),
  };
});

const homeSlice = createSlice({
  name: "home",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    baseUrl: "", // Store the base URL here
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.heroSections;
        state.baseUrl = action.payload.baseUrl; // Save base URL to state
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default homeSlice.reducer;
