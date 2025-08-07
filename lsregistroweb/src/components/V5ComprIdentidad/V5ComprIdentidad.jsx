// src/components/V5ComprIdentidad/V5ComprIdentidad.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/AppRouter';

import escanear from '../V5ComprIdentidad/Escanear.svg'
import anadir   from '../V5ComprIdentidad/Añadir.svg'

import styles from './v5comprIdentidad.module.css';
import Logo            from '@/components/ElementosVista/Logo/Logo';
import TextoPrincipal  from '@/components/ElementosVista/TextoPrincipal/TextoPrincipal';
import TextoSecundario from '@/components/ElementosVista/TextoSecundario/TextoSecundario';
import TarjetaBase     from '@/components/ElementosVista/TarjetaBase/TarjetaBase';

const V5ComprIdentidad = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.cntV5ComprIdentidad}>
      {/* Logo */}
      <div className={styles.cntLogo}>
        <Logo />
      </div>

      {/* Título y descripción */}
      <div className={styles.cntTexto}>
        <TextoPrincipal textoPrincipal="Comprueba tu identidad" />
        <TextoSecundario
          textoSecundario={[
            'Sube los documentos que te identifican: INE y Comprobante de domicilio (con antigüedad menor a tres meses).',
            <br key="1" />,
            'Este paso nos permite darte acceso completo de forma segura y personalizada.',
          ]}
        />
      </div>

      {/* Tarjetas de acción */}
      <div className={styles.cntTarjeta}>
        <TarjetaBase
          srcIcon={escanear}
          accion="Escanear documentos"
          descripcion="Toma una foto de tu documento directamente desde la cámara. Ideal si no tienes el archivo guardado aún."
          textoBoton="Escanear documentos"
          onClick={() => navigate(ROUTES.CAPTURAR_DOCUMENTOS)}
        />

        <TarjetaBase
        srcIcon={anadir}
          accion="Subir archivos"
          descripcion="Carga una imagen o PDF que ya tengas guardado. Asegúrate de que sea legible y esté completo."
          textoBoton="Subir archivos"
          onClick={() => navigate(ROUTES.ADJUNTAR_DOCUMENTOS)}
        />
      </div>

      {/* Enlaces adicionales */}
      <div className={styles.opciones}>
        <a onClick={() => navigate(ROUTES.COMPLETAR_INE)}>
          Llenar datos manualmente
        </a>

        <a onClick={() => navigate(ROUTES.INVITACION_DOC)}>
          Subir más tarde desde tu perfil
        </a>
      </div>
    </div>
  );
};

export default V5ComprIdentidad;

