import React, { useState } from 'react';
import styles from './registro.module.css';
import srcLogo from '../Inicio/LS-imagotipo-horizontal.svg';
import srcAbierto from './eye-password-see-view-svgrepo-com.svg'
import srcCerrado from './eye-key-look-password-security-see-svgrepo-com.svg'
import Logo from '../Logo/Logo';
import BotonA from '../Botones/BotonA';
import { useForm } from 'react-hook-form'
import Switch from '../Seleccion/Switch';
import Derechos from './Derechos';

const Inicio = () => {
  // Estados para mostrar/ocultar contraseña
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [mostrarConfirmPassword, setMostrarConfirmPassword] = useState(false);

  // RHF setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ mode: "onChange" });

  // Watchers
  const passwordValue = watch("contrasena", "");
  const terminos = watch("politicas", false);

  // Submit handler
  const onSubmit = (data) => {
    console.log("Datos validados", data)
    // Aquí va el envío a backend...
  }

  // Alternar visibilidad de contraseñas
  const alternarPassword = () => setMostrarPassword(prev => !prev);
  const alternarConfirmPassword = () => setMostrarConfirmPassword(prev => !prev);

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
          <div className={styles.logoForm}>
            <Logo/>
          </div>
          <form name="registro" onSubmit={handleSubmit(onSubmit)}>
            <Switch />

            {/* Correo */}
            <div className={styles.cntImput}>
              <input
                type="email"
                id="correo"
                placeholder="Correo electrónico"
                {...register("correo", {
                  required: "Este campo es obligatorio",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Correo no válido"
                  }
                })}
                className={errors.correo ? styles.errorInput : ""}
              />
              {errors.correo && <span className={styles.error}>{errors.correo.message}</span>}
            </div>

            {/* Teléfono */}
            <div className={styles.cntImput}>
              <input
                type="text"
                id="telefono"
                placeholder="Teléfono celular"
                maxLength="10"
                {...register("telefono", {
                  required: "Teléfono requerido",
                  minLength: { 
                    value: 10, 
                    message: "Debe tener 10 dígitos" },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Solo números"
                  }
                })}
                className={errors.telefono ? styles.errorInput : ""}
              />
              {errors.telefono && <span className={styles.error}>{errors.telefono.message}</span>}
            </div>

            {/* Contraseña */}
            <div className={styles.cntImput}>
              <input
                type={mostrarPassword ? "text" : "password"}
                id="contrasena"
                placeholder="Contraseña"
                {...register("contrasena", {
                  required: "Contraseña requerida",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]{8,}$/,
                    message: "Debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un símbolo."
                  }
                })}
                className={errors.contrasena ? `${styles.errorInput}` : ""}
              />
              <span
                className={styles.passwordToggle}
                onClick={alternarPassword}
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && alternarPassword()}
                aria-label={mostrarPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                role="button"
              >
                {mostrarPassword
                  ? <img className={styles.ojos} src={srcCerrado} alt="ojo cerrado" />
                  : <img className={styles.ojos} src={srcAbierto} alt="ojo abierto" />}
              </span>
              {errors.contrasena && <span className={styles.error}>{errors.contrasena.message}</span>}
            </div>

            {/* Confirmar contraseña */}
            <div className={styles.cntImput}>
              <input
                type={mostrarConfirmPassword ? "text" : "password"}
                id="confirmContra"
                placeholder="Confirmar contraseña"
                {...register("confirmContra", {
                  required: "Confirma tu contraseña",
                  validate: value =>
                    value === passwordValue || "Las contraseñas no coinciden"
                })}
                className={errors.confirmContra ? styles.errorInput : ""}
              />
              <span
                className={styles.passwordToggle}
                onClick={alternarConfirmPassword}
                tabIndex={0}
                onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && alternarConfirmPassword()}
                aria-label={mostrarConfirmPassword ? "Ocultar confirmación" : "Mostrar confirmación"}
                role="button"
              >
                {mostrarConfirmPassword
                  ? <img className={styles.ojos} src={srcCerrado} alt="ojo cerrado" />
                  : <img className={styles.ojos} src={srcAbierto} alt="ojo abierto" />}
              </span>
              {errors.confirmContra && <span className={styles.error}>{errors.confirmContra.message}</span>}
            </div>

            {/* Políticas */}
            <div className={styles.cntPoliticas}>
              <div className={styles.cntChk}>
                <input
                type="checkbox"
                id="politicas"
                {...register("politicas", {
                  required: {
                    value: true,
                    message: "Acepta los términos y condiciones"
                  }
                })}
                className={errors.politicas ? styles.errorInput : ""}
              />
              <label className={styles.terminos} htmlFor="politicas">
                <p>He leído y acepto <span><a href="#">Términos y Condiciones</a></span> y nuestras <span><a href="#">Políticas de privacidad</a></span></p>
              </label>
              </div>
              {errors.politicas && <span className={styles.error}>{errors.politicas.message}</span>}
            </div>

            <div>
              <p>
                <BotonA
                  textoBoton="Crear cuenta"
                  // Puedes pasarle una prop disabled si RHF detecta errores: disabled={Object.keys(errors).length > 0}
                />
              </p>
            </div>
          </form>
          <div className={styles.iniciarSesion}><p>¿Ya tienes una cuenta?</p>
            <p><span className={styles.liga}>Inicia sesión aquí</span> para continuar donde te quedaste</p>
          </div>
        </div>
        <div className={styles.cntDerechosForm}>
          <Derechos/>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
