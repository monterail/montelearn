import apiClient from "@/services/apiClient";
import { getAuthAccessToken, setAuthTokens, removeAuthTokens } from "@/services/localStorage";

type Login = {
  username: string;
  password: string;
};

const login = async ({ username, password }: Login): Promise<void> => {
  const response = await apiClient.post(`/auth/admin/login/`, {
    email: username,
    password,
  });

  setAuthTokens(response.data);
  return Promise.resolve();
};

const logout = async (): Promise<void> => {
  removeAuthTokens();
  return Promise.resolve();
};

const checkAuth = (): Promise<void> => {
  return getAuthAccessToken() ? Promise.resolve() : Promise.reject();
};

const checkError = (error: any): Promise<void> => {
  const { status } = error;

  if (status === 401 || status === 403) {
    removeAuthTokens();
    return Promise.reject();
  }

  return Promise.resolve();
};

const getPermissions = (): Promise<void> => Promise.resolve();

export default {
  login,
  logout,
  checkAuth,
  checkError,
  getPermissions,
};
