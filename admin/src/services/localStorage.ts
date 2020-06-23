type SetAccessToken = {
  access_token: string;
  refresh_token: string;
};

export const setAuthTokens = ({ access_token, refresh_token }: SetAccessToken): void => {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
};

export const removeAuthTokens = (): void => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getAuthAccessToken = (): string => {
  return localStorage.getItem("access_token") || "";
};

export const getAuthRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token");
};
