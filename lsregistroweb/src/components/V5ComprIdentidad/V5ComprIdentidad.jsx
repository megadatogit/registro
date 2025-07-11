import React from 'react'
import styles from './v5comprIdentidad.module.css'
import Logo from '../ElementosVista/Logo/Logo'
import TextoPrincipal from '../ElementosVista/TextoPrincipal/TextoPrincipal'
import TextoSecundario from '../ElementosVista/TextoSecundario/TextoSecundario'
import TarjetaBase from '../ElementosVista/TarjetaBase/TarjetaBase'


const V5ComprIdentidad = () => {
  return (
    <div className={styles.cntComprIdentidad}>
        <div className={styles.cntLogo}>
          <Logo/>
        </div>
        <TextoPrincipal
        textoPrincipal="Comprueba tu identidad"
        />
        <TextoSecundario
        textoSecundario={["Sube los documentos que te identifican: INE y Comprobante de domicilio (con antiguedad menor a tres meses).",<br key="1" />, "Este paso nos permite darte acceso completo de forma segura y personalizada."]}
        />

        <div className={styles.cntTarjeta}>
            <TarjetaBase/>
            <TarjetaBase/>
        </div>


        <div className={styles.opciones}>
            <a>Llenar datos manualmente</a>
            <a>Subir más tarde desde tu perfil</a>
        
        </div>
      
    </div>
  )
}

export default V5ComprIdentidad
