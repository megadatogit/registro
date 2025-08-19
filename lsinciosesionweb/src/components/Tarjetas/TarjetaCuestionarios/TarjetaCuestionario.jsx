import React from 'react'
import styles from './tarjetaCuestionario.module.css';
import TrjEstadoCuestionario from './TrjEstadoCuestionario';
import TarjetaEvaluacion from '../TarjetaEvaluacion/TarjetaEvaluacion';

const TarjetaCuestionario = () => {
  return (
    <div className={styles.cntTarjetaCuestionario}>
        <h3 className={styles.tituloCuestionario}>Cuestionarios</h3>
        
        <div className={styles.cntEstadosCuestionario}>
            <TrjEstadoCuestionario />
            <TrjEstadoCuestionario />
            
            
        </div>
        
        
    </div>
  )
}

export default TarjetaCuestionario
