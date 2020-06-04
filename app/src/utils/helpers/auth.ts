import Cookie from "js-cookie";
import nextCookie from "next-cookies";

import { COOKIES } from "@/constants/cookies";

export const getAccessTokenOnServer = (ctx: any): string => {
  const cookies = nextCookie(ctx);
  return cookies[COOKIES.accessToken] || "";
};

export const getAccessToken = (): string => {
  return Cookie.get(COOKIES.accessToken) || "";
};

export const setAccessToken = (token: string): void => {
  Cookie.set(COOKIES.accessToken, token);
};

export const removeAccessToken = (): void => {
  Cookie.remove(COOKIES.accessToken);
};

export const getRefreshToken = (): string => {
  return Cookie.get(COOKIES.refreshToken) || "";
};

export const setRefreshToken = (token: string): void => {
  Cookie.set(COOKIES.refreshToken, token);
};

export const removeRefreshToken = (): void => {
  Cookie.remove(COOKIES.refreshToken);
};

export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

export const logout = (): void => {
  removeAccessToken();
  removeRefreshToken();
};
