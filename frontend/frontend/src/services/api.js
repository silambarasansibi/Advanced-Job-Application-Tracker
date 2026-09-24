import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
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