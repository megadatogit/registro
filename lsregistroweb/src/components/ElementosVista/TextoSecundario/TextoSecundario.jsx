import React from 'react'
import styles from './textoSecundario.module.css'

const TextoSecundario = ({textoSecundario}) => {
  return (
    <div className={styles.cntTextoSecundario}>
      <p className={styles.textoSecundario}>{textoSecundario}</p>
    </div>
  )
}

export default TextoSecundario