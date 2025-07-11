import React from 'react'
import styles from './logo.module.css'
import srcLogo from './LS-imagotipo-horizontal.svg'


const Logo = () => {
  return (
    <div className={styles.cntLogo}><img src={srcLogo}></img></div>
  )
}

export default Logo
