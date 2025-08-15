import React from "react";
import styles from "./tarjetaUsuario.module.css";
import imgUsuario from "./foto-perfil.png"; // Assuming you have a user image in the same directory

const TarjetaUsuario = () => {
    return (
        <div className={styles.cntTarjetaUsuario}>
            <div className={styles.datosUsuario}>

                <div className={styles.cntAvace}>
                    <span className={styles.msjMotivo}> </span>
                    <div className={styles.dataAvance}></div>
                </div>

                <div className={styles.idPerfil}>
                    <span className={styles.nombreUsuario}>Nombre de Usuario</span>
                    <span className={styles.estado}>Perfil Incompleto</span>
                </div>
                <img
                    className={styles.imgUsuario}
                    src={imgUsuario}
                    alt="Imagen de Usuario"></img>

        </div>

        </div>
    );
};

export default TarjetaUsuario;
