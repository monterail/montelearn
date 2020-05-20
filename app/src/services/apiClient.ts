import axios from "axios";

import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  removeAccessToken,
  removeRefreshToken,
} from "@/utils/helpers/auth";

const apiClient = axios.create({
  baseURL: `${process.env.API_URL}/api`,
  responseType: "json",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setApiClientAuthToken = (value: string) => {
  apiClient.defaults.headers.common.Authorization = value && `Bearer ${value}`;
};

const setOriginalRequestAuthToken = (originalRequest: any, value: string) => {
  originalRequest.headers.Authorization = value && `Bearer ${value}`;
};

const accessToken = getAccessToken();
if (accessToken) {
  setApiClientAuthToken(accessToken);
}

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

    if (error.response.status === 401 && !originalRequest._retry) {
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

      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        return Promise.reject(error);
      }

      return new Promise((resolve, reject) => {
        apiClient
          .post("/auth/refresh-token/", { refresh: refreshToken })
          .then(({ data: { access } }) => {
            setAccessToken(access);

            setApiClientAuthToken(access);
            setOriginalRequestAuthToken(originalRequest, access);

            processQueue(null, access);

            resolve(apiClient(originalRequest));
          })
          .catch((err) => {
            processQueue(err, null);
            removeAccessToken();
            removeRefreshToken();
            reject(err);
          })
          .then(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  }
);

export default apiClient;
