import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://dummy.restapiexample.com/api/v1`,
  responseType: "json",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// apiClient.defaults.headers.common['Auhtorization'] = 'Bearer TOKEN_GOES_HERE'

export default apiClient;
