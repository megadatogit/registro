import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ROUTES } from "@/routes/AppRouter";
import BotonA from "../Botones/BotonA";
import styles from "./v7recibidos.module.css";
import Logo from "../ElementosVista/Logo/Logo";
import TextoPrincipal from "../ElementosVista/TextoPrincipal/TextoPrincipal";
import TextoSecundario from "../ElementosVista/TextoSecundario/TextoSecundario";
import srcLupa from "./lupa.png";

const V7Recibidos = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Si vienes con state de la vista anterior, lo conservas; si no, envías algo mínimo
  const state = location.state ?? { from: "V7Recibidos" };

  const irOpciones = () => navigate(ROUTES.OPCIONES, { state });

  return (
    <div className={styles.cntV7Recibidos}>
      <div className={styles.cntLogo}>
        <Logo />
      </div>

      <div className={styles.cntTexto}>
        <TextoPrincipal textoPrincipal="Hemos recibido tus documentos" />
        <TextoSecundario
          textoSecundario="Tus documentos se han recibido correctamente. Ahora estamos verificando su autenticidad. Esto puede tardar hasta 48 horas hábiles."
        />
      </div>

      <div className={styles.cntImg}>
        <img src={srcLupa} className={styles.lupa} alt="Verificación de documentos" />
      </div>

      <div className={styles.acciones}>
        <BotonA onClick={irOpciones}>Continuar</BotonA>

        {/* Opción 1: Link (recomendado) */}
        <Link to={-1} className={styles.volver} role="button">
          Volver
        </Link>

        
      </div>
    </div>
  );
};

export default V7Recibidos;
