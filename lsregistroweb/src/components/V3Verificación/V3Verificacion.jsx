// src/components/V3Verificacion/V3Verificacion.jsx
import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { ROUTES } from '@/routes/AppRoutes';

import styles from './v3verificacion.module.css';
import Logo from '@/components/ElementosVista/Logo/Logo';
import BotonA from '@/components/Botones/BotonA';
import TextoPrincipal from '@/components/ElementosVista/TextoPrincipal/TextoPrincipal';
import TextoSecundario from '@/components/ElementosVista/TextoSecundario/TextoSecundario';

const Verificacion = () => {
  const { state } = useLocation();          // { id, correo, telefono }
  const navigate  = useNavigate();

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputsRef = useRef([]);

  /* Manejo de inputs */
  const handleChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;         // solo dígito o vacío
    const copy = [...digits];
    copy[idx] = val;
    setDigits(copy);
    if (val && idx < 5) inputsRef.current[idx + 1].focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0) {
      inputsRef.current[idx - 1].focus();
    }
  };

  /* Enviar código al backend */
  const verificar = async () => {
    const codigo = digits.join('');
    if (codigo.length !== 6) return alert('Ingresa los 6 dígitos.');

    try {
      setLoading(true);
      await api.post('/preregistro/preregistro/validar_codigo/', {
        id: state.id,
        codigo,
      });
      navigate(ROUTES.CONFIRMACION_EXITO);
    } catch (err) {
      alert('Código incorrecto o expirado');
    } finally {
      setLoading(false);
    }
  };

  /* Reenviar código */
  const reenviar = () =>
    api.post('/preregistro/preregistro/reenviar_codigo/', { id: state.id });

  return (
    <div className={styles.cntVerificacion}>
      <div className={styles.cntLogo}><Logo /></div>

      <TextoPrincipal textoPrincipal="Ingresar el código de verificación" />
      <TextoSecundario textoSecundario="Ingresa el código de verificación de 6 dígitos que te hemos enviado." />

      <form className={styles.form} onSubmit={(e) => { e.preventDefault(); verificar(); }}>
        <div className={styles.cntInputs}>
          {digits.map((d, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              className={styles.inputs}
              type="text"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
            />
          ))}
        </div>

        <div className={styles.cntBoton}>
          <BotonA type="submit" disabled={loading}>
            {loading ? 'Verificando…' : 'Verificar y continuar'}
          </BotonA>
        </div>
      </form>

      <p className={styles.reenviarWrap}>
        ¿No recibiste el código?{' '}
        <a className={styles.reenviar} onClick={reenviar}>Reenviar</a>
      </p>
    </div>
  );
};

export default Verificacion;
