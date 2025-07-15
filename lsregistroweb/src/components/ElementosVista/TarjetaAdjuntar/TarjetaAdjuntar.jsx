// TarjetaAdjuntar.jsx
import React, { useRef, useState } from 'react';
import styles from './tarjetaAdjuntar.module.css';
import srcImg from './bs-cloud-upload.svg';
import BotonA from '../../Botones/BotonA';
import srcArchivo from './fi-file.svg';
import srcExito from './Group.svg';
import srcEliminar from './delete.svg';

const TarjetaAdjuntar = ({ accion, descripcion, textoBoton }) => {
    const inputRef = useRef(null);
    const [selectedFiles, setSelectedFiles] = useState([]);

    /* ───── Handlers ───── */
    const handleChange = (e) => {
        const filesArray = Array.from(e.target.files);
        setSelectedFiles((prev) => [...prev, ...filesArray].slice(0, 2)); // máx. 2
        inputRef.current.value = '';  // permite volver a elegir el mismo archivo
    };

    const removeFile = (idx) =>
        setSelectedFiles((files) => files.filter((_, i) => i !== idx));

    /* ───── Render ───── */
    return (
        <div className={styles.cntTarjetaAdjuntar}>
            {/* Encabezado */}
            <div className={styles.cntTexto}>
                <p className={styles.titulo}>{accion}</p>
                <p className={styles.subtitulo}>{descripcion}</p>
            </div>

            {/* Zona de arrastre y botón */}
            <div className={styles.inputArea} onClick={() => inputRef.current?.click()}>
                <div className={styles.cntInstruccion}>
                    <img src={srcImg} className={`${styles.imgIcon}`} alt="" />
                    <p>Arrastra aquí tus documentos</p>
                <div className={styles.cntBoton}>
                    <BotonA textoBoton={textoBoton} />
                </div>
                </div>

                <input
                    ref={inputRef}
                    className={styles.input}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleChange}
                />

            </div>

            {/* Archivos seleccionados */}
            <div className={styles.cntArchivosSeleccionados}>
                {selectedFiles.length === 0 && <span className={styles.placeholder} />}
                {selectedFiles.map((file) => (
                    <div
                        key={`${file.name}-${file.lastModified}`}   // clave estable
                        className={styles.cntArchivoSeleccionado}
                    >
                        <div className={styles.archivoDate}>
                            <img src={srcArchivo} className={styles.orejaP} alt="" />
                            <p className={styles.nombreArchivo}>{file.name}</p>
                            <img src={srcExito} className={styles.paloma} alt="" />
                        </div>

                        <div
                            className={styles.cntEliminar}
                            onClick={() =>
                                removeFile(
                                    selectedFiles.findIndex((f) => f === file)
                                )
                            }
                        >
                            <img src={srcEliminar} className={styles.eliminar} alt="Eliminar" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TarjetaAdjuntar;
