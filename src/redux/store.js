import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice";
import mauticReducer from "./mauticSlice";
import footerReducer from "./footerSlice";

const store = configureStore({
  reducer: {
    content: contentReducer,
    mautic: mauticReducer,
    footer: footerReducer,
  },
});

export default store;
