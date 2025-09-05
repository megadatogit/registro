import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,   // <- MUY IMPORTANTE para enviar/recibir cookies
  timeout: 30000,
});
