import React from 'react'
import styles from './tarjetaCuestionario.module.css';
import TrjEstadoCuestionario from './TrjEstadoCuestionario';
import TarjetaEvaluacion from '../TarjetaEvaluacion/TarjetaEvaluacion';

import completado from  './completado.svg'
import proceso from  './proceso.svg'
import inactivo from  './candado.svg'


const estados = ["inactivo", "completado", "proceso"]

  const perfilCuestionario = 
  [
    {
    id: 1,
    nombre: "Cuestionario de Satisfacción",
    descripcion: "Evalúa la satisfacción del cliente con el servicio.",
    estado: 1,
    fecha: "01/01/2023",
  },
  {
    id: 2,
    nombre: "Cuestionario de Evaluación",
    descripcion: "Evalúa el desempeño del empleado.",
    estado: 0,
    fecha: "01/01/2023"
  },
  {
    id: 3,
    nombre: "Cuestionario de Clima Laboral",
    descripcion: "Evalúa el ambiente laboral en la empresa.",
    estado: 2,
    fecha: "01/01/2023"
  }

  ];


  const srcIcon = {
    completado,
    proceso,
    inactivo
  };

  const TarjetaCuestionario = () => {


  return (
    <div className={styles.cntTarjetaCuestionario}>

        <h3 className={styles.tituloCuestionario}>Cuestionarios</h3>
        
        <div className={styles.cntEstadosCuestionario}>
            {perfilCuestionario.map((cuestionario) => (
                <TrjEstadoCuestionario 
                    key={cuestionario.id}
                    id={cuestionario.id}
                    nombre={cuestionario.nombre}
                    descripcion={cuestionario.descripcion}
                    estado={estados[cuestionario.estado]}
                    fecha={cuestionario.fecha}
                    srcIcon={srcIcon[estados[cuestionario.estado]]}
                    name={estados[cuestionario.estado]}

                />
            ))}
        </div>
    </div>
  )
}

export default TarjetaCuestionario
