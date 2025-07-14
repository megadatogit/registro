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

        <div className={styles.cntTexto}>
        <TextoPrincipal
        textoPrincipal="Comprueba tu identidad"
        />
        <TextoSecundario
        textoSecundario={["Sube los documentos que te identifican: INE y Comprobante de domicilio (con antiguedad menor a tres meses).",<br key="1" />, "Este paso nos permite darte acceso completo de forma segura y personalizada."]}
        />
        </div>

        <div className={styles.cntTarjeta}>
            <TarjetaBase
            accion="Escanear documentos"
            descripcion="Toma una foto de tu documento directamente desde la cámara.
Ideal si no tienes el archivo guardado aún"
            textoBoton="Escanear documentos"
            />
            <TarjetaBase
            accion="Subir archivos"
            descripcion="Carga una imagen o PDF que ya tengas guardado.
              Asegúrate de que sea legible y esté completo"
            textoBoton="Subir archivos"
            />
            
        </div>


        <div className={styles.opciones}>
            <a>Llenar datos manualmente</a>
            <a>Subir más tarde desde tu perfil</a>
        
        </div>
      
    </div>
  )
}

export default V5ComprIdentidad
