// src/services/apiClient.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
  withCredentials: true,
});

let _token = localStorage.getItem('access_token') || null;
export const setAuthToken = (t) => {
  _token = t || null;
  if (t) localStorage.setItem('access_token', t);
  else localStorage.removeItem('access_token');
};

api.interceptors.request.use(cfg => {
  if (_token) cfg.headers.Authorization = `Bearer ${_token}`;
  return cfg;
});

export default api; // 👈 default export
