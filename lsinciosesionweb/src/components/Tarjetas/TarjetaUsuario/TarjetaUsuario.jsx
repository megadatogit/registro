// src/components/Tarjetas/TarjetaUsuario/TarjetaUsuario.jsx
import React, { useEffect, useMemo, useState } from 'react';
import styles from './tarjetaUsuario.module.css';
import defaultAvatar from './foto-perfil.png';
import { getProfilePhoto, uploadProfilePhoto } from '@/services/perfil';

const TarjetaUsuario = () => {
  const [nombre, setNombre] = useState('Usuario');
  const [avatarUrl, setAvatarUrl] = useState(defaultAvatar);
  const [subiendo, setSubiendo] = useState(false);
  const [error, setError] = useState('');

  // nombre desde localStorage guardado al hacer login
  useEffect(() => {
    try {
      const raw = localStorage.getItem('perfil_min');
      if (raw) {
        const p = JSON.parse(raw);
        if (p?.nombre) setNombre(p.nombre);
      }
    } catch {}
  }, []);

  // cargar foto
  useEffect(() => {
    let revokeUrl;
    (async () => {
      setError('');
      try {
        const blob = await getProfilePhoto('original');
        const url = URL.createObjectURL(blob);
        setAvatarUrl(url);
        revokeUrl = url;
      } catch (e) {
        // si no hay foto aún, dejamos el default, no es error fatal
        // console.log('sin foto de perfil (aún)');
      }
    })();
    return () => {
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
    };
  }, []);

  const onSelectFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSubiendo(true);
    setError('');
    try {
      await uploadProfilePhoto(file);
      // refrescar preview
      const blob = await getProfilePhoto('original');
      const url = URL.createObjectURL(blob);
      setAvatarUrl(url);
    } catch (e) {
      setError('No se pudo subir la imagen de perfil.');
    } finally {
      setSubiendo(false);
      e.target.value = ''; // limpia input
    }
  };

  return (
    <div className={styles.cntTarjetaUsuario}>
      <div className={styles.datosUsuario}>
        <div className={styles.idPerfil}>
          <span className={styles.nombreUsuario}>{nombre}</span>
          <span className={styles.estado}>Perfil</span>
        </div>

        <label className={styles.avatarWrap} title="Cambiar foto">
          <img className={styles.imgUsuario} src={avatarUrl} alt="Foto de perfil" />
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            style={{ display: 'none' }}
          />
          {subiendo && <span className={styles.badge}>Subiendo…</span>}
        </label>

        {error && <div className={styles.err}>{error}</div>}
      </div>
    </div>
  );
};

export default TarjetaUsuario;
