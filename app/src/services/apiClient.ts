import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.API_URL || "http://localhost:8080",
  responseType: "json",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// apiClient.defaults.headers.common['Auhtorization'] = 'Bearer TOKEN_GOES_HERE'

export default apiClient;
