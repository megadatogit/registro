import React from 'react'
import styles from './trjEstadoCuestionario.module.css';
import completado from './completado.svg'

const TrjEstadoCuestionario = ({ id, nombre, descripcion, estado, fecha, srcIcon }) => {
  return (
    <div key={id} className={styles.cntTarjetaEstado}>
        <div className={styles.cuestionarioDato} data-estado={estado}>
            <p className={styles.tituloEstadoCuestionario}>{nombre}</p>
            <p className={styles.fecha}>Fecha de creación: {fecha}</p>
            <p className={styles.fecha}>{descripcion}</p>
        </div>
        <div className={styles.estado}>
            <p className={styles.estadoTxt}>{estado}</p>
            <img className={styles.estadoImg} src={srcIcon} alt={estado} />
        </div>
    </div>
  )
}

export default TrjEstadoCuestionario
