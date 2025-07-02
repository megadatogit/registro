import React from 'react'
import styles from './texto.module.css'

const TextoPrincipal = ({textoPrincipal}) => {
  return (
    <div className={styles.cntTexto}>
      <p className={styles.textoPrincipal}>{textoPrincipal}</p>
    </div>
  )
}


export default TextoPrincipal
