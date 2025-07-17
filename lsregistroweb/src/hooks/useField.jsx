import { useState, useCallback } from 'react'

/**
 * Simplifica inputs controlados
 * @param {object} config  Propiedades iniciales (type, placeholder, pattern, etc.)
 */
export function useField (config = {}) {
  const { initialValue = '', ...rest } = config
  const [value, setValue] = useState(initialValue)

  // Cambia value según el tipo (ej. uppercase en CURP)
  const onChange = useCallback(e => {
    const val = rest.toUpper ? e.target.value.toUpperCase() : e.target.value
    setValue(val)
  }, [rest.toUpper])

  // Restaura valor inicial
  const reset = () => setValue(initialValue)

  // Propiedades listas para “esparcir” en el elemento
  const inputProps = {
    ...rest,          // type, placeholder, pattern…
    value,
    onChange
  }

  return { value, setValue, reset, inputProps }
}
