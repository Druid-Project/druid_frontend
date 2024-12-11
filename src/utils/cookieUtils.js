// src/utils/cookieUtils.js
import Cookies from "js-cookie";

// Get mtc_id cookie
export const getMtcId = () => Cookies.get("mtc_id");

// Set mtc_id cookie (useful for testing)
export const setMtcId = (value) =>
  Cookies.set("mtc_id", value, { path: "/", secure: true });

// Delete mtc_id cookie
export const deleteMtcId = () => Cookies.remove("mtc_id");
