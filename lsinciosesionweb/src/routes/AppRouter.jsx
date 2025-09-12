import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
/* accesos */

import

export const ROUTES = {
  
    LOGIN: '/login',
    INICIO: '/inicio',
    CUESTIONARIOS: '/cuestionarios',
    HISTORIAL: '/historial',
    CABINA: '/cabina',
    AYUDA: '/ayuda'
};

export const AppRouter = () => {
    return (
        <BrowserRouter basename="/panel">
            <Routes>
                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.CUESTIONARIOS} element={<Cuestionarios />} />
                <Route path={ROUTES.HISTORIAL} element={<Historial />} />
                <Route path={ROUTES.CABINA} element={<Cabina />} />
                <Route path={ROUTES.AYUDA} element={<Ayuda />} />
                <Route path="*" element={<Navigate to={ROUTES.LOGIN} />} />
            </Routes>
        </BrowserRouter>
    );
}
