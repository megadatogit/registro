import React from 'react'
import styles from './v7revisarDoc.module.css'
import Logo from '../ElementosVista/Logo/Logo'
import TextoPrincipal from '../ElementosVista/TextoPrincipal/TextoPrincipal'
import TarjetaRevision from '../ElementosVista/TarjetaRevision/TarjetaRevision'
import clip from './clip.svg'
import BotonA from '../Botones/BotonA'

const V7RevisarDoc = () => {
  return (
    <div className={styles.cntV7RevisarDoc}>
      <div className={styles.cntLogo}>
        <Logo/>
      </div>
      <div className={styles.cntTextoPrincipal}>
        <TextoPrincipal
        textoPrincipal="Revisa tus documentos antes de continuar"
        />
      </div>

      <div className={styles.cntTarjetas}>
        <TarjetaRevision
        documento="INE"
        estadoDoc="Cargado correctamente"
        />
        <TarjetaRevision
        documento="Comprobante domicilio"
        estadoDoc="Cargado correctamente"
        />
        <div className={styles.cntRevisar}>
          <img src={clip}></img>
          <a className={styles.revisar}>Revisar documentos</a>
        </div>
        <div className={styles.cntBoton}>
          <a className={styles.revisar}>Volver</a>
          <BotonA>Continuar</BotonA>
        </div>

      </div>


    </div>
  )
}

export default V7RevisarDoc
