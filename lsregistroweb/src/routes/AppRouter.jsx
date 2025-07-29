import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import V1Registro from './components/V1Registro/V1Registro'
import V2Confirmacion from './components/V2Confirmacion/V2Confirmacion'
import V3Verificacion from './components/V3Verificación/V3Verificacion'
import V4ConfExito from './components/V4ConfExito/V4ConfExito'
import V5ComprIdentidad from './components/V5ComprIdentidad/V5ComprIdentidad'
import V5ACompletarIne from './components/V5ACompletarIne/V5ACompletarIne'
import V5BCompletarDom from './components/V5ACompletarIne/V5BCompletarDom'
import V6Adjuntar from './components/V6Adjuntar/V6Adjuntar'
import V6Capturar from './components/V6Capturar/V6Capturar'
import V7Recibidos from './components/V7Recibidos/V7Recibidos'
import V7RevisarDoc from './components/V7Revisar/V7RevisarDoc'
import TextoPrincipal from './components/ElementosVista/TextoPrincipal/TextoPrincipal'
import TextoSecundario from './components/ElementosVista/TextoSecundario/TextoSecundario'
import V8Opciones from './components/V8Opciones/V8Opciones'


export const ROUTES = {
  LOGIN: '/login',
  ENVIAR_CODIGO: '/enviarCodigo',
};

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Redirección raíz */}
      <Route path="/" element={<Navigate to={ROUTES.LOGIN} replace />} />

      <Route path={ROUTES.LOGIN}         element={<V1Registro />} />
      <Route path={ROUTES.ENVIAR_CODIGO} element={<V2Confirmacion />} />

      {/* Ruta comodín 404 */}
      <Route path="*" element={<p>404 – No encontrado</p>} />
    </Routes>
  </BrowserRouter>
);