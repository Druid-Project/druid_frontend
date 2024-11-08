// src/features/homepageSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://druid-backend.lndo.site/jsonapi/node/home";

export const fetchHomepageData = createAsyncThunk(
  "homepage/fetchHomepageData",
  async () => {
    const response = await axios.get(API_URL);
    return response.data;
  }
);

const homepageSlice = createSlice({
  name: "homepage",
  initialState: {
    data: null, // Initial value for data
    status: "idle", // Initial status
    error: null, // Initial error state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomepageData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomepageData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchHomepageData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default homepageSlice.reducer;
