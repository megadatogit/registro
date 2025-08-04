// src/components/Botones/BotonA.jsx
import React, { forwardRef } from 'react';
import clsx from 'clsx';                // npm i clsx
import styles from './botonA.module.css';

/**
 * Botón reutilizable.
 *
 * @param {string}   variant    'primary' | 'secondary' | 'danger' ...
 * @param {string}   size       'sm' | 'md' | 'lg'
 * @param {boolean}  loading    Muestra spinner y deshabilita click
 * @param {boolean}  disabled   Inhabilita el botón (se fusiona con loading)
 * @param {string}   className  Clases extras
 * @param {...rest}  resto de props nativos: onClick, type, aria-label…
 */
const BotonA = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled: propDisabled = false,
      className,
      type = 'button',
      ...rest
    },
    ref
  ) => {
    /* Estado final del botón */
    const disabled = loading || propDisabled;

    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          styles.boton,                // base
          styles[variant],             // variante (colores)
          styles[size],                // tamaño
          disabled && styles.disabled, // estilo gris / no-click
          className                    // clases extra opcionales
        )}
        disabled={disabled}
        {...rest}
      >
        {loading ? '...' : children}
      </button>
    );
  }
);

BotonA.displayName = 'BotonA';
export default BotonA;
