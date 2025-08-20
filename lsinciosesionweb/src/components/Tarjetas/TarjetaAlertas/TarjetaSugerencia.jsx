// TarjetaSugerencia.jsx
import styles from "./tarjetaSugerencia.module.css";

export default function TarjetaSugerencia({
  icon,
  titulo,
  texto,
  cta = "Explorar herramientas",
  theme,              // ← objeto con --bg, --btn, --btn-hover
  onClick,
}) {
  return (
    <article className={styles.cntTarjetaSugerencia} style={theme}>
      <div className={styles.cntInfo}>
        <span className={styles.icon}><img src={icon} alt={titulo}></img></span>
        <p className={styles.titulo}>{titulo}</p>
      </div>

      <div className={styles.cntSugerencia}>
        <p className={styles.sugerencia}>
          {texto ?? "Hay áreas en las que puedes fortalecer tu bienestar."}
        </p>
        <button className={styles.btn} onClick={onClick}>
          {cta}
        </button>
      </div>
    </article>
  );
}

