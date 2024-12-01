import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { baseUrl } from "../config";
import axios from "axios";

export const fetchContentData = createAsyncThunk(
  "content/fetchData",
  async ({endpoint, includes}) => {
    let url = `${baseUrl}/jsonapi/${endpoint}`;
    if(includes){
      url +=`?include=$(includes)`;
    }
    const response = await axios.get(url);
    return response.data;
  }
);

const contentSlice = createSlice({
  name: "content",
  initialState: {
    data: {},
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
      .addCase(fetchContentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContentData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchContentData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setImageUrl } = contentSlice.actions;
export default contentSlice.reducer;
