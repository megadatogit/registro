import React from 'react'
import styles from './botonA.module.css'

    const BotonA = ({textoBoton}) => {
  return (
    <div className={styles.cntBoton}>
        <button className={styles.boton} type="submit">{textoBoton}</button>
    </div>
  )
}

export default BotonA
