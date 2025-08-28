// src/services/auth.js
import api, { setAuthToken, clearAuthToken } from './api';

// 1) Paso final del registro (emite sesión)
export async function completeRegistration(payload) {
  // El backend debería:
  // - Setear cookie HttpOnly: refresh_token
  // - Responder { access_token, user }
  const { data } = await api.post('/auth/complete_registration', payload);
  if (data?.access_token) setAuthToken(data.access_token);
  return data; // { access_token, user }
}

// 2) (Opcional) login directo, si tu flujo lo usa
export async function login({ email, password, role }) {
  const { data } = await api.post('/auth/login', { email, password, role });
  if (data?.access_token) setAuthToken(data.access_token);
  // si tu backend da `token` en vez de `access_token`, ajústalo aquí
  return data;
}

// 3) Perfil actual (requiere access o refresh cookie + interceptor)
export async function me() {
  const { data } = await api.get('/auth/me');
  return data;
}

// 4) Logout (invalida refresh y limpia access en memoria)
export async function logout() {
  try { await api.post('/auth/logout'); } catch {}
  clearAuthToken();
}
