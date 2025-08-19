import React from 'react'
import styles from './tarjetaEvaluacion.module.css';

const TarjetaEvaluacion = () => {
  return (
    <div className={styles.cntTarjetaEvaluacion}>
      <div className={styles.cntInfo}>
        <div className={styles.cntTxt}>
            <h3>Mi Evaluación</h3>
            <p>Titulo del Cuestionario</p>
            <p>Resultado o interpretación</p>
            <p>Completa tu cuestionario para obtener resultados</p>
        </div>
        <div className={styles.cntGrafica}>
            <div className={styles.grafica}>
                <span className={styles.valor}>75%</span>
            </div>
            <p>Progreso</p>
        </div>
      </div>

      <div className={styles.cntEstado}>
        <div className={styles.cntDesc}>
            <p>Estado de la Evaluación</p>
            <p>En proceso</p>
        </div>
        <div className={styles.cntBtn}>
            <button className={styles.btn}><span>Continuar <br/> respondiendo</span><span className={styles.flecha}></span></button>
        </div>
      </div>
    </div>
  )
}

export default TarjetaEvaluacion
