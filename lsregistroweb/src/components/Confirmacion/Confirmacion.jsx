import React from 'react'
import styles from './confirmacion.module.css'
import srclogo from './LS-imagotipo-horizontal.svg'
import Logo from '../Logo/Logo'
import BotonA from '../Botones/BotonA'
import TextoPrincipal from '../Textos/TextoPrincipal'
import TextoSecundario from '../Textos/TextoSecundario'


const Confirmacion = () => {
    return (
        <div className={styles.cntConfirmacion}>
            <div className={styles.logoCnt}><Logo /></div>
            
            <TextoPrincipal
            textoPrincipal="Confirmemos tu información de contacto"
            />
            <TextoSecundario
            textoSecundario="Antes de continuar, elige a dónde deseas que te enviemos tu código de verificación.
                Esto nos permite asegurar que tus datos sean correctos y proteger tu cuenta."
            />
            

            

            <form className={styles.fieldset}>
                <fieldset className={styles.fieldset}>

                    

                        <div className={styles.input}>
                            <input type="radio" id="correo" name="correo" value="email" />
                            <label for="correo">Enviar código a e-mail:<br/> <span className={styles.datos}>"correo@mail.com"</span></label>
                        </div>
                        <div className={styles.input}>
                            <input type="radio" id="telefono" name="telefono" value="phone" />
                            <label for="telefono">Enviar código por SMS:<br/>
                            <span className={styles.datos}>"•••• ••• •4567"</span></label>
                                
                        </div>

                    
                    <div>
                        <BotonA
                            textoBoton="Enviar código"
                        />
                    </div>
                </fieldset>

                <p>¿Tu información no es correcta? </p>
                <a>Volver a registro</a>
            </form>


        </div>
    )
}

export default Confirmacion
