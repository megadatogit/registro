// BotonA.jsx
import React, { forwardRef } from 'react'
import clsx from 'clsx'          // npm i clsx
import styles from './botonA.module.css'

/**
 * Botón reutilizable.
 *
 * @param {string}   variant   'primary' | 'secondary' | 'danger' ...
 * @param {string}   size      'sm' | 'md' | 'lg'
 * @param {boolean}  loading   Muestra spinner y deshabilita click (opcional)
 * @param {string}   className Estilos extra (opcional)
 * @param {...rest}  resto de props nativos: onClick, type, disabled, aria-label...
 */
const BotonA = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      className,
      ...rest                  // onClick, type, disabled, etc.
    },
    ref
  ) => (
    <button
      ref={ref}
      type='button'            // default seguro
      className={clsx(
        styles.boton,          // base
        styles[variant],       // variante
        styles[size],          // tamaño
        loading && styles.loading,
        className              // extra opcional
      )}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? '...' : children}
    </button>
  )
)

BotonA.displayName = 'BotonA'
export default BotonA
