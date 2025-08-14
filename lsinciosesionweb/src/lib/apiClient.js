import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  timeout: 12000,
  withCredentials: true, // necesario si usas cookies httpOnly
});

// (Opcional) interceptor para incluir token en header si lo manejas por JWT en memoria
let authToken = null;
export const setAuthToken = (token) => {
  authToken = token;
};
api.interceptors.request.use((config) => {
  if (authToken) config.headers.Authorization = `Bearer ${authToken}`;
  return config;
});
