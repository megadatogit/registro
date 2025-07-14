import React, { useState } from 'react'
import styles from './tarjetaAdjuntar.module.css'
import border from './border.svg'
import srcImg from './bs-cloud-upload.svg'
import BotonA from '../../Botones/BotonA'
import { useForm } from "react-hook-form"

const TarjetaAdjuntar = ({ accion, descripcion, textoBoton }) => {

    const [ImagePrevious, setImagePrevious] = useState(null)
    const changeImage = (e) => {
        const reader = new FileReader

        reader.readAsDataURL(e.target.files[0]);
        setImagePrevious(e.target.result);

    }

    return (
        <div className={styles.cntTarjetaAdjuntar}>

            

            <div className={styles.cntTexto}>
                <p>{accion}</p>
                <p>{descripcion}</p>
            </div>

            <div className={styles.cntInstruccion}>
                <img className={styles.img} src={srcImg}></img>
                <p>Arrastra aqui tus documentos</p>
            </div>
            <input
                
                className={styles.input}
                type="file"
                accept="image/"
                multipe
                onChange={e =>{
                    changeImage(e)
                }}
                
            />
            <div className={styles.cntBoton}>
                <BotonA
                    textoBoton={textoBoton}
                />
            </div>

            <div className={styles.cntPrevious}>
                <img src={ImagePrevious}></img>
            </div>

            

        </div>
    )
}

export default TarjetaAdjuntar
