import Cookies from "js-cookie";

const COOKIE_NAME = "mtc_id";
const COOKIE_OPTIONS = { path: "/", secure: true };

export const getMtcId = () => Cookies.get(COOKIE_NAME);

export const setMtcId = (value) => Cookies.set(COOKIE_NAME, value, COOKIE_OPTIONS);

export const deleteMtcId = () => Cookies.remove(COOKIE_NAME);
