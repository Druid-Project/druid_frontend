import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../config";

// Async thunk to fetch dynamic content data
export const fetchDynamicContent = createAsyncThunk(
  "mautic/fetchDynamicContent",
  async () => {
    const response = await axios.get(`${baseUrl}/api/mautic-contacts/dynamiccontents`);
    return response.data;
  }
);

const mauticSlice = createSlice({
  name: "mautic",
  initialState: {
    dynamicContent: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDynamicContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDynamicContent.fulfilled, (state, action) => {
        state.loading = false;
        state.dynamicContent = action.payload;
      })
      .addCase(fetchDynamicContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default mauticSlice.reducer;