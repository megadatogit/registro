import axios from "axios";

const api = axios.create({
  baseURL: "/api",        // ¡clave! ahora pega al proxy
  withCredentials: true,  // para que viajen cookies HttpOnly
  timeout: 30000,
});

export default api;
