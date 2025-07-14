import React from 'react'
import styles from './v6adjuntar.module.css'
import Logo from '../ElementosVista/Logo/Logo'
import TextoPrincipal from '../ElementosVista/TextoPrincipal/TextoPrincipal'
import TarjetaAdjuntar from '../ElementosVista/TarjetaAdjuntar/TarjetaAdjuntar'
import BotonA from '../Botones/BotonA'

const V6Adjuntar = () => {
    return (
        <div className={styles.cntV6Adjutar}>
            <div className={styles.cntLogo}>
                <Logo />
            </div>
            <div className={styles.cntTexto}>
                <TextoPrincipal
                    textoPrincipal="Adjunta los archivos necesarios para verificar tu información" />
            </div>

            <div className={styles.cntTarjetas}>
                <TarjetaAdjuntar
                    accion="INE"
                    descripcion="Asegúrate incluir una imagen de frente y otra de reverso"
                    textoBoton="Cargar archivos del ordenador"
                />
                <TarjetaAdjuntar
                    accion="Comprobante de domicilio"
                    descripcion="Asegúrate incluir una imagen de frente y otra de reverso"
                    textoBoton="Cargar archivos del ordenador"
                />
            </div>

            <div className={styles.opciones}>
                <p>Adjunta tus archvios para continuar</p>
                <BotonA
                textoBoton="continuar"
                />
                <a className={styles.volver}>Volver</a>

            </div>

        </div>
    )
}

export default V6Adjuntar
