import React from 'react'
import styles from './tarjetaRevision.module.css'
import validado from './Group.svg' 

const TarjetaRevision = ({documento, estadoDoc}) => {
  return (
    <div className={styles.cntTarjetaAdjuntar}>
        <div className={styles.icon}>
            <img src={validado} className={styles.icon}></img>
        </div>
        <div className={styles.cntTexto}>
            <p>{documento}</p>
            <p>{estadoDoc}</p>
        </div>
        <div className={styles.cntAccion}>
          <a className={styles.accion}>Reemplazar</a>
        </div>

    </div>
  )
}

export default TarjetaRevision
