import React, { useEffect, useMemo, useRef, useState } from "react";
import styles from "./inicio.module.css";
import { useNavigate } from "react-router-dom";

// ====== Utils para el nombre del usuario ======
async function fetchMe() {
  // Si ya tienes un endpoint, descomenta y adapta:
  // const res = await fetch("/api/perfil/me", { credentials: "include" });
  // if (!res.ok) throw new Error("No se pudo leer el perfil");
  // return await res.json();

  // Placeholder: intenta leer de localStorage (lo puedes setear después del login)
  const raw = localStorage.getItem("perfil_min");
  return raw ? JSON.parse(raw) : null;
}

function getDisplayName(me) {
  if (!me) return "Bienvenido(a)";
  return me.nombre || me.first_name || me.given_name || "Bienvenido(a)";
}

// ====== Canvas animado: olas -> esfera ======
function PointsMorphCanvas({
  width =  1020,
  height = 1020,
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2),
  grid = { cols: 70, rows: 40 },       // densidad de puntos
  startDelayMs = 3000,                 // 3s de olas
  morphDurMs = 4000,                   // 4s de morph
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const t0Ref = useRef(0);
  const stateRef = useRef({ phase: "waves" }); // waves | morph | sphere
  const rotationRef = useRef(0);

  // Precalcula posiciones objetivo
  const points = useMemo(() => {
    const pts = [];
    for (let y = 0; y < grid.rows; y++) {
      for (let x = 0; x < grid.cols; x++) {
        pts.push({ x, y });
      }
    }
    return pts;
  }, [grid]);

  // Centrado/escala
  const layout = useMemo(() => {
    const padding = 40;
    const w = width - padding * 2;
    const h = height - padding * 2;
    const gx = grid.cols - 1 || 1;
    const gy = grid.rows - 1 || 1;
    return { padding, w, h, gx, gy, cx: width / 2, cy: height / 2 };
  }, [width, height, grid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(pixelRatio, pixelRatio);

    // easing suave
    const easeInOut = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const dotSize = 2.2;

    function gridToXY(px, py) {
      const { padding, w, h, gx, gy } = layout;
      const x = padding + (px / gx) * w;
      const y = padding + (py / gy) * h;
      return { x, y };
    }

    // posición “olas”
    function wavePos(px, py, time) {
      const base = gridToXY(px, py);
      const kx = 0.45, ky = 0.55;
      const amp = 12 + (px % 5) * 0.6;
      const yOff = Math.sin(time * 0.002 + px * kx + py * 0.15) * amp;
      const xOff = Math.cos(time * 0.0015 + py * ky) * 6;
      return { x: base.x + xOff, y: base.y + yOff };
    }

    // posición “esfera” (distribución por lat/lon)
    function spherePos(px, py, angle) {
      // mapea grid a [-1,1]
      const u = px / (grid.cols - 1);
      const v = py / (grid.rows - 1);
      const theta = u * Math.PI * 2;         // longitud
      const phi = v * Math.PI;               // latitud
      const r = Math.min(layout.w, layout.h) * 0.33;

      // 3D -> 2D con rotación alrededor de Y
      const x3 = r * Math.sin(phi) * Math.cos(theta);
      const y3 = r * Math.cos(phi);
      const z3 = r * Math.sin(phi) * Math.sin(theta);

      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const xr = x3 * cosA + z3 * sinA;
      const zr = -x3 * sinA + z3 * cosA;

      // proyección simple
      const dist = 340;
      const scale = dist / (dist - zr);
      const x2 = layout.cx + xr * scale;
      const y2 = layout.cy + y3 * scale;
      return { x: x2, y: y2, scale };
    }

    function draw(now) {
      if (!t0Ref.current) t0Ref.current = now;
      const elapsed = now - t0Ref.current;

      // cambia de fase
      if (elapsed >= startDelayMs + morphDurMs) {
        stateRef.current.phase = "sphere";
      } else if (elapsed >= startDelayMs) {
        stateRef.current.phase = "morph";
      } else {
        stateRef.current.phase = "waves";
      }

      ctx.clearRect(0, 0, width, height);

      // actualiza rotación
      rotationRef.current += 0.005; // giro constante

      // progreso del morph (0..1)
      let p = 0;
      if (stateRef.current.phase === "morph") {
        p = (elapsed - startDelayMs) / morphDurMs;
        p = Math.min(Math.max(p, 0), 1);
        p = easeInOut(p);
      } else if (stateRef.current.phase === "sphere") {
        p = 1;
      }

      for (const pt of points) {
        const wav = wavePos(pt.x, pt.y, now);
        const sph = spherePos(pt.x, pt.y, rotationRef.current);

        // interpola de olas a esfera
        const x = wav.x + (sph.x - wav.x) * p;
        const y = wav.y + (sph.y - wav.y) * p;

        // tamaño/alpha con “profundidad” (solo esfera)
        const a = 0.85 * (stateRef.current.phase === "waves" ? 1 : Math.min(sph.scale, 1));
        const r = dotSize * (stateRef.current.phase === "waves" ? 1 : Math.max(0.6, Math.min(sph.scale, 1.25)));

        ctx.globalAlpha = a;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = "#0D6EFD";  // azul “liber”
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, [grid, height, width, pixelRatio, layout, startDelayMs, morphDurMs]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
}

export default function Inicio() {
  const nav = useNavigate();
  const [me, setMe] = useState(null);

  useEffect(() => {
    let on = true;
    fetchMe().then((data) => on && setMe(data)).catch(() => {});
    return () => (on = false);
  }, []);

  const nombre = getDisplayName(me);

  return (
    <div className={styles.wrap}>
      <div className={styles.hero}>
        <div className={styles.copy}>
          <h1 className={styles.h1}>{nombre}</h1>
          <p className={styles.p}>
            ¡Nos alegra verte por aquí! Activa tu recorrido guiado o entra directo a tu panel.
          </p>
          <div className={styles.actions}>
            <button className={styles.btnSec} onClick={() => nav("/ayuda")}>
              Ver tutorial
            </button>
            <button className={styles.btnPri} onClick={() => nav("/panelayout")}>
              Ir al panel
            </button>
          </div>
        </div>

        <div className={styles.stage}>
          {/* <PointsMorphCanvas width={740} height={740} /> */}
        </div>
      </div>
    </div>
  );
}
