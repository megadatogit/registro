// src/routes/index.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from '@/components/auth/Login';
import Inicio from '@/pages/Inicio/Inicio';            // o tu Panel
import Cuestionarios from '@/pages/Cuestionarios/Cuestionarios';
import Historial from '@/pages/Historial/Historial';
import Cabina from '@/pages/Cabina/Cabina';
import Ayuda from '@/pages/Ayuda/Ayuda';

import ProtectedRoute from './protected-route';

export const ROUTES = {
  LOGIN: '/login',
  INICIO: '/inicio',
  CUESTIONARIOS: '/cuestionarios',
  HISTORIAL: '/historial',
  CABINA: '/cabina',
  AYUDA: '/ayuda',
};

export const AppRouter = () => (
  <BrowserRouter basename="/panel">
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path={ROUTES.INICIO} element={<Inicio />} />
        <Route path={ROUTES.CUESTIONARIOS} element={<Cuestionarios />} />
        <Route path={ROUTES.HISTORIAL} element={<Historial />} />
        <Route path={ROUTES.CABINA} element={<Cabina />} />
        <Route path={ROUTES.AYUDA} element={<Ayuda />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
    </Routes>
  </BrowserRouter>
);
