// src/components/V3Verificacion/V3Verificacion.jsx
import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { ROUTES } from '@/routes/AppRouter';

import styles from './v3verificacion.module.css';
import Logo            from '@/components/ElementosVista/Logo/Logo';
import BotonA          from '@/components/Botones/BotonA';
import TextoPrincipal  from '@/components/ElementosVista/TextoPrincipal/TextoPrincipal';
import TextoSecundario from '@/components/ElementosVista/TextoSecundario/TextoSecundario';

const Verificacion = () => {
  const { state } = useLocation();          // { metodo:'correo'|'telefono', correo / telefono }
  const navigate  = useNavigate();

  const [digits,   setDigits] = useState(['', '', '', '', '', '']);
  const [loading,  setLoading] = useState(false);
  const [errorMsg, setError]  = useState('');
  const inputsRef = useRef([]);

  /* ─── manejo de inputs ───────────────────────────────────── */
  const handleChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;               // acepta solo dígito o vacío
    const copy = [...digits];
    copy[idx] = val;
    setDigits(copy);
    if (val && idx < 5) inputsRef.current[idx + 1].focus();
    setError('');                                 // limpia error al escribir
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === 'Backspace' && !digits[idx] && idx > 0)
      inputsRef.current[idx - 1].focus();
  };

  /* ─── verificar código ───────────────────────────────────── */
  const verificar = async () => {
    const codigo = digits.join('');
    if (codigo.length !== 6) {
      setError('Ingresa los 6 dígitos.');
      return;
    }

    try {
      setLoading(true);

      await api.post(`/preregistro/preregistro/validar-${state.metodo}/`, {
        identificador: state[state.metodo], // correo o teléfono
        codigo,
      });

      navigate(ROUTES.CONFIRMACION_EXITO, { state });       // éxito ✔️
    } catch (err) {
      console.error(err);
      /* convierte cualquier estructura a string */
      let msg = 'Código incorrecto o expirado';
      if (err?.response?.data?.detail) {
        const d = err.response.data.detail;
        msg = Array.isArray(d) ? d.map((e) => e.msg).join(' · ') : String(d);
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  /* ─── reenviar código ────────────────────────────────────── */
  const reenviar = () =>
    api.post('/preregistro/preregistro/reenviar-codigo/', {
      identificador: state[state.metodo],
    });

  /* ─── UI ─────────────────────────────────────────────────── */
  return (
    <div className={styles.cntVerificacion}>
      <div className={styles.cntLogo}><Logo /></div>

      <TextoPrincipal  textoPrincipal="Ingresar el código de verificación" />
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

        {errorMsg && <span className={styles.error}>{errorMsg}</span>}

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
