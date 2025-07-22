import React from 'react'
import styles from './v5acompletarIne.module.css'
import Logo from '../ElementosVista/Logo/Logo'
import TextoPrincipal from '../ElementosVista/TextoPrincipal/TextoPrincipal'
import TextoSecundario from '../ElementosVista/TextoSecundario/TextoSecundario'
import FormularioINE from '../Formulario/FormularioINE'
import FormularioDom from '../Formulario/FormularioDom'

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
        textoSecundario="Datos de tu domicilio"
        />
    </div>

    <div className={styles.cntFormulario}>
        <FormularioDom/>
    </div>

      
    </div>
  )
}

export default V5ACompletarIne
