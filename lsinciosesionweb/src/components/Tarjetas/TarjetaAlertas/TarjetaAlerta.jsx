import React from 'react'
import styles from './tarjetaAlerta.module.css'
import TarjetaSugerencia from './TarjetaSugerencia'

const TarjetaAlerta = () => {
  return (
    <div className={styles.cntTarjetaAlerta}>
        <p>Alertas y sugerencias</p>
        <TarjetaSugerencia />
    </div>
  )
}

export default TarjetaAlerta
