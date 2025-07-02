import React from 'react'
import styles from './verificacion.module.css'
import Logo from '../Logo/Logo'
import BotonA from '../Botones/BotonA'

import TextoPrincipal from '../Textos/TextoPrincipal'
import TextoSecundario from '../Textos/TextoSecundario'

const Verificacion = () => {
  return (
    <div className={styles.cntVerificacion}>
        <Logo/>
        <TextoPrincipal
        textoPrincipal="Ingresar el código de verificación"
        />
        <TextoSecundario
        textoSecundario="Ingresa el código de verficación de 6 dígitos que te hemos enviado."
        />


        <form className={styles.form} id="confirmationForm">
        <label for="digit1"></label><br />
        
        <div className={styles.cntInputs}>
            <input className={styles.inputs}
          type="text"
          id="digit1"
          maxlength="1"
          required
          pattern="\d"
          oninput="moveToNext(this, 'digit2');"
        />
        <input className={styles.inputs}
          type="text"
          id="digit2"
          maxlength="1"
          required
          pattern="\d"
          oninput="moveToNext(this, 'digit3');"
          onkeydown="moveToPrev(event, this, 'digit1');"
        />
        <input className={styles.inputs}
          type="text"
          id="digit3"
          maxlength="1"
          required
          pattern="\d"
          oninput="moveToNext(this, 'digit4');"
          onkeydown="moveToPrev(event, this, 'digit2');"
        />
        <span>-</span>
        <input className={styles.inputs}
          type="text"
          id="digit4"
          maxlength="1"
          required
          pattern="\d"
          oninput="moveToNext(this, 'digit5');"
          onkeydown="moveToPrev(event, this, 'digit3');"
        />
        <input className={styles.inputs}
          type="text"
          id="digit5"
          maxlength="1"
          required
          pattern="\d"
          oninput="moveToNext(this, 'digit6');"
          onkeydown="moveToPrev(event, this, 'digit4');"
        />
        <input className={styles.inputs}
          type="text"
          id="digit6"
          maxlength="1"
          required
          pattern="\d"
          onkeydown="moveToPrev(event, this, 'digit5');"
        />
        </div>

        <div className={styles.cntBoton}>
            <p><BotonA
            textoBoton="Verficiar y continuar"/></p>
        </div>
      </form>
      <p id="message" ></p>

      <p>P</p>
    
        

    </div>
  )
}
export default Verificacion
