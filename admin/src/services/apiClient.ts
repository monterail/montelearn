import axios from "axios";
import Router from "next/router";

import {
  getAuthAccessToken,
  getAuthRefreshToken,
  setAuthTokens,
  removeAuthTokens,
} from "./localStorage";

const apiClient = axios.create({
  baseURL: `${process.env.API_URL}/api`,
  responseType: "json",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

const setApiClientAuthToken = (token: string | null) => {
  apiClient.defaults.headers.common.Authorization = token && `Bearer ${token}`;
};

const setOriginalRequestAuthToken = (originalRequest: any, value: string) => {
  originalRequest.headers.Authorization = `Bearer ${value}`;
};

const accessToken = getAuthAccessToken();
setApiClientAuthToken(accessToken);

// for multiple requests
let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            setOriginalRequestAuthToken(originalRequest, token as string);
            return apiClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = getAuthRefreshToken();

      if (!refreshToken) return Promise.reject(error);

      return new Promise((resolve, reject) => {
        axios
          .post(`${process.env.API_URL}/api/auth/refresh-token/`, {
            refresh: refreshToken,
          })
          .then(({ data: { access, refresh } }) => {
            setAuthTokens({
              access_token: access,
              refresh_token: refresh,
            });

            setApiClientAuthToken(access);
            setOriginalRequestAuthToken(originalRequest, access);

            processQueue(null, access);

            resolve(apiClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            removeAuthTokens();
            setApiClientAuthToken("");
            Router.push("/");
            reject(err);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

export default apiClient;
