import apiClient, { setTokens, removeTokens } from "./apiClient.ts";

const authProvider = {
  login: async ({ username, password }) => {
    const response = await apiClient.post(`/auth/admin/login/`, {
      email: username,
      password,
    });
    setTokens(response.data);
    return Promise.resolve();
  },

  logout: async () => {
    await apiClient.post(`/auth/logout/`);
    removeTokens();
    return Promise.resolve();
  },

  checkAuth: () => {
    return localStorage.getItem("access_token") ? Promise.resolve() : Promise.reject();
  },

  checkError: (error) => {
    const { status } = error;

    if (status === 401 || status === 403) {
      removeTokens();
      return Promise.reject();
    }

    return Promise.resolve();
  },

  getPermissions: () => Promise.resolve(),
};

export default authProvider;
