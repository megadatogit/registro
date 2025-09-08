import React, { useEffect, useRef, useState } from "react";
import styles from "./LiberSalusLowPoly.module.css";

// LiberSalusLowPoly.jsx — componente React que dibuja un patrón low-poly
// con morphs/ transiciones suaves entre estados, spray de triángulos
// y banda curva superior. Inspirado en el arte de Liber Salus.
// Uso:
// <LiberSalusLowPoly />

export default function LiberSalusLowPoly({
  autoMorph = true,
  morphEveryMs = 800,
  spray = true,
  curveAlpha = 0.2,
  dirGlow = 0.16,
  palette = "libersalus",
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const lastAutoRef = useRef(0);
  const tPrevRef = useRef(0);
  const stateARef = useRef(null);
  const stateBRef = useRef(null);
  const tMorphRef = useRef(1);
  const morphingRef = useRef(false);
  const DPRRef = useRef(1);
  const sizeRef = useRef({ w: 0, h: 0 });

  const [hud, setHud] = useState({ autoMorph, spray });

  const palettes = {
    libersalus: {
      warm:     ["#4D0454", "#BD0C8E", "#FF2EBD", "#F50FD1","#011C48", "#02829E", "#069FC9", "#05C3E9","#FF4D1B","#AB011F", "#FF0A29", "#FF240B", "#FEAA11"],
      cool:     ["#4D0454", "#BD0C8E", "#FF2EBD", "#F50FD1","#011C48", "#02829E", "#069FC9", "#05C3E9","#FF4D1B","#AB011F", "#FF0A29", "#FF240B", "#FEAA11"],
      accents:  ["#4D0454","#011C48","#AB011F","#FF4D1B"],
    },
  };

  let activePalette = palettes.libersalus;
  if (typeof palette === "object") {
    activePalette = palette;
  }

  const warm = activePalette.warm;
  const cool = activePalette.cool;
  const accents = activePalette.accents;

  const CFG = {
    baseMin: 50,
    baseMax: 700,
    jitter: 0.51,
    sprayCount: 1,
    sprayScale: 1.75,
    curveAlpha: curveAlpha,
    dirGlow: dirGlow,
  };

  const TAU = Math.PI * 2;
  const rand = (a = 1, b = 0) => Math.random() * (a - b) + b;
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const ease = (t) => 1 - Math.pow(1 - t, 3);

  function mulberry32(a) {
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const pick = (arr, rng = Math.random) => arr[(rng() * arr.length) | 0];

  function hexToRgb(h) {
    const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return m
      ? { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) }
      : { r: 255, g: 255, b: 255 };
  }
  function rgbToHex({ r, g, b }) {
    const to = (v) => v.toString(16).padStart(2, "0");
    return `#${to(r | 0)}${to(g | 0)}${to(b | 0)}`;
  }
  function mixHex(h1, h2, t) {
    const a = hexToRgb(h1), b = hexToRgb(h2);
    return rgbToHex({ r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t) });
  }

  function getCtx() {
    const c = canvasRef.current;
    return c ? c.getContext("2d", { alpha: false }) : null;
  }

  function resize() {
    const c = canvasRef.current;
    if (!c) return;
    const DPR = Math.min(2, (typeof window !== 'undefined' ? window.devicePixelRatio : 1) || 1);
    DPRRef.current = DPR;
    const rect = c.getBoundingClientRect();
    const W = Math.max(1, Math.floor(rect.width * DPR));
    const H = Math.max(1, Math.floor(rect.height * DPR));
    sizeRef.current = { w: W, h: H };
    c.width = W; c.height = H;
  }

  function buildGrid(seed) {
    const { w: W, h: H } = sizeRef.current;
    const rng = mulberry32(seed);
    const base = clamp((W + H) / 2, CFG.baseMin, CFG.baseMax);
    const cell = clamp(base, CFG.baseMin, CFG.baseMax);
    const cols = Math.ceil(W / cell) + 3;
    const rows = Math.ceil(H / cell) + 3;
    const pts = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const jx = (rng() - 0.5) * cell * CFG.jitter;
        const jy = (rng() - 0.5) * cell * CFG.jitter;
        const px = (x - 1) * cell + jx;
        const py = (y - 1) * cell + jy;
        pts.push({ x: px, y: py });
      }
    }
    return { cell, cols, rows, pts };
  }

  function triangulate(grid) {
    const { cols, rows, pts } = grid;
    const tris = [];
    const idx = (x, y) => y * cols + x;
    for (let y = 0; y < rows - 1; y++) {
      for (let x = 0; x < cols - 1; x++) {
        const a = pts[idx(x, y)];
        const b = pts[idx(x + 1, y)];
        const c = pts[idx(x, y + 1)];
        const d = pts[idx(x + 1, y + 1)];
        if ((x + y) % 2 === 0) { tris.push([a, b, d]); tris.push([a, d, c]); }
        else { tris.push([a, c, d]); tris.push([a, b, c]); }
      }
    }
    return tris;
  }

  function colorForTriangle(tri, rng) {
    const { w: W, h: H } = sizeRef.current;
    const mx = (tri[0].x + tri[1].x + tri[2].x) / 3;
    const my = (tri[0].y + tri[1].y + tri[2].y) / 3;
    const t = clamp(mx / W, 0, 1);
    const warmPick = pick(warm, rng);
    const coolPick = pick(cool, rng);
    const bias = clamp(t * t + (1 - my / H) * 0.15, 0, 1);
    const baseCol = mixHex(warmPick, coolPick, bias);
    let accent = null;
    if (rng() < 0.15) accent = pick(accents, rng);
    return accent ?? baseCol;
  }

  function newState(seed) {
    const grid = buildGrid(seed);
    const tris = triangulate(grid);
    const rng = mulberry32(seed ^ 0x9e3779b9);
    const cols = tris.map((tri) => colorForTriangle(tri, rng));
    return { grid, tris, cols, seed };
  }

  function mixStates(a, b, t) {
    const tris = [];
    const cols = [];
    for (let i = 0; i < Math.min(a.tris.length, b.tris.length); i++) {
      const ta = a.tris[i], tb = b.tris[i];
      tris[i] = [
        { x: lerp(ta[0].x, tb[0].x, t), y: lerp(ta[0].y, tb[0].y, t) },
        { x: lerp(ta[1].x, tb[1].x, t), y: lerp(ta[1].y, tb[1].y, t) },
        { x: lerp(ta[2].x, tb[2].x, t), y: lerp(ta[2].y, tb[2].y, t) },
      ];
      cols[i] = mixHex(a.cols[i], b.cols[i], t);
    }
    return { tris, cols };
  }

  function drawTopCurve(ctx) {
    const { w: W, h: H } = sizeRef.current;
    const g = ctx.createLinearGradient(0, 0, 0, H * 0.6);
    g.addColorStop(0, `rgba(255,255,255,${CFG.curveAlpha*0.1})`);
    g.addColorStop(0.5, `rgba(255,255,255,${CFG.curveAlpha * 0.1})`);
    g.addColorStop(1, `rgba(8,34,63,0)`);
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(0, H * 0.18);
    ctx.bezierCurveTo(W * 0.3, H * 0.02, W * 0.62, H * 0.4, W, H * 0.12);
    ctx.lineTo(W, 0); ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
  }

  function drawSpray(ctx, rng, enabled = true) {
    if (!enabled) return;
    const { w: W, h: H } = sizeRef.current;
    const n = CFG.sprayCount;
    for (let i = 0; i < n; i++) {
      const x = rand(W * 0.02, W * 0.48);
      const y = rand(H * 0.02, H * 0.55);
      const s = rand(8, 18) * CFG.sprayScale * DPRRef.current;
      const rot = rand(0, TAU);
      const col = pick(accents, rng);
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.lineTo(s * 0.85, s * 0.75);
      ctx.lineTo(-s * 0.6, s * 0.55);
      ctx.closePath();
      ctx.fillStyle = col;
      ctx.shadowColor = col + "55";
      ctx.shadowBlur = 6 * DPRRef.current;
      ctx.fill();
      ctx.restore();
    }
  }

  function drawDirectionalGlow(ctx) {
    const { w: W, h: H } = sizeRef.current;
    const g = ctx.createRadialGradient(
      W * 0.7, H * 0.25, W * 0.05,
      W * 0.7, H * 0.25, Math.max(W, H) * 0.9
    );
    g.addColorStop(0, "rgba(255,255,255,0)");
    g.addColorStop(1, `rgba(0,0,0,${CFG.dirGlow})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function scheduleRemesh() {
    stateARef.current = newState((Math.random() * 1e9) | 0);
    stateBRef.current = newState((Math.random() * 1e9) | 0);
    tMorphRef.current = 1; morphingRef.current = false;
  }

  function startMorph() {
    if (morphingRef.current) return;
    stateARef.current = mixStates(stateARef.current, stateBRef.current, 1);
    stateBRef.current = newState((Math.random() * 1e9) | 0);
    tMorphRef.current = 0; morphingRef.current = true;
  }

  function loop(ts) {
    const ctx = getCtx(); if (!ctx) return;
    const { w: W, h: H } = sizeRef.current;
    const tPrev = tPrevRef.current || ts;
    const dt = ts - tPrev;
    tPrevRef.current = ts;

    if (hud.autoMorph && ts - lastAutoRef.current > morphEveryMs && !morphingRef.current) {
      startMorph(); lastAutoRef.current = ts;
    }
    if (morphingRef.current) {
      tMorphRef.current = Math.min(1, tMorphRef.current + dt / 6000);
      if (tMorphRef.current >= 1) morphingRef.current = false;
    }

    ctx.fillStyle = "#f3f5f9";
    ctx.fillRect(0, 0, W, H);

    const easeT = ease(tMorphRef.current);
    const mix = mixStates(stateARef.current, stateBRef.current, easeT);

    for (let i = 0; i < mix.tris.length; i++) {
      const tri = mix.tris[i];
      ctx.fillStyle = mix.cols[i];
      ctx.beginPath();
      ctx.moveTo(tri[0].x, tri[0].y);
      ctx.lineTo(tri[1].x, tri[1].y);
      ctx.lineTo(tri[2].x, tri[2].y);
      ctx.closePath();
      ctx.fill();
    }

    drawTopCurve(ctx);
    drawSpray(ctx, mulberry32((stateARef.current.seed ^ 0xabc123) | 0), hud.spray);
    drawDirectionalGlow(ctx);

    rafRef.current = requestAnimationFrame(loop);
  }

  useEffect(() => {
    resize();
    scheduleRemesh();
    rafRef.current = requestAnimationFrame(loop);
    const onResize = () => { resize(); scheduleRemesh(); };
    window.addEventListener("resize", onResize);
    const onKey = (e) => {
      if (e.code === "Space") { e.preventDefault(); startMorph(); }
      if (e.key && e.key.toLowerCase() === "m") setHud((h) => ({ ...h, autoMorph: !h.autoMorph }));
      if (e.key && e.key.toLowerCase() === "s") setHud((h) => ({ ...h, spray: !h.spray }));
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { setHud((h) => ({ ...h, autoMorph })); }, [autoMorph]);
  useEffect(() => { setHud((h) => ({ ...h, spray })); }, [spray]);

  return (
    <div className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
