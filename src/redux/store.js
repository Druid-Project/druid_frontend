// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import homepageReducer from "./homeSlice";

const store = configureStore({
  reducer: {
    homepage: homepageReducer, // Make sure this matches the selector's name
  },
});

export default store;
