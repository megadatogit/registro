// src/routes/protected-route.jsx
import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute() {
  const isLogged = Boolean(localStorage.getItem('auth_ready')); // temporal
  const location = useLocation();

  if (!isLogged) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return <Outlet />;
}
