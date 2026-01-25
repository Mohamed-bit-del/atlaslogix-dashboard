import axios from "axios";

export const api = axios.create({
  baseURL: "/api/v1/",
});

api.interceptors.request.use((config) => {
  const stored = localStorage.getItem("atlaslogix_auth");

  if (stored) {
    const parsed = JSON.parse(stored);

    config.headers.Authorization = `Bearer ${parsed.token}`;
  }

  return config;
});
