// src/components/V4ConfExito/V4ConfExito.jsx
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/AppRouter';

import styles from './v4confExito.module.css';
import Logo from '@/components/ElementosVista/Logo/Logo';
import TextoPrincipal from '@/components/ElementosVista/TextoPrincipal/TextoPrincipal';
import srcPaloma from './palomita.svg';
import api from '../../services/api';

const V4ConfExito = () => {
  const navigate = useNavigate();

  const { state } = useLocation();  

  console.log(state);

 

  /* ⏱️ 2 s y salto automático a la vista de identidad */
  useEffect(() => {
    const id = setTimeout(
      () => navigate(ROUTES.COMPROBAR_IDENTIDAD, { replace: true }),
      2000
    );
    return () => clearTimeout(id);
  }, [navigate]);

  return (
    <div className={styles.cntConfExito}>
      <div className={styles.cntLogo}>
        <Logo />
      </div>

      <TextoPrincipal textoPrincipal="Confirmación exitosa" />

      <div className={styles.cntPaloma}>
        <img src={srcPaloma} alt="Éxito" className={styles.paloma} />
      </div>
    </div>
  );
};

export default V4ConfExito;
