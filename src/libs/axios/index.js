import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
  config.headers.common["Authorization"] = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use();

export default api;
