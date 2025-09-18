// src/components/Tarjetas/TarjetaUsuario/TarjetaUsuario.jsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './tarjetaUsuario.module.css';
import defaultAvatar from './foto-perfil.png';
import ModalUsuario from './ModalUsuario';
import { logout } from '@/services/auth'; // ya lo tienes
// import { uploadProfilePhoto } from '@/services/perfil'; // cuando el back esté listo

const TarjetaUsuario = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const [nombre, setNombre] = useState('Usuario');
  const [correo, setCorreo] = useState('');
  const inputFileRef = useRef(null);

  // lee nombre/correo del storage que guardaste al hacer login
  useEffect(() => {
    try {
      const raw = localStorage.getItem('perfil_min');
      if (raw) {
        const p = JSON.parse(raw);
        // nombre y apellido (si vienen)
        const fullName =
          (p?.first_name && p?.last_name && `${p.first_name} ${p.last_name}`) ||
          p?.nombre ||
          'Usuario';
        setNombre(fullName);
        if (p?.email) setCorreo(p.email);
      }
    } catch {}
  }, []);

  // abre modal al hacer click en la foto
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  // cambiar foto → abre selector
  const onChangePhotoClick = () => {
    inputFileRef.current?.click();
  };

  // recibe archivo (cuando back esté listo lo subimos)
  const onSelectFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // 🔜 cuando el back esté ok:
    // try {
    //   await uploadProfilePhoto(file);
    //   // refrescar foto si tu servicio la regresa por GET
    // } catch (err) {
    //   console.error(err);
    // }
  };

  const onLogout = async () => {
    try {
      await logout();
    } catch {
      // si falla, igual limpiamos
    } finally {
      localStorage.removeItem('auth_ready');
      localStorage.removeItem('perfil_min');
      window.location.assign('/panel/login'); // regresa al login del panel
    }
  };

  return (
    <div className={styles.cntTarjetaUsuario}>
      <div className={styles.datosUsuario}>
        <div className={styles.idPerfil}>
          <span className={styles.nombreUsuario}>{nombre}</span>
          <span className={styles.estado}>Perfil</span>
        </div>

        {/* FOTO: al clicar abre el modal */}
        <button
          type="button"
          className={styles.imgUsuarioBtn}
          onClick={openModal}
          aria-haspopup="dialog"
          aria-expanded={isOpen ? 'true' : 'false'}
          title="Abrir opciones de perfil"
        >
          <img className={styles.imgUsuario} src={avatarUrl} alt="Foto de perfil" />
        </button>

        {/* input oculto para subir foto (lo dispara el modal) */}
        <input
          ref={inputFileRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onSelectFile}
        />
      </div>

      {/* MODAL */}
      {isOpen && (
        <ModalUsuario
          onClose={closeModal}
          nombre={nombre}
          correo={correo}
          // si quieres mostrar última sesión más adelante, pásala como prop:
          ultimaSesion={null}
          onChangePhoto={onChangePhotoClick}
          onLogout={onLogout}
        />
      )}
    </div>
  );
};

export default TarjetaUsuario;
