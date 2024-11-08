import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch data asynchronously
export const fetchHomeData = createAsyncThunk(
  'home/fetchHomeData',
  async () => {
    const response = await axios.get('https://druid-backend.lndo.site/jsonapi/node/home');
    console.log(response.data);
    
    return response.data;
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default homeSlice.reducer;
