import React from 'react'
import styles from './v5acompletarIne.module.css'
import Logo from '../ElementosVista/Logo/Logo'
import TextoPrincipal from '../ElementosVista/TextoPrincipal/TextoPrincipal'
import TextoSecundario from '../ElementosVista/TextoSecundario/TextoSecundario'
import Formulario from '../Formulario/Formulario'

const V5ACompletarIne = () => {
  return (
    <div className={styles.cntV5ACompletarIne}>
    
    <div className={styles.cntLogo}>
        <Logo/>
    </div>

    <div className={styles.cntTexto}>
        <TextoPrincipal
        textoPrincipal="Completa tus datos"
        />
        <TextoSecundario
        textoSecundario="Datos de tu identificaión oficial"
        />
    </div>

    <div className={styles.cntFormulario}>
        <Formulario/>
    </div>

      
    </div>
  )
}

export default V5ACompletarIne
