import axios from "axios";

const api = axios.create({
  baseURL: "https://glorious-guide-4jg64r79grjpcqqjg-5000.app.github.dev/api",
  headers: {
    "Content-Type": "application/json"
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

export default api;