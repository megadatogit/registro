import React, {useRef} from 'react'
import styles from './tarjetaCarrucel.module.css'
import TarjetaOpcion from './TarjetaOpcion/TarjetaOpcion'
import cabina from './TarjetaOpcion/cabina.png'
import celular from './TarjetaOpcion/celular.png'
import expediente from './TarjetaOpcion/expediente.png'
import diagnostico from './TarjetaOpcion/diagnostico.png'
import botiquin from './TarjetaOpcion/botiquin.png'
import interrogacion from './TarjetaOpcion/question.svg'
import direccion from './TarjetaOpcion/direccion.svg'
import progreso from './TarjetaOpcion/progreso1.png'

const TarjetaCarrucel = () => {

 const carruselRef = useRef(null)

  const handleScroll = (direction) => {
    const { current } = carruselRef
    const scrollAmount = 300 // puedes ajustar el tamaño

    if (direction === 'left') {
      current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }


  return (
    <div className={styles.cntTarjetaCarrucel}>
        <h3 className={styles.bienvenida}>Te damos la bienvenida</h3>
        <div className={styles.cntCarru}>
        <button onClick={() => handleScroll('left')} className={styles.btnFlecha}><img src={direccion}></img></button>
        <div className={styles.cntTarjetas} ref={carruselRef}>
            
            <TarjetaOpcion
            srcIcono={botiquin} 
            tituloTarjeta="Cabina de toma de signos vitales" 
            descripcionTarjeta="Acude a alguna de nuestras cabinas móviles para consultar tus metricas"
            />
            <TarjetaOpcion
            srcIcono={progreso} 
            tituloTarjeta="Diagnostico Liber Salus" 
            descripcionTarjeta="Recibe diagnósticos basados en la información obtenida de tus cuestionarios"
            />
            <TarjetaOpcion
            srcIcono={botiquin} 
            tituloTarjeta="Kit básico de medición" 
            descripcionTarjeta="Obtén un kit básico de medición y lleva el registro de tu salud desde casa"
            />
            <TarjetaOpcion
            srcIcono={botiquin} 
            tituloTarjeta="Historial clínico digital" 
            descripcionTarjeta="Centraliza tu historial y ten siempre disponible tu información"
            />
            <TarjetaOpcion
            srcIcono={botiquin} 
            tituloTarjeta="Asistente médico virtual" 
            descripcionTarjeta="Recibe una consulta con nuestro asistente médico virtual sin salir de casa."
            />
            
            {/* <TarjetaOpcion
            srcIcono={diagnostico} 
            tituloTarjeta="Disgnóstico" 
            descripcionTarjeta="El sistema realiza un diagnóstico preliminar basado en las respuestas de una serie de cuestionarios personalizados que nos ayudan a conocer mejor tu estado de salud."
            />
            
            <TarjetaOpcion
            srcIcono={interrogacion} 
            tituloTarjeta="Dudas frecuentes" 
            descripcionTarjeta="Seguramente tendrás dudas sobre cómo funciona el sistema, la afiliación o cualquier otro apartado. Consulta otras preguntsa que han realizado los usuarios."
            /> */}
        </div>
        
            <button onClick={() => handleScroll('right')} className={styles.btnFlecha}><img src={direccion}></img></button>
        </div>
    </div>
  )
}

export default TarjetaCarrucel
