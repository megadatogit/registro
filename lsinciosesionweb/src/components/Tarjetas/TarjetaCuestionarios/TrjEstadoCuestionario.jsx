import React from 'react'
import styles from './trjEstadoCuestionario.module.css';
import completado from './completado.svg'

const TrjEstadoCuestionario = () => {
  return (
    <div className={styles.cntTarjetaEstado}>

        <div className={styles.cuestionarioDato}>
            <p className={styles.tituloEstadoCuestionario}>Título de cuestionario</p>
            <p className={styles.fecha}>Fecha de creación: 01/01/2023</p>
        </div>
        <div className={styles.estado}>
            <p className={styles.estadoTxt}>Completado</p>
            <img className={styles.estadoImg} src={completado} alt="Estado" />
        </div>

    </div>
  )
}

export default TrjEstadoCuestionario
