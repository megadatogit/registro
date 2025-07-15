import React from 'react'
import styles from './v7recibidos.module.css'
import Logo from '../ElementosVista/Logo/Logo'
import TextoPrincipal from '../ElementosVista/TextoPrincipal/TextoPrincipal'
import TextoSecundario from '../ElementosVista/TextoSecundario/TextoSecundario'
import srcLupa from './lupa.png'


const V7Recibidos = () => {
  return (
    <div className={styles.cntV7Recibidos}>

            <div className={styles.cntLogo}>
                <Logo />
            </div>
            <div className={styles.cntTexto}>
                <TextoPrincipal
                    textoPrincipal="Hemos recibido tus documentos " />
                <TextoSecundario
                    textoSecundario="Tus documentos se han recibido correctamente. Ahora estamos verificando su autenticidad. Esto puede tardar hasta 48 horas hábiles."
                />
            </div>

            <div className={styles.cntImg}>
                <img src={srcLupa} className={styles.lupa}></img>


            </div>
      
    </div>
  )
}

export default V7Recibidos
