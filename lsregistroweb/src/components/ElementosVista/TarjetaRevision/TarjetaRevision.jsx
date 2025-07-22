import React from 'react'
import styles from './tarjetaRevision.module.css'
import validado from './Group.svg' 

const TarjetaRevision = () => {
  return (
    <div className={styles.cntTarjetaAdjuntar}>
        <div className={styles.icon}>
            <img src={validado} className={styles.icon}></img>
        </div>
        <div className={styles.cntTexto}>
            <p>INE</p>
            <p>Cargado correctamente</p>
        </div>
        <div>
          <a className={styles.accion}>Reemplazar</a>
        </div>

    </div>
  )
}

export default TarjetaRevision
