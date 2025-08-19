import React from "react";
import styles from "./menu.module.css";
import logo         from "../../images/Capa_1-2.png";
import inicio       from "./inicio.svg";
import cuestionario from "./cuestionario.svg";
import historial    from "./historial.svg";
import cabina       from "./cabina.svg";
import ayuda        from "./ayda.svg";
import Estelas      from "./estelas.jsx";


const Menu = () => {
  return (
    <div className={styles.cntMenu}>

      <div className={styles.fondoEstelas}>
        <Estelas/>
      </div>
      <div className={styles.cntLogo}>
        <img className={styles.imglogo} src={logo} alt="Logo" />
      </div>
      
      <div className={styles.opciones}>
        
        <div className={styles.menuItem}>
            <img
                src={inicio}
                alt="Inicio"
                className={styles.icono}
            />
            <a href="/inicio" className={styles.link}>Inicio</a>
        </div>
        <div className={styles.menuItem}>
            <img
                src={cuestionario}
                alt="Cuestionario"
                className={styles.icono}
            />
            <a href="/cuestionarios" className={styles.link}>Cuestionarios</a>
        </div>
        <div className={styles.menuItem}>
            <img
                src={historial}
                alt="Historial"
                className={styles.icono}
            />
            <a href="/historial" className={styles.link}>Historial</a>
        </div>
        <div className={styles.menuItem}>
            <img
                src={cabina}
                alt="cabina"
                className={styles.icono}
            />
            <a href="/cabina" className={styles.link}>Cabina</a>
        </div>
        <div className={styles.menuItem}>
            <img
                src={ayuda}
                alt="ayuda"
                className={styles.icono}
            />
            <a href="/ayuda" className={styles.link}>Ayuda</a>
        </div>

        
      </div>
    </div>
  );
};
export default Menu;
