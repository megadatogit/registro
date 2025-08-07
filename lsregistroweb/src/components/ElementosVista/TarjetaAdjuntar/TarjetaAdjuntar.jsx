// src/components/ElementosVista/TarjetaAdjuntar/TarjetaAdjuntar.jsx
import React, { useRef, useState } from 'react';
import styles from './tarjetaAdjuntar.module.css';

import srcImg      from './bs-cloud-upload.svg';
import srcArchivo  from './fi-file.svg';
import srcExito    from './Group.svg';
import srcEliminar from './delete.svg';
import BotonA      from '../../Botones/BotonA';

const TarjetaAdjuntar = ({ accion, descripcion }) => {
  const inputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);

  /* ───── helpers ───── */
  const addFiles = (fileList) => {
    const filesArray = Array.from(fileList);
    setSelectedFiles((prev) => [...prev, ...filesArray].slice(0, 2)); // máx. 2
  };

  /* ───── handlers ───── */
  const handleChange = (e) => {
    addFiles(e.target.files);
    inputRef.current.value = ''; // permite repetir archivo
  };

  const handleDrop = (e) => {
    e.preventDefault();
    addFiles(e.dataTransfer.files);
  };

  const removeFile = (idx) =>
    setSelectedFiles((files) => files.filter((_, i) => i !== idx));

  /* ───── render ───── */
  return (
    <div className={styles.cntTarjetaAdjuntar}>
      {/* encabezado */}
      <div className={styles.cntTexto}>
        <p className={styles.titulo}>{accion}</p>
        <p className={styles.subtitulo}>{descripcion}</p>
      </div>

      {/* zona drag-and-drop */}
      <div
        className={styles.inputArea}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className={styles.cntInstruccion}>
          <img src={srcImg} className={styles.imgIcon} alt="" />
          <p>Arrastra aquí tus documentos</p>

          <div className={styles.cntBoton}>
            {/* SOLO este botón abre el diálogo */}
            <BotonA
              type="button"
              onClick={() => inputRef.current?.click()}
            >
              Cargar archivos del ordenador
            </BotonA>
          </div>
        </div>

        <input
          ref={inputRef}
          className={styles.input}
          type="file"
          accept="image/*,application/pdf"
          multiple
          onChange={handleChange}
        />
      </div>

      {/* archivos seleccionados */}
      <div className={styles.cntArchivosSeleccionados}>
        {selectedFiles.length === 0 && (
          <span className={styles.placeholder} />
        )}

        {selectedFiles.map((file, idx) => (
          <div
            key={`${file.name}-${file.lastModified}`}
            className={styles.cntArchivoSeleccionado}
          >
            <div className={styles.archivoDate}>
              <img src={srcArchivo} className={styles.orejaP} alt="" />
              <p className={styles.nombreArchivo}>{file.name}</p>
              <img src={srcExito} className={styles.paloma} alt="" />
            </div>

            <div
              className={styles.cntEliminar}
              onClick={() => removeFile(idx)}
            >
              <img
                src={srcEliminar}
                className={styles.eliminar}
                alt="Eliminar"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TarjetaAdjuntar;
