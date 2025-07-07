import React from 'react'
import styles from  './switch.module.css'

const Switch = () => {
  return (
    <div className={styles.cntSwitch}>
      <input
      className={styles.switch}
      id="switch"
      type="checkbox"
      placeholder="Paciente"
      />
      <label htmlFor="switch"></label>
      
      
    </div>
  )
} 

export default Switch

