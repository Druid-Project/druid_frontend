import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./contentSlice";
import mauticReducer from "./mauticSlice";

const store = configureStore({
  reducer: {
    content: contentReducer,
    mautic: mauticReducer,
  },
});

export default store;
