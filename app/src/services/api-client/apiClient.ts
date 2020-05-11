import axios from "axios";

const apiClient = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`,
  responseType: "json",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
