// src/redux/homeSlice.jsx
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchContent } from "../api/api";
import { baseUrl } from "../config";

export const fetchHomeData = createAsyncThunk(
  "home/fetchHomeData",
  async () => {
    const response = await fetchContent("jsonapi/node/home", {
      include: "field_home_page_sections",
    });
    return response;
  }
);

const homeSlice = createSlice({
  name: "home",
  initialState: {
    data: null,
    status: "idle",
    error: null,
    baseUrl: baseUrl,
    imageUrl: null,
  },
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setImageUrl } = homeSlice.actions;

export default homeSlice.reducer;
