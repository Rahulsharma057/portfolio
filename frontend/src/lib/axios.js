import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1",
  headers: { "Content-Type": "application/json" },
});

// Har request me JWT token laga do
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    try {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    } catch (err) {}
  }
  return config;
});

// Token expire ho gaya to login page pe bhej do
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && typeof window !== "undefined") {
      try {
        localStorage.removeItem("token");
      } catch (e) {}
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  }
);

// Error ka message nikalne ka ek hi tareeka
export const errorMessage = (err) =>
  err?.response?.data?.message || err?.message || "Kuch galat ho gaya";

export default api;
