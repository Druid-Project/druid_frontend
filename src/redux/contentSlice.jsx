import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../config";

// Async thunk to fetch data dynamically based on the endpoint
export const fetchContentData = createAsyncThunk(
  "content/fetchData",
  async ({ endpoint, includes }) => {
    let url = `${baseUrl}/jsonapi/${endpoint}`;
    if (includes) {
      url += `?include=${includes}`;
    }
    const response = await axios.get(url);
    return response.data;
  }
);

// Async thunk to fetch taxonomy term data
export const fetchTaxonomyTermData = createAsyncThunk(
  "content/fetchTaxonomyTerm",
  async (taxonomyTermId) => {
    const response = await axios.get(
      `${baseUrl}/jsonapi/taxonomy_term/mautic_segments/${taxonomyTermId}`
    );
    return response.data;
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState: {
    data: {},
    loading: false,
    error: null,
    imageUrl: null,
    baseUrl: baseUrl,
    taxonomyTerm: null,
  },
  reducers: {
    setImageUrl: (state, action) => {
      state.imageUrl = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContentData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchContentData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTaxonomyTermData.fulfilled, (state, action) => {
        state.taxonomyTerm = action.payload.data.attributes.name;
      });
  },
});

export const { setImageUrl } = contentSlice.actions;

export default contentSlice.reducer;
