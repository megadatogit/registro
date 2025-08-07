// src/components/V6Adjuntar/V6Adjuntar.jsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@/routes/AppRouter';

import styles from './v6adjuntar.module.css';
import Logo             from '@/components/ElementosVista/Logo/Logo';
import TextoPrincipal   from '@/components/ElementosVista/TextoPrincipal/TextoPrincipal';
import TarjetaAdjuntar  from '@/components/ElementosVista/TarjetaAdjuntar/TarjetaAdjuntar';
import BotonA           from '@/components/Botones/BotonA';

const V6Adjuntar = () => {
  const navigate  = useNavigate();
  const { state } = useLocation();   // por si necesitas los datos previos

  /*  Cuando el usuario pulse “Continuar”:
      - aquí redirijo a la vista V7Recibidos (ajusta a la tuya)       */
  const continuar = () => navigate(ROUTES.RECIBIDOS, { state });

  return (
    <div className={styles.cntV6Adjutar}>
      {/* Logo */}
      <div className={styles.cntLogo}>
        <Logo />
      </div>

      {/* Título */}
      <div className={styles.cntTexto}>
        <TextoPrincipal textoPrincipal="Adjunta los archivos necesarios para verificar tu información" />
      </div>

      {/* Tarjetas */}
      <div className={styles.cntTarjetas}>
        <TarjetaAdjuntar
          accion="INE"
          descripcion="Asegúrate de incluir imagen de frente y reverso"
        />
        <TarjetaAdjuntar
          accion="Comprobante de domicilio"
          descripcion="Asegúrate de que sea legible y con fecha menor a 3 meses"
        />
      </div>

      {/* Acciones */}
      <div className={styles.opciones}>
        <p>Adjunta tus archivos para continuar</p>

        <BotonA onClick={continuar}>Continuar</BotonA>

        {/* volver a la pantalla anterior */}
        <a className={styles.volver} onClick={() => navigate(-1)}>
          Volver
        </a>
      </div>
    </div>
  );
};

export default V6Adjuntar;
