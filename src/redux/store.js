import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./slices/contentSlice";
import mauticReducer from "./slices/mauticSlice";
import footerReducer from "./slices/footerSlice";
import blogReducer from "./slices/blogSlice";

const store = configureStore({
  reducer: {
    content: contentReducer,
    mautic: mauticReducer,
    footer: footerReducer,
    blogs: blogReducer,
  },
});

export default store;
