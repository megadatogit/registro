import React, { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import styles from "./Menu.module.css";
import Estelas, { PALETTES } from "./estelas";
import { ROUTES } from "@/routes";

// assets
import logo from "../../images/Capa_1-2.png";
import inicio       from "./inicio.svg";
import cuestionario from "./cuestionario.svg";
import historial    from "./historial.svg";
import cabina       from "./cabina.svg";
import ayuda        from "./ayuda.svg";

const MenuItem = ({ to, text, icon, paletteKey, onEnter, onLeave, end }) => {
  return (
    <div
      className={styles.menuItem}
      onMouseEnter={() => onEnter(paletteKey)}
      onMouseLeave={onLeave}
      onFocus={() => onEnter(paletteKey)}
      onBlur={onLeave}
    >
      <img src={icon} alt="" className={styles.icono} />
      <NavLink
        to={to}
        end={end}
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.active}` : styles.link
        }
        onMouseEnter={(e) => e.stopPropagation()}
        onMouseLeave={(e) => e.stopPropagation()}
        aria-label={text}
      >
        {text}
      </NavLink>
    </div>
  );
};

const Menu = () => {
  const estelasRef = useRef(null);
  const location = useLocation();
  const [baseKey, setBaseKey] = useState("inicio"); // clave de paleta base actual

  const ITEM_PALETTES = useMemo(
    () => ({
      inicio:       PALETTES.principal,
      cuestionario: PALETTES.turquesa,
      historial:    PALETTES.dorado,
      cabina:       PALETTES.naranja,
      ayuda:        PALETTES.magenta,
    }),
    []
  );

  const PATH_TO_KEY = useMemo(
    () => ({
      [ROUTES.INICIO]: "inicio",
      [ROUTES.CUESTIONARIOS]: "cuestionario",
      [ROUTES.HISTORIAL]: "historial",
      [ROUTES.CABINA]: "cabina",
      [ROUTES.AYUDA]: "ayuda",
    }),
    []
  );

  // Fija paleta base según ruta activa
  useEffect(() => {
    const key = PATH_TO_KEY[location.pathname] ?? "inicio";
    setBaseKey(key);
    const pal = ITEM_PALETTES[key] ?? PALETTES.principal;
    estelasRef.current?.transitionToPalette(pal);
  }, [location.pathname, PATH_TO_KEY, ITEM_PALETTES]);

  const handleEnter = useCallback(
    (key) => {
      const pal = ITEM_PALETTES[key];
      if (!pal) return;
      estelasRef.current?.transitionToPalette(pal);
      // Throttle opcional si notas spam de morph:
      estelasRef.current?.morph();
    },
    [ITEM_PALETTES]
  );

  const handleLeave = useCallback(() => {
    const pal = ITEM_PALETTES[baseKey] ?? PALETTES.principal;
    estelasRef.current?.transitionToPalette(pal);
  }, [ITEM_PALETTES, baseKey]);

  return (
    <div className={styles.cntMenu}>
      <div className={styles.fondoEstelas}>
        <Estelas
          ref={estelasRef}
          targetParticles={7}
          maxParticles={10}
          speedFactor={0.5}
          dirGlowStrength={1.0}
          dirGlowMaxAlpha={0.65}
          killMarginPx={12}
          viewMargin={64}
          colorEase="cubic-bezier(0.075, 0.82, 0.165, 1)"
          morphEase="cubic-bezier(0.075, 0.82, 0.165, 1)"
          colorDurationMs={900}
          morphDurationMs={800}
        />
      </div>

      <div className={styles.cntLogo}>
        <img className={styles.imglogo} src={logo} alt="Logo Liber Salus" />
      </div>

      <div className={styles.opciones}>
        <MenuItem
          to={ROUTES.INICIO}
          text="Inicio"
          icon={inicio}
          paletteKey="inicio"
          onEnter={handleEnter}
          onLeave={handleLeave}
          end
        />
        <MenuItem
          to={ROUTES.CUESTIONARIOS}
          text="Cuestionarios"
          icon={cuestionario}
          paletteKey="cuestionario"
          onEnter={handleEnter}
          onLeave={handleLeave}
        />
        <MenuItem
          to={ROUTES.HISTORIAL}
          text="Historial"
          icon={historial}
          paletteKey="historial"
          onEnter={handleEnter}
          onLeave={handleLeave}
        />
        <MenuItem
          to={ROUTES.CABINA}
          text="Cabina"
          icon={cabina}
          paletteKey="cabina"
          onEnter={handleEnter}
          onLeave={handleLeave}
        />
        <MenuItem
          to={ROUTES.AYUDA}
          text="Ayuda"
          icon={ayuda}
          paletteKey="ayuda"
          onEnter={handleEnter}
          onLeave={handleLeave}
        />
      </div>
    </div>
  );
};

export default Menu;
