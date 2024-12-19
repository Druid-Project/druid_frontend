import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { mauticContactsApiUrl } from "../../config";

export const fetchPersonalizedContent = createAsyncThunk(
  "mautic/fetchPersonalizedContent",
  async () => {
    const response = await axios.get(
      `${mauticContactsApiUrl}/personalized-content`
    );
    return response.data;
  }
);

const mauticSlice = createSlice({
  name: "mautic",
  initialState: {
    personalizedContent: {},
    contact: {},
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
        state.personalizedContent = action.payload.dynamic_content;
        state.contact = action.payload.contact;
      })
      .addCase(fetchPersonalizedContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mauticSlice.reducer;
