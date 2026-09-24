import axios from "axios";

let apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
if (apiUrl && !apiUrl.endsWith("/api")) {
  apiUrl += "/api";
}

const API = axios.create({
  baseURL: apiUrl,
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

import toast from "react-hot-toast";

API.interceptors.response.use(
  (response) => {
    // Optionally handle successful global messages here
    return response;
  },
  (error) => {
    const message = error.response?.data?.error || "An unexpected error occurred";
    toast.error(message);
    return Promise.reject(error);
  }
);

export default API;