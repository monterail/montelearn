import axios from "axios";

const apiClient = axios.create({
  baseURL: `${process.env.API_URL}/api` || "http://localhost:8080/api",
  responseType: "json",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setAuhtorizationToken(accessToken: string): void {
  apiClient.defaults.headers.common.Auhtorization = `Bearer ${accessToken}`;
}

export default apiClient;
