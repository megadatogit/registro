import React, { useRef, useMemo, useCallback } from "react";
import styles from "./Menu.module.css";
import Estelas, { PALETTES } from "./estelas";

// tus assets…
import logo from "../../images/Capa_1-2.png";
import inicio       from "./inicio.svg";
import cuestionario from "./cuestionario.svg";
import historial    from "./historial.svg";
import cabina       from "./cabina.svg";
import ayuda        from "./ayuda.svg";

const Menu = () => {
  const estelasRef = useRef(null);

  // Mapa Item -> Paleta
  const ITEM_PALETTES = useMemo(() => ({
    inicio:       PALETTES.principal,
    cuestionario: PALETTES.turquesa,
    historial:    PALETTES.dorado,
    cabina:       PALETTES.naranja,
    ayuda:        PALETTES.magenta,
  }), []);

  // Entrar: color + morph
  const handleEnter = useCallback((key) => {
    const pal = ITEM_PALETTES[key];
    if (!pal) return;
    estelasRef.current?.transitionToPalette(pal);
    estelasRef.current?.morph();
  }, [ITEM_PALETTES]);

  // Salir: volver a la paleta base
  const handleLeave = useCallback(() => {
    estelasRef.current?.transitionToPalette(PALETTES.principal);
  }, []);

  const onFocusItem = (key) => handleEnter(key);
  const onBlurItem  = () => handleLeave();

  return (
    <div className={styles.cntMenu}>
      <div className={styles.fondoEstelas}>
        <Estelas
          ref={estelasRef}
          // Ajustes para que las estelas se vean bien
          targetParticles={7}
          maxParticles={10}
          speedFactor={0.5}
          dirGlowStrength={1.0}
          dirGlowMaxAlpha={0.65}
          // Borde: matar en orilla
          killMarginPx={12}
          viewMargin={64}
          // Curvas/tiempos
          colorEase="cubic-bezier(0.075, 0.82, 0.165, 1)"
          morphEase="cubic-bezier(0.075, 0.82, 0.165, 1)"
          colorDurationMs={900}
          morphDurationMs={800}
        />
      </div>

      <div className={styles.cntLogo}>
        <img className={styles.imglogo} src={logo} alt="Logo" />
      </div>

      <div className={styles.opciones}>
        <div
          className={styles.menuItem}
          onMouseEnter={() => handleEnter("inicio")}
          onMouseLeave={handleLeave}
          onFocus={() => onFocusItem("inicio")}
          onBlur={onBlurItem}
          tabIndex={0}
        >
          <img src={inicio} alt="Inicio" className={styles.icono} />
          <a href="/inicio" className={styles.link}>Inicio</a>
        </div>

        <div
          className={styles.menuItem}
          onMouseEnter={() => handleEnter("cuestionario")}
          onMouseLeave={handleLeave}
          onFocus={() => onFocusItem("cuestionario")}
          onBlur={onBlurItem}
          tabIndex={0}
        >
          <img src={cuestionario} alt="Cuestionarios" className={styles.icono} />
          <a href="/cuestionarios" className={styles.link}>Cuestionarios</a>
        </div>

        <div
          className={styles.menuItem}
          onMouseEnter={() => handleEnter("historial")}
          onMouseLeave={handleLeave}
          onFocus={() => onFocusItem("historial")}
          onBlur={onBlurItem}
          tabIndex={0}
        >
          <img src={historial} alt="Historial" className={styles.icono} />
          <a href="/historial" className={styles.link}>Historial</a>
        </div>

        <div
          className={styles.menuItem}
          onMouseEnter={() => handleEnter("cabina")}
          onMouseLeave={handleLeave}
          onFocus={() => onFocusItem("cabina")}
          onBlur={onBlurItem}
          tabIndex={0}
        >
          <img src={cabina} alt="Cabina" className={styles.icono} />
          <a href="/cabina" className={styles.link}>Cabina</a>
        </div>

        <div
          className={styles.menuItem}
          onMouseEnter={() => handleEnter("ayuda")}
          onMouseLeave={handleLeave}
          onFocus={() => onFocusItem("ayuda")}
          onBlur={onBlurItem}
          tabIndex={0}
        >
          <img src={ayuda} alt="Ayuda" className={styles.icono} />
          <a href="/ayuda" className={styles.link}>Ayuda</a>
        </div>
      </div>
    </div>
  );
};

export default Menu;
