import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';          
import * as z from 'zod';
import api from '../../services/api.js'

/*   TUS IMPORTS EXISTENTES   */
import styles from './v1registro.module.css';
import srcLogo     from './LS-imagotipo-horizontal.svg';
import srcAbierto  from './eye-password-see-view-svgrepo-com.svg';
import srcCerrado  from './eye-key-look-password-security-see-svgrepo-com.svg';
import Logo        from '../ElementosVista/Logo/Logo';
import BotonA      from '../Botones/BotonA';
import Switch      from '../Seleccion/Switch';
import Derechos    from './Derechos';

/* ---------- 1. ESQUEMA ZOD (mantiene tus regex) ---------- */ 
const schema = z.object({
  correo: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Correo no válido'),
  telefono: z.string().regex(/^\d{10}$/, 'Debe tener 10 dígitos'),
  contrasena: z.string().regex(
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,}$/,
    '8+, 1 mayúsc., 1 minúsc., 1 número, 1 símbolo'
  ),
  confirmContra: z.string(),
  politicas: z.literal(true, { errorMap: () => ({ message: 'Acepta los términos' }) }),
  /* code_telefono no viene del usuario: lo pondremos fijo más adelante  */
}).refine((d) => d.contrasena === d.confirmContra, {
  path: ['confirmContra'],
  message: 'Las contraseñas no coinciden',
});


const Inicio = () => {
  const [mostrarPassword,        setMostrarPassword]        = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);

  /* ---------- RHF CON RESOLVER ZOD ---------- */                       
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),   
    mode: 'onChange',
  });

  /* ---------- SUBMIT ---------- */
  
const onSubmit = async (formData) => {
  try {
    /* Payload exactamente como lo pide el backend */
    const payload = {
      rol: 1,
      correo: formData.correo,
      telefono: formData.telefono,
      code_telefono: '52',          // ← México; cámbialo si usas otro prefijo
      contrasena: formData.contrasena,
    };

    const res = await api.post('preregistro/preregistro/registro/', payload);

    console.log('Respuesta backend', res.data);
    alert('¡Cuenta creada exitosamente! 🎉');

    /* Si después recibes token o id → guárdalo aquí */
    // localStorage.setItem('token', res.data.token);

  } catch (err) {
    if (err.response) {
      // El backend devolvió error de validación (422) u otro código
      alert(err.response.data.detail?.[0]?.msg || 'Error del servidor');
    } else {
      alert('No se pudo conectar al servidor');
    }
  }
};


  /* ---------- RENDER ---------- */
  return (
    <div className={styles.contenedorRegistro}>
      <div className={styles.cntBienvenida}>
        {/* ...tu bloque de bienvenida aquí... */}

        <div className={styles.cntSaludo}>
          <div>
            <p>¡Bienvenido a Liber Salus!</p>
            <p >Afíliate y toma el control de tu bienestar</p>
          </div>
          <div className={styles.cntLogo}>
            <Logo />
          </div>
        </div>
        <p>Para comenzar a usar nuestra plataforma, necesitas crear un usuario y afiliarte.<br />
          Este proceso es sencillo y sólo toma tres pasos:</p>
        <div className={styles.cntPasos}>
          <div className={styles.elementoPaso}>
            <p className={styles.paso}>Crea tu usuario: <br />
              Llena tus datos personales.</p>
          </div>
          <div className={styles.elementoPaso}>
            <p className={styles.paso}>Sube tus documentos: <br />
              CURP, INE y comprobante de domicilio</p>
          </div>
          <div className={styles.elementoPaso}>
            <p className={styles.paso}>Completa tus cuestionarios de saliud</p>
          </div>
        </div>

        <div className={styles.cntDerechosInfo}>
          <Derechos/>
        </div>
      </div>


      <div className={styles.cntFormulario}>
        <div className={styles.formulario}>
          <div className={styles.logoForm}><Logo /></div>

          {/* -------- FORMULARIO -------- */}
          <form name="registro" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Switch />

            {/* ------- CORREO ------- */}
            <div className={styles.cntImput}>
              <input
                type="email"
                id="correo"
                placeholder="Correo electrónico"
                {...register("correo")}
                className={errors.correo ? styles.errorInput : ""}
              />
              {errors.correo && <span className={styles.error}>{errors.correo.message}</span>}
            </div>

            {/* ------- TELÉFONO ------- */}
            <div className={styles.cntImput}>
              <input
                type="text"
                id="telefono"
                placeholder="Teléfono celular"
                maxLength="10"
                {...register("telefono")}
                className={errors.telefono ? styles.errorInput : ""}
              />
              {errors.telefono && <span className={styles.error}>{errors.telefono.message}</span>}
            </div>

            {/* ------- CONTRASEÑA ------- */}
            <div className={styles.cntImput}>
              <input
                type={mostrarPassword ? "text" : "password"}
                id="contrasena"
                placeholder="Contraseña"
                {...register("contrasena")}
                className={errors.contrasena ? styles.errorInput : ""}
              />
              {/* toggle */}
              <span
                className={styles.passwordToggle}
                onClick={() => setMostrarPassword(p => !p)}
                tabIndex={0}
                role="button"
                aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                <img className={styles.ojos} src={mostrarPassword ? srcCerrado : srcAbierto} alt="" />
              </span>
              {errors.contrasena && <span className={styles.error}>{errors.contrasena.message}</span>}
            </div>

            {/* ------- CONFIRMAR ------- */}
            <div className={styles.cntImput}>
              <input
                type={mostrarConfirmPassword ? "text" : "password"}
                id="confirmContra"
                placeholder="Confirmar contraseña"
                {...register("confirmContra")}
                className={errors.confirmContra ? styles.errorInput : ""}
              />
              {/* toggle */}
              <span
                className={styles.passwordToggle}
                onClick={() => setMostrarConfirmPassword(p => !p)}
                tabIndex={0}
                role="button"
                aria-label={mostrarConfirmPassword ? "Ocultar confirmación" : "Mostrar confirmación"}
              >
                <img className={styles.ojos} src={mostrarConfirmPassword ? srcCerrado : srcAbierto} alt="" />
              </span>
              {errors.confirmContra && <span className={styles.error}>{errors.confirmContra.message}</span>}
            </div>

            {/* ------- POLÍTICAS ------- */}
            <div className={styles.cntPoliticas}>
              <div className={styles.cntChk}>
                <input
                  type="checkbox"
                  id="politicas"
                  {...register("politicas")}
                  className={errors.politicas ? styles.errorInput : ""}
                />
                <label htmlFor="politicas" className={styles.terminos}>
                  <p>He leído y acepto <span><a href="#">Términos y Condiciones</a></span> y nuestras <span><a href="#">Políticas de privacidad</a></span></p>
                </label>
              </div>
              {errors.politicas && <span className={styles.error}>{errors.politicas.message}</span>}
            </div>

            {/* ------- BOTÓN ------- */}
            <div>
              <p>
                <BotonA
                  type="submit"
                  disabled={!isValid || isSubmitting}      // ⟵ NUEVO
                >
                  {isSubmitting ? 'Creando...' : 'Crear cuenta'}   {/* ⟵ NUEVO */}
                </BotonA>
              </p>
            </div>
          </form>

          {/* …tu bloque “¿Ya tienes cuenta?” permanece … */}
        </div>

        <div className={styles.cntDerechosForm}><Derechos/></div>
      </div>
    </div>
  );
};

export default Inicio;
