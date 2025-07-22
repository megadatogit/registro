import React from 'react'
import styles from './v7revisarDoc.module.css'
import Logo from '../ElementosVista/Logo/Logo'
import TextoPrincipal from '../ElementosVista/TextoPrincipal/TextoPrincipal'
import TarjetaRevision from '../ElementosVista/TarjetaRevision/TarjetaRevision'

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
        <TarjetaRevision/>
      </div>
    </div>
  )
}

export default V7RevisarDoc
