// src/services/api.js
import axios from 'axios';

/** =========================
 *  Axios base (registro web)
 *  ========================= */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,  // p.ej. https://api.tu-dominio.com
  withCredentials: true,                  // <- NECESARIO para cookies HttpOnly (refresh)
  timeout: 30000,
});

let _accessToken = null;                  // access token en memoria (no localStorage)

/** Opcional: un “hop” temporal entre pantallas del mismo proyecto (no entre dominios)
const SESSION_KEY = 'access_token_hop';
function getHop() { return sessionStorage.getItem(SESSION_KEY); }
function setHop(t) { t ? sessionStorage.setItem(SESSION_KEY, t) : sessionStorage.removeItem(SESSION_KEY); }
*/

export function setAuthToken(token) {
  _accessToken = token ?? null;
  // setHop(token); // <- solo si quieres persistir durante un “hop” (opcional)
}
export function clearAuthToken() {
  _accessToken = null;
  // setHop(null);
}
export function getAuthToken() {
  return _accessToken; // || getHop();  // si activaste el “hop”
}

/** ======== Request: adjunta Authorization si hay access ======== */
api.interceptors.request.use((config) => {
  const t = getAuthToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

/** ======== Response: 401 -> intenta refresh (cookie HttpOnly) ======== */
let isRefreshing = false;
let queue = [];

function onRefreshed(newToken) {
  queue.forEach(({ resolve }) => resolve(newToken));
  queue = [];
}
function onRefreshError(err) {
  queue.forEach(({ reject }) => reject(err));
  queue = [];
}

async function refreshAccess() {
  // Backend debe leer cookie "refresh_token" y devolver { access_token }
  const { data } = await api.post('/auth/refresh'); // withCredentials:true envía la cookie
  const newToken = data?.access_token || null;
  setAuthToken(newToken);
  return newToken;
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const { config, response } = error;
    if (!response) return Promise.reject(error);
    if (response.status !== 401) return Promise.reject(error);
    if (config._retry) return Promise.reject(error);  // evita bucle
    config._retry = true;

    // Si NO se está refrescando, lánzate y luego despierta a la cola
    if (!isRefreshing) {
      isRefreshing = true;
      try {
        const newToken = await refreshAccess();
        isRefreshing = false;
        onRefreshed(newToken);
      } catch (e) {
        isRefreshing = false;
        onRefreshError(e);
        clearAuthToken();
        return Promise.reject(error);
      }
    }

    // Espera a que termine el refresh, luego reintenta la request original
    return new Promise((resolve, reject) => {
      queue.push({
        resolve: (newToken) => {
          if (newToken) config.headers.Authorization = `Bearer ${newToken}`;
          resolve(api(config));
        },
        reject,
      });
    });
  }
);

export default api;
