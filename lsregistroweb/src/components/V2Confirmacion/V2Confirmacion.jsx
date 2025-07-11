import React from 'react'
import styles from './v2confirmacion.module.css'
import srclogo from './LS-imagotipo-horizontal.svg'
import Logo from '../ElementosVista/Logo/Logo'
import BotonA from '../Botones/BotonA'
import TextoPrincipal from '../ElementosVista/TextoPrincipal/TextoPrincipal'
import TextoSecundario from '../ElementosVista/TextoSecundario/TextoSecundario'


const Confirmacion = () => {
    return (
        <div className={styles.cntConfirmacion}>

            <div className={styles.cntLogo}>
                <Logo />
            </div>
            <div className={styles.cntTextos}>
                <TextoPrincipal
                    textoPrincipal="Confirmemos tu información de contacto"
                />

                <TextoSecundario
                    textoSecundario={[
    "Antes de continuar, elige a dónde deseas que te enviemos tu código de verificación.",
    <br key="1" />,
    "Esto nos permite asegurar que tus datos sean correctos y proteger tu cuenta."
  ]}
                />
            </div>

            <form className={styles.form}>
  <fieldset className={styles.fieldset}>
    {/* <legend>Selecciona cómo quieres recibir tu código</legend> */}

    <div className={styles.input}>
      <input
        type="radio"
        id="correo"
        name="metodo"           // <-- nombre IGUAL para ambos radios
        value="email"
      />
      <label htmlFor="correo"> {/* <-- htmlFor en React */}
        Enviar código a e-mail:<br />
        <span className={styles.datos}>correo@mail.com</span>
      </label>
    </div>

    <div className={styles.input}>
      <input
        type="radio"
        id="telefono"
        name="metodo"          // <-- igual aquí
        value="phone"
      />
      <label htmlFor="telefono">
        Enviar código por SMS:<br />
        <span className={styles.datos}>•••• ••• •4567</span>
      </label>
    </div>

    <div>
      <BotonA textoBoton="Enviar código" />
    </div>
  </fieldset>

  <p>¿Tu información no es correcta? </p>
  <a>Volver a registro</a>
</form>

        </div>
    )
}

export default Confirmacion
