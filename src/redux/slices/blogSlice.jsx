import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseUrl } from "../../config";

// Async thunk to fetch all blogs from the views endpoint
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  const { data } = await axios.get(
    `${baseUrl}/jsonapi/views/blog_listings/page_1?include=field_content_sections`
  );
  return data;
});

// Async thunk to fetch a single blog by ID
export const fetchSingleBlog = createAsyncThunk(
  "blogs/fetchSingleBlog",
  async (blogId) => {
    const { data } = await axios.get(
      `${baseUrl}/jsonapi/node/blogs/${blogId}?include=field_content_sections,field_author,field_hero_image`
    );
    return data.data;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    singleBlog: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.data;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSingleBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.singleBlog = action.payload;
      })
      .addCase(fetchSingleBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
