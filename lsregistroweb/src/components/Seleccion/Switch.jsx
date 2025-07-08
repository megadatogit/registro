import React from 'react'
import styles from  './switch.module.css'

const Switch = () => {
  
  return (
    <div className={styles.cntSwitch}>
      <input
      className={styles.input}
      id="switch"
      type="checkbox"
      aria-label="Cambiar tipo de perfil"
      role="switch"
      />
      <label 
      className={styles.switch}
      htmlFor="switch">
        {/* <span className={styles.spanPaciente}>Paciente</span>
        <span className={styles.spanProfecional}>Personal de salud</span> */}
      </label>
      
    </div>
  )
} 

export default Switch

