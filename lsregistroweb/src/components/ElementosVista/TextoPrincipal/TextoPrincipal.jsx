import React from 'react'
import styles from './textoPrincipal.module.css'

const TextoPrincipal = ({textoPrincipal}) => {
  return (
    <div className={styles.cntTextoPrincipal}>
      <p className={styles.textoPrincipal}>{textoPrincipal}</p>
    </div>
  )
}


export default TextoPrincipal
