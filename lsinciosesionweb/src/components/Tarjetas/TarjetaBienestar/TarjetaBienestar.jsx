import React from 'react'
import styles from './tarjetaBienestar.module.css'

const TarjetaBienestar = () => {
  return (
    <div className={styles.cntTarjetaBienestar}>
        <p>Áreas de Bienestar</p>
        <div className={styles.cntAccesos}>
            <a className={styles.link} href="#">Bienestar físico</a>
            <a className={styles.link} href="#">Bienestar emocional</a>
            <a className={styles.link} href="#">Bienestar social</a>
            <a className={styles.link} href="#">Bienestar nutricional</a>
        </div>
    </div>
  )
}

export default TarjetaBienestar
