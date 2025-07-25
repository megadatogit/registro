import React from 'react'
import styles from './enlaceSocial.module.css'


const EnlaceSocial = ({srcRS}) => {
  return (
    <div className={styles.cntEnlace}>
        <img src={srcRS} className={styles.imgRS}></img>
    </div>
  )
}

export default EnlaceSocial