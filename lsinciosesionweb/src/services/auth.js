// src/services/auth.js
import api from './apiClient';

/** Login: deja la cookie access_token en el navegador (HttpOnly) */
export async function login({ username, password, role = 'paciente' }) {
  const body = new URLSearchParams();
  body.set('grant_type', 'password');
  body.set('username', username);
  body.set('password', password);
  body.set('role', role);

  const { data } = await api.post('/auth/token', body, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return data; // el backend ya setea cookies
}

export async function decodeToken() {
  const { data } = await api.get('/auth/decode-token');
  return data; // { message, user: {...} }
}

export async function refreshToken() {
  const { data } = await api.post('/auth/refresh-token');
  return data;
}

export async function logout() {
  const { data } = await api.post('/auth/logout');
  return data;
}
