import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch home data along with nested relationships
export const fetchHomeData = createAsyncThunk(
  "home/fetchHomeData",
  async () => {
    try {
      const response = await axios.get(
        "https://druid-backend.lndo.site/jsonapi/node/home"
      );
      const homeData = response.data;
      // Fetch the related field_hero_section data
      if (homeData.data[0].relationships.field_hero_section) {
        const heroSectionId =
          homeData.data[0].relationships.field_hero_section.data[0].id;
        const heroResponse = await axios.get(
          `https://druid-backend.lndo.site/jsonapi/paragraph/card/${heroSectionId}`
        );
        return { home: homeData, heroSection: heroResponse.data };
      }
      return { home: homeData, heroSection: null };
    } catch (error) {
      throw new Error("Failed to fetch home data", error);
    }
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    homeData: null,
    heroSection: null,
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.status = "success";
        state.homeData = action.payload.home;
        state.heroSection = action.payload.heroSection;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default homeSlice.reducer;
