// src/components/V6Capturar/V6Capturar.jsx
import React, { useState, useRef, useEffect } from 'react';
import styles   from './v6capturar.module.css';
import frente   from './frente.svg';
import reverso  from './reverso.svg';
import warning  from './warning.svg';
import guias    from './guias.svg';
import reflejo  from './reflejo.svg';
import BotonA   from '../Botones/BotonA';
import Logo     from '../ElementosVista/Logo/Logo'


const V6Capturar = () => {
  /* ---------- REFERENCIAS ---------- */
  const videoRef   = useRef(null);   // <video> 
  const guiaRef    = useRef(null);   // overlay guía
  const canvasRef  = useRef(null);   // <canvas> oculto
  const streamRef  = useRef(null);   // MediaStream para liberar recursos

  /* ---------- ESTADO ---------- */
  const [cameraOn, setCameraOn] = useState(false);
  const [captured, setCaptured] = useState(null); // dataURL
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [datosINE, setDatosINE] = useState(null); // {curp, nombre, domicilio}

  /* ---------- ENVIAR AL BACKEND ---------- */
const handleSend = async () => {
  if (!captured) return;                 // asegúrate de tener foto
  setLoading(true);

  try {
    // 1. Convierte dataURL → Blob (JPEG)
    const blob = await (await fetch(captured)).blob();

    // 2. Empaqueta como multipart/form-data
    const form = new FormData();
    form.append('foto', blob, 'credencial.jpg');

    // 3. POST al endpoint (ajusta la ruta con tu API)
    const res  = await fetch('/api/ocr', { method: 'POST', body: form });

    if (!res.ok) throw new Error('Error OCR');

    // 4. JSON esperado: { curp, nombre, domicilio }
    const data = await res.json();
    setDatosINE(data);
    console.log('Datos recibidos:', data);
  } catch (err) {
    console.error(err);
    alert('Hubo un problema al extraer los datos');
  } finally {
    setLoading(false);
  }
};

  /* ---------- ENCENDER / APAGAR ---------- */
  const handleToggleCamera = async () => {
    if (cameraOn) {
      streamRef.current?.getTracks().forEach(t => t.stop());
      streamRef.current = null;
      setCameraOn(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play(); // iOS necesita play() explícito
      }
      setCameraOn(true);
      setErrorMsg(null);
      setCaptured(null);              // por si íbamos de regreso
    } catch (err) {
      console.error(err);
      setErrorMsg('No pude acceder a la cámara. Revisa permisos o conexión.');
    }
  };

  /* ---------- CAPTURAR FOTO ---------- */
  const handleCapture = () => {
    if (!videoRef.current || !guiaRef.current) return;

    const video     = videoRef.current;
    const guia      = guiaRef.current;
    const canvas    = canvasRef.current;
    const ctx       = canvas.getContext('2d');

    // Dimensiones nativas del frame
    const { videoWidth, videoHeight } = video;

    // Posiciones absolutas (pantalla)
    const rectVideo = video.getBoundingClientRect();
    const rectGuia  = guia.getBoundingClientRect();

    // Factor de escala (pantalla → frame real)
    const scaleX = videoWidth  / rectVideo.width;
    const scaleY = videoHeight / rectVideo.height;

    // Coordenadas del recorte dentro del frame
    const sx = (rectGuia.left - rectVideo.left) * scaleX;
    const sy = (rectGuia.top  - rectVideo.top ) * scaleY;
    const sWidth  = rectGuia.width  * scaleX;
    const sHeight = rectGuia.height * scaleY;

    // Ajustar canvas y dibujar
    canvas.width  = sWidth;
    canvas.height = sHeight;
    ctx.drawImage(video, sx, sy, sWidth, sHeight, 0, 0, sWidth, sHeight);

    // Convertir a JPEG Base64
    const dataURL = canvas.toDataURL('image/jpeg', 0.9);
    setCaptured(dataURL);
  };

  /* ---------- LIMPIEZA ---------- */
  useEffect(() => {
    return () => streamRef.current?.getTracks().forEach(t => t.stop());
  }, []);

  return (
    <div className={styles.cntV6Capturar}>
        <div className={styles.cntLogo}>
            <Logo/>
        </div>
      {/* ---------- Columna izquierda (frente / reverso) ---------- */}
      
      
      <div className={styles.cntLado}>
        <p className={styles.ladoTxt}>Escanea el frente de tu credencial</p>
        <div className={styles.cntImg}>
          <img src={frente}  className={styles.icon} alt="Frente" />
          <p className={styles.txtImg}>Frente</p>
          <img src={reverso} className={styles.icon} alt="Reverso" />
          <p className={styles.txtImg}>Reverso</p>
        </div>
      </div>

      {/* ---------- Columna derecha (captura) ---------- */}
      <div className={styles.cntCaptura}>
        {/* Tips */}

        <div className={styles.cntInstruccion}>
          <div className={styles.cntTip}>
            <img src={warning} className={styles.icon} alt="" />
            <p>Utiliza una superficie oscura</p>
          </div>
          <div className={styles.cntTip}>
            <img src={guias} className={styles.icon} alt="" />
            <p>Céntralo dentro del recuadro</p>
          </div>
          <div className={styles.cntTip}>
            <img src={reflejo} className={styles.icon} alt="" />
            <p>Revisa que no tenga reflejos</p>
          </div>
        </div>

        {/* Área de captura */}
        <div className={styles.captura}>
          <div className={styles.mascara}></div>
          <video
            ref={videoRef}
            className={styles.video}
            playsInline
            muted
          />
          <span ref={guiaRef} className={styles.guia} />
          {/* Vista previa cuando la cámara está cerrada */}
          {captured && !cameraOn && (
            <img src={captured} className={styles.preview} alt="Captura" />
          )}
        </div>
      </div>

      {/* ---------- Botones ---------- */}
      <div className={styles.cntBoton}>
        <BotonA onClick={handleToggleCamera}>
          {cameraOn ? 'Cerrar cámara' : 'Abrir cámara'}
        </BotonA>

        <BotonA
          onClick={handleCapture}
          disabled={!cameraOn}
          estilo="secundario"
        >
          Capturar
        </BotonA>

        <BotonA
          onClick={handleSend}
          disabled={!captured || loading}
          estilo="primario"
>
  {loading ? 'Procesando…' : 'Enviar al backend'}
</BotonA>

        <a href="#" onClick={e => e.preventDefault()}>Volver</a>
      </div>

      {/* Mensaje de error */}
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}

      {/* Canvas oculto */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default V6Capturar;
