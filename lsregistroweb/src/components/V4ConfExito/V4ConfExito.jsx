import React from 'react'
import styles from './v4confExito.module.css'
import Logo from '../ElementosVista/Logo/Logo'
import TextoPrincipal from '../ElementosVista/TextoPrincipal/TextoPrincipal'
import srcPaloma from './palomita.svg'

const V4ConfExito = () => {
  return (
    <div className={styles.cntConfExito}>
        <div className={styles.cntLogo}>
          <Logo/>
        </div>
        <TextoPrincipal
        textoPrincipal="Comfirmación exitosa"
        />
        <div className={styles.cntPaloma}>
            <div className={styles.paloma}></div>
        </div>

    </div>
  )
}

export default V4ConfExito
