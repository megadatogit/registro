import React, { useState } from 'react'; // Importa useState
import styles from './registro.module.css';
import srcLogo from '../Inicio/LS-imagotipo-horizontal.svg';
import srcAbierto from './eye-password-see-view-svgrepo-com.svg'
import srcCerrado from './eye-key-look-password-security-see-svgrepo-com.svg'
import Logo from '../Logo/Logo';
import BotonA from '../Botones/BotonA';

const Inicio = () => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Función para alternar la visibilidad de la contraseña principal
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para alternar la visibilidad de la contraseña de confirmación
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className={styles.contenedorRegistro}>
      <div className={styles.cntBienvenida}>
        <p>¡Bienvenido a Liber Salus!</p>
        <p>Afíliate y toma el control de tu bienestar</p>
        <p>Para comenzar a usar nuestra plataforma, necesitas crear un usuario y afiliarte.<br/>
        Este proceso es sencillo y sólo toma tres pasos:</p>
        <div className={styles.cntPasos}>
          <div className={styles.elementoPaso}>
            <p className={styles.paso}>Crea tu usuario: <br/>
            Llena tus datos personales.</p>
          </div>
          <div className={styles.elementoPaso}>
            <p className={styles.paso}>Sube tus documentos: <br/>
            CURP, INE y comprobante de domicilio</p>
          </div>
          <div className={styles.elementoPaso}>
            <p className={styles.paso}>Completa tus cuestionarios de saliud</p>
          </div>
        </div>
        <p>¿Ya tienes una cuenta?</p>
        <p><span className={styles.liga}>Inicia sesion aquí</span> para continuar donde te quedaste</p>
      </div>
      <div className={styles.cntFormulario}>
        <Logo/>
        <div className={styles.formulario}>
          <form name="registro" method="" action="">
            <div className={styles.cntImput}>
              <input type="mail" name="correo" id="correo" placeholder="Correo electrónico"></input>
              {/* <label for="correo">Correo electrónico</label> */}
            </div>
            <div className={styles.cntImput}>
              <input type="text" name="telefono" id="telefono" placeholder="Telefono celular" maxLength="10"></input>
              {/* <label for="teléfono">Teléfono celular</label> */}
            </div>

            {/* Input de Contraseña principal */}
            <div className={styles.cntImput}>
              <input
                type={showPassword ? "text" : "password"} // Cambia el tipo según el estado
                name="contrasena"
                id="contrasena"
                placeholder="Contraseña"
              />
              <span
                className={styles.passwordToggle} // Clase CSS para posicionar el ojo
                onClick={togglePasswordVisibility} // Manejador de clic
              >
                {showPassword ? <img className={styles.ojos} src={srcCerrado} alt="ojo cerrado" /> : <img className={styles.ojos} src={srcAbierto} alt="ojo abierto" />} {/* Icono de ojo abierto o cerrado */}
              </span>
            </div>

            {/* Input de Confirmar Contraseña */}
            <div className={styles.cntImput}>
              <input
                type={showConfirmPassword ? "text" : "password"} // Cambia el tipo según el estado
                name="confirmContra"
                id="confirmContra" // Asegúrate de que el id sea único
                placeholder="Confirmar contraseña"
              />
              <span
                className={styles.passwordToggle} // Clase CSS para posicionar el ojo
                onClick={toggleConfirmPasswordVisibility} // Manejador de clic
              >
                {showConfirmPassword ? <img className={styles.ojos} src={srcCerrado} alt="ojo cerrado" /> : <img className={styles.ojos} src={srcAbierto} alt="ojo abierto" />} {/* Icono de ojo abierto o cerrado */}
              </span>
            </div>

            <div className={styles.cntPoliticas}>
              <input type="checkbox" name="politicas"/>
              <label className={styles.terminos}> <p>He leído y acepto <span><a>Términos y Condiciones</a></span> y nuestras <span><a>Políticas de privacidad</a></span></p></label>
            </div>
            <div>
              <p><BotonA
              textoBoton="Crear cuenta"/></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Inicio;