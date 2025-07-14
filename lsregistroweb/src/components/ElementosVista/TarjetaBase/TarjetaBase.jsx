import React from 'react'
import styles from './tarjetaBase.module.css'
import BotonA from '../../Botones/BotonA'

const TarjetaBase = ({accion, descripcion, textoBoton}) => {
  return (
    <div className={styles.cntTarjetaBase}>
        <div className={styles.cntImg}>
            <img></img>
        </div>
        <div className={styles.cntTxt}>
            <p>{accion}</p>
            <p>{descripcion}</p>
        <BotonA
        textoBoton={textoBoton}
        />
        </div>

    </div>
  )
}
 
export default TarjetaBase
