import React from 'react'
import styles from './tarjetaBase.module.css'
import BotonA from '../../Botones/BotonA'

const TarjetaBase = () => {
  return (
    <div className={styles.cntTarjetaBase}>
        <div className={styles.cntImg}>
            <img></img>
        </div>
        <div className={styles.cntTxt}>
            <p>Escanea tus documentos</p>
            <p>Toma una foto de tu documento directamente desde la cámara.<br/>
Ideal si no tienes el archivo guardado aún.</p>
        <BotonA
        textoBoton="Escanear Documentos"
        />
        </div>

    </div>
  )
}
 
export default TarjetaBase
