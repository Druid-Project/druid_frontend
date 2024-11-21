// src/redux/homeSlice.jsx

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Get base URL from environment variable
const baseUrl =
  import.meta.env.VITE_DRUPAL_HOST_URL || "https://druid-backend.lndo.site"; // default fallback

const endpoint =
  "/jsonapi/node/home?include=field_content.field_image.field_media_image,field_content.field_feature_cards.field_image.field_media_image";

// Async thunk for fetching data
export const fetchHomeData = createAsyncThunk("home/fetchData", async () => {
  const response = await axios.get(`${baseUrl}${endpoint}`);
  const data = response.data;

  // Transform data
  const transformedData = {
    baseUrl, // Store the base URL in state
    sections: data.included.map((section) => {
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

      const blogCards = section.relationships.field_blog_cards?.data?.map(
        (card) => {
          const cardData = data.included.find(
            (includedItem) =>
              includedItem.id === card.id &&
              includedItem.type === "paragraph--card"
          );

          return cardData ? cardData.attributes : null;
        }
      );

      const featureItems = section.relationships.field_feature_items?.data?.map(
        (item) => {
          const itemData = data.included.find(
            (includedItem) =>
              includedItem.id === item.id &&
              includedItem.type === "paragraph--feature_item"
          );

          return itemData ? itemData.attributes : null;
        }
      );

      const featureCards = section.relationships.field_feature_cards?.data?.map(
        (card) => {
          const cardData = data.included.find(
            (includedItem) =>
              includedItem.id === card.id &&
              includedItem.type === "paragraph--card"
          );

          if (cardData) {
            const imageId = cardData.relationships.field_image?.data?.id;
            const imageMedia = data.included.find(
              (includedItem) =>
                includedItem.id === imageId && includedItem.type === "media--image"
            );
            const imageFileId = imageMedia?.relationships?.field_media_image?.data?.id;
            const imageFile = data.included.find(
              (includedItem) =>
                includedItem.id === imageFileId && includedItem.type === "file--file"
            );

            const transformedCard = {
              ...cardData.attributes,
              field_image: imageFile
                ? {
                    alt: imageMedia?.attributes?.field_media_image?.meta?.alt || "",
                    url: imageFile.attributes.uri.url,
                  }
                : null,
            };

            return transformedCard;
          }
          return null;
        }
      );

      const transformedSection = {
        id: section.id,
        type: section.type,
        attributes: section.attributes,
        relationships: section.relationships,
        image: file
          ? {
              alt: media?.attributes?.field_media_image?.meta?.alt || "",
              url: file.attributes.uri.url,
              width: media?.attributes?.field_media_image?.meta?.width || null,
              height:
                media?.attributes?.field_media_image?.meta?.height || null,
            }
          : null,
        blogCards: blogCards || [],
        featureItems: featureItems || [], // Add feature items
        featureCards: featureCards || [], // Add feature cards
      };

      return transformedSection;
    }),
  };

  console.log("Transformed data:", transformedData); // Main data log
  return transformedData;
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
        state.data = action.payload.sections;
        state.baseUrl = action.payload.baseUrl; // Save base URL to state
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default homeSlice.reducer;
