import React from 'react'
import styles from './v8opciones.module.css'
import Logo from '../ElementosVista/Logo/Logo'
import TextoPrincipal from '../ElementosVista/TextoPrincipal/TextoPrincipal'
import TextoSecundario from '../ElementosVista/TextoSecundario/TextoSecundario'
import TarjetaOpcion from '../ElementosVista/TarjetaOpcion/TarjetaOpcion'
import TarjetaBase from '../ElementosVista/TarjetaBase/TarjetaBase'
import interrogacion from '../ElementosVista/TarjetaOpcion/question.svg'
import cabina from '../ElementosVista/TarjetaOpcion/cabina.png'
import celular from '../ElementosVista/TarjetaOpcion/celular.png'
import expediente from '../ElementosVista/TarjetaOpcion/expediente.png'
import diagnostico from '../ElementosVista/TarjetaOpcion/diagnostico.png'
import botiquin from '../ElementosVista/TarjetaOpcion/botiquin.png'
import BotonA from '../Botones/BotonA'

const V8Opciones = () => {
  return (
    <div className={styles.cntV8Opciones}>
        <div className={styles.cntLogo}>
            <Logo />
        </div>
        <TextoPrincipal
        textoPrincipal="Hola Alejandro Te damos al bienvenida a Liber Salus"
        />
        <p className={styles.txt}>Comienza con alguna de las siguientes opciones que tenemos para ti</p>
        <div/>

        <div className={styles.cntTarjetas}>
            
            <TarjetaOpcion
            srcIcono={cabina} 
            tituloTarjeta="Cabina médica FRANKY" 
            descripcionTarjeta="Acude a una de nuestras cabinas móviles para recibir atención médica en tiempo real con uno de nuestros médicos, así como tomar tus mediciones principales"
            />
            <TarjetaOpcion
            srcIcono={celular} 
            tituloTarjeta="Asistente virtual AVI" 
            descripcionTarjeta="Consulta a uno de nuestros especialistas sin salir de casa a través de las consultas por streaming."
            />
            <TarjetaOpcion
            srcIcono={expediente} 
            tituloTarjeta="Expediente clínico" 
            descripcionTarjeta="Lleva un mejor control de tu salud a través de nuestro expediente clínico digital que ayuda a centralizar toda tu información relevante."
            />
            <TarjetaOpcion
            srcIcono={diagnostico} 
            tituloTarjeta="Disgnóstico" 
            descripcionTarjeta="El sistema realiza un diagnóstico preliminar basado en las respuestas de una serie de cuestionarios personalizados que nos ayudan a conocer mejor tu estado de salud."
            />
            <TarjetaOpcion
            srcIcono={botiquin} 
            tituloTarjeta="Kit médico portátil ANY" 
            descripcionTarjeta="Recibe un kit con las herramientas necesarias para realizar mediciones y registra tus resultados para llevar un mejor control."
            />
            <TarjetaOpcion
            srcIcono={interrogacion} 
            tituloTarjeta="Dudas frecuentes" 
            descripcionTarjeta="Seguramente tendrás dudas sobre cómo funciona el sistema, la afiliación o cualquier otro apartado. Consulta otras preguntsa que han realizado los usuarios."
            />
            
            
        
        </div>
        <BotonA>Comcenzar</BotonA>

    </div>
  )
}

export default V8Opciones
