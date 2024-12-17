import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mauticContactsApiUrl } from "../config"; // Import centralized URL

// Async thunk to fetch personalized content data
export const fetchPersonalizedContent = createAsyncThunk(
  "mautic/fetchPersonalizedContent",
  async () => {
    const response = await axios.get(`${mauticContactsApiUrl}/personalized-content`);
    return response.data.dynamic_content; // Adjust to match the new structure
  }
);

const mauticSlice = createSlice({
  name: "mautic",
  initialState: {
    personalizedContent: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalizedContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalizedContent.fulfilled, (state, action) => {
        state.loading = false;
        state.personalizedContent = action.payload;
      })
      .addCase(fetchPersonalizedContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mauticSlice.reducer;
