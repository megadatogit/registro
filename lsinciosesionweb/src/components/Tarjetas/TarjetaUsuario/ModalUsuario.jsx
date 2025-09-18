// src/components/Tarjetas/TarjetaUsuario/ModalUsuario.jsx
import React, { useEffect, useRef } from 'react';
import styles from './modalUsuario.module.css';

import fotoNull from './foto-perfil.png';
import esfera from './esfera.svg';
import llave from './llave.svg';
import lapiz from './lapiz.svg';
import emergencia from './emergencia.svg';
import salir from './salir.svg';
import estado from './completado.svg';

const ModalUsuario = ({
  onClose,
  nombre = 'Usuario',
  correo = '',
  ultimaSesion,
  onChangePhoto,
  onLogout,
}) => {
  const dialogRef = useRef(null);

  // cierra con ESC
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // cierra al click fuera
  const onBackdropClick = (e) => {
    if (!dialogRef.current) return;
    if (!dialogRef.current.contains(e.target)) onClose();
  };

  return (
    <div
      className={styles.backdrop}
      onMouseDown={onBackdropClick}
      role="presentation"
      aria-hidden="true"
    >
      <div
        ref={dialogRef}
        className={styles.cntModalUsuario}
        role="dialog"
        aria-modal="true"
        aria-label="Opciones de usuario"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.cntFotoLinea}>
          <div className={styles.foto}>
            <div className={styles.cntImagen}>
              <img src={fotoNull} alt="Foto de Usuario" />
            </div>
            <img src={estado} alt="estado" />
          </div>

          <div className={styles.cntLinea}>
            <p className={styles.estado}>
              EN LÍNEA <span className={styles.estadoVisual}></span>
            </p>
            <p>Última sesión</p>
            <p className={styles.fchaSesion}>
              {ultimaSesion || '—'}
            </p>
          </div>
        </div>

        <div className={styles.cntNombre}>
          <p>{nombre}</p>
          <p>{correo}</p>
          <p>Información relevante para Usuario</p>
        </div>

        <div className={styles.cntEnlaces}>
          <div className={styles.enlace}>
            <a>Vinculación ANI</a>
            <img className={styles.icon} src={esfera} alt="" />
          </div>
          <div className={styles.enlace}>
            <a>Cuenta y contraseña</a>
            <img className={styles.icon} src={llave} alt="" />
          </div>
          <div className={styles.enlace} onClick={onChangePhoto}>
            <a>Actualizar foto de perfil</a>
            <img className={styles.icon} src={lapiz} alt="" />
          </div>
          <div className={styles.enlace}>
            <a>EMERGENCIA</a>
            <img className={styles.icon} src={emergencia} alt="" />
          </div>
          <div className={styles.enlace} onClick={onLogout}>
            <a>CERRAR SESIÓN</a>
            <img className={styles.icon} src={salir} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalUsuario;
