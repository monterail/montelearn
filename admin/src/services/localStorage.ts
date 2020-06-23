type SetAccessToken = {
  access_token: string;
  refresh_token: string;
};

enum AUTH_TOKENS {
  AccessToken = "access_token",
  RefreshToken = "refresh_token",
}

export const setAuthTokens = ({ access_token, refresh_token }: SetAccessToken): void => {
  localStorage.setItem(AUTH_TOKENS.AccessToken, access_token);
  localStorage.setItem(AUTH_TOKENS.RefreshToken, refresh_token);
};

export const removeAuthTokens = (): void => {
  localStorage.removeItem(AUTH_TOKENS.AccessToken);
  localStorage.removeItem(AUTH_TOKENS.RefreshToken);
};

export const getAuthAccessToken = (): string => {
  return localStorage.getItem(AUTH_TOKENS.AccessToken) || "";
};

export const getAuthRefreshToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKENS.RefreshToken);
};
