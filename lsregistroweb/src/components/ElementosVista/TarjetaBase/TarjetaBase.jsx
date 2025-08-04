import React from "react";
import styles from "./tarjetaBase.module.css";
import BotonA from "../../Botones/BotonA";

const TarjetaBase = ({ accion, descripcion, textoBoton, onClick }) => {
  return (
    <div className={styles.cntTarjetaBase}>
      <div className={styles.cntImg}>
        <img></img>
      </div>
      <div className={styles.cntTxt}>
        <p>{accion}</p>
        <p>{descripcion}</p>
        <button type="button" onClick={onClick} className={styles.btn}>
          {textoBoton}
        </button>
      </div>
    </div>
  );
};

export default TarjetaBase;
