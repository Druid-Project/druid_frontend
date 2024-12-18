import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice";
import mauticReducer from "./mauticSlice";
import footerReducer from "./footerSlice";
import blogReducer from "./blogSlice"; 

const store = configureStore({
  reducer: {
    content: contentReducer,
    mautic: mauticReducer,
    footer: footerReducer,
    blogs: blogReducer, 
  },
});

export default store;
