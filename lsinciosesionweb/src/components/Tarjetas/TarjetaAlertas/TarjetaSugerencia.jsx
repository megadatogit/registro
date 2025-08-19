import React from 'react'
import styles from './tarjetaSugerencia.module.css'

const TarjetaSugerencia = () => {
  return (
    <div className={styles.cntTarjetaSugerencia}>
        <div className={styles.cnInfo}>
            <span>❤️</span>
            <p>Área de atención</p>
        </div>
        <div className={styles.cntSujerencia}>
            <p className={styles.sugenrecia}>
                Hay áreas en las que puedes fortalecer tu bienestar
            </p>
            <button className={styles.btn}>Explorar herramientas</button>
        </div>

    </div>
  )
}

export default TarjetaSugerencia
