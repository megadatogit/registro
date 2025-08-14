import { api, setAuthToken } from "@/lib/apiClient";

// Ajusta la ruta a la de tu backend
export async function login({ email, password, role }) {
  // Ejemplo 1: backend con cookies httpOnly (recomendado):
  // const { data } = await api.post("/auth/login", { email, password, role });

  // Ejemplo 2: backend que retorna JWT en el body:
  const { data } = await api.post("/auth/login", { email, password, role });
  // Si el backend devuelve token:
  if (data?.token) setAuthToken(data.token);
  return data; // { user, token? }
}
