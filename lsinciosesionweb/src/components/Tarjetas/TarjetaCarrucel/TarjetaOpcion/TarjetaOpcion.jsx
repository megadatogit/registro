import React from 'react'
import sytles from './tarjetaOpcion.module.css'

const TarjetaOpcion = ( {srcIcono, tituloTarjeta, descripcionTarjeta} ) => {
  return (
    <div className={sytles.tarjetaOpcion}>
      
      <p className={sytles.tit}>{tituloTarjeta}</p> 
      
      <div className={sytles.cntIcon}>
        <img src={srcIcono} className={sytles.icon}></img>
      </div>
      
      <div className={sytles.cntTexto}>
        <p className={sytles.des}>{descripcionTarjeta}</p>
      </div>
      
    </div>
  )
}

export default TarjetaOpcion

