import React from 'react'
import styles from './backgroundPanel.module.css';
import lineas from './line.svg';

const BackgroundPanel = () => {
  return (
    <div className={styles.backgroundPanel}>
        <img src={lineas} className={styles.lineas} alt="Background Lines" />
      <div className={styles.capa}>
        
      </div>
    </div>
  )
}

export default BackgroundPanel
