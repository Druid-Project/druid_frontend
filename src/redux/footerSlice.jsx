import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../config";

// Async thunk to fetch footer data
export const fetchFooterData = createAsyncThunk(
  "footer/fetchData",
  async ({ endpoint, includes }) => {
    let url = `${baseUrl}/jsonapi/${endpoint}`;
    if (includes) {
      url += `?include=${includes}`;
    }
    const response = await axios.get(url);
    return response.data;
  }
);

const footerSlice = createSlice({
  name: "footer",
  initialState: {
    data: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFooterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFooterData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchFooterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default footerSlice.reducer;
