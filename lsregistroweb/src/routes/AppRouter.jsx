// src/router/AppRoutes.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/* --- Páginas --- */
import V1Registro       from '@/components/V1Registro/V1Registro';
import V2Confirmacion   from '@/components/V2Confirmacion/V2Confirmacion';
import V3Verificacion   from '@/components/V3Verificación/V3Verificacion';
import V4ConfExito      from '@/components/V4ConfExito/V4ConfExito';
import V5ComprIdentidad from '@/components/V5ComprIdentidad/V5ComprIdentidad';
import V5ACompletarIne  from '@/components/V5ACompletarIne/V5ACompletarIne';
import V5BCompletarDom  from '@/components/V5ACompletarIne/V5BCompletarDom';
import V6Adjuntar       from '@/components/V6Adjuntar/V6Adjuntar';
import V6Capturar       from '@/components/V6Capturar/V6Capturar';
import V7Recibidos      from '@/components/V7Recibidos/V7Recibidos';
import V7RevisarDoc     from '@/components/V7Revisar/V7RevisarDoc';
import V8Opciones       from '@/components/V8Opciones/V8Opciones';

/* --- Rutas --- */
export const ROUTES = {
  REGISTRO:            '/registro',
  CONFIRMACION:        '/confirmacion',
  VERIFICACION:        '/verificacion',
  CONFIRMACION_EXITO:  '/confirmacion-exito',
  COMPROBAR_IDENTIDAD: '/comprobar-identidad',
  COMPLETAR_INE:       '/completar-ine',
  COMPLETAR_DOMICILIO: '/completar-domicilio',
  ADJUNTAR_DOCUMENTOS: '/adjuntar-documentos',
  CAPTURAR_DOCUMENTOS: '/capturar-documentos',
  RECIBIDOS:           '/recibidos',
  REVISAR_DOCUMENTOS:  '/revisar-documentos',
  OPCIONES:            '/opciones',
};

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Raíz → redirige al primer paso del flujo */}
      <Route path="/" element={<Navigate to={ROUTES.REGISTRO} replace />} />

      <Route path={ROUTES.REGISTRO}               element={<V1Registro />} />
      <Route path={ROUTES.CONFIRMACION}           element={<V2Confirmacion />} />
      <Route path={ROUTES.VERIFICACION}           element={<V3Verificacion />} />
      <Route path={ROUTES.CONFIRMACION_EXITO}     element={<V4ConfExito />} />
      <Route path={ROUTES.COMPROBAR_IDENTIDAD}    element={<V5ComprIdentidad />} />
      <Route path={ROUTES.COMPLETAR_INE}          element={<V5ACompletarIne />} />
      <Route path={ROUTES.COMPLETAR_DOMICILIO}    element={<V5BCompletarDom />} />
      <Route path={ROUTES.ADJUNTAR_DOCUMENTOS}    element={<V6Adjuntar />} />
      <Route path={ROUTES.CAPTURAR_DOCUMENTOS}    element={<V6Capturar />} />
      <Route path={ROUTES.RECIBIDOS}              element={<V7Recibidos />} />
      <Route path={ROUTES.REVISAR_DOCUMENTOS}     element={<V7RevisarDoc />} />
      <Route path={ROUTES.OPCIONES}               element={<V8Opciones />} />

      {/* 404 – cualquier otra ruta */}
      <Route path="*" element={<p>404 – Página no encontrada</p>} />
    </Routes>
  </BrowserRouter>
);
