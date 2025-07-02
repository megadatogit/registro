import React from 'react'
import styles from './texto.module.css'

const TextoSecundario = ({textoSecundario}) => {
  return (
    <div>
      <p className={styles.textoSecundario}>{textoSecundario}</p>
    </div>
  )
}


export default TextoSecundario