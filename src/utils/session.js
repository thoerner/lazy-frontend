import Cookies from "js-cookie";

const SESSION_EXPIRY_TIME = 86400; // 24 hours

export const getSessionToken = () => Cookies.get("sessionToken");

export const createSessionToken = (sessionToken) => {
  Cookies.set("sessionToken", sessionToken, {
    expires: SESSION_EXPIRY_TIME / (24 * 60 * 60), // Convert to days for js-cookie
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};
