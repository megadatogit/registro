// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,   // ← usa la variable
  timeout: 10000,
  
});
console.log(import.meta.env.VITE_API_URL);
export default api;
