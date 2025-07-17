import React from "react";
import styles from "./formulario.module.css";
import BotonA from "../Botones/BotonA";
import { useField } from "../../hooks/useField";

const Formulario = () => {
  const curp      = useField({ type: 'text', placeholder: 'Ingresa tu curp', pattern:'^[A-Z]{4}\\d{6}[HM][A-Z]{5}[A-Z\\d]\\d$', maxLength: 18, required: true, toUpper: true })
  const nombre    = useField({ type: 'text', placeholder: 'Ingresa tu nombre(s)', required: true })
  const apellido1 = useField({ type: 'text', placeholder: 'Ingresa tu primer apellido', required: true })
  const apellido2 = useField({ type: 'text', placeholder: 'Ingresa tu segundo apellido'})
  const fechaNac  = useField({ type: 'date', required: true})
  const sexo      = useField({ as: 'select', required: true})

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ 
      curp: curp.value, 
      nombre: nombre.value, 
      apellido1: apellido1.value, 
      apellido2: apellido2.value, 
      fechaNac: fechaNac.value, 
      sexo: sexo.value 
    })
  };

  const resetAll = () => {
    [curp, nombre, apellido1, apellido2, fechaNac, sexo].forEach(f=>f.reset())
  };

  return (
    <div className={styles.cntFormulario}>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        {/* CURP A 18 CARACTERES */}
        <label className={styles.label}>
          CURP:
          <input 
            className={styles.input}
            {...curp.inputProps}
          />
        </label>


        {/* NOMBRE,(UN CAMPO PARA TODOS) */}
        <label className={styles.label}>
          Nombre(s):
          <input
            className={styles.input}
            {...nombre.inputProps}
          />
        </label>

        {/* PRIMER APELLIDO */}
        <label className={styles.label}>
          Primer Apellido:
          <input
            className={styles.input}
            {...apellido1.inputProps}
            />
        </label>

        {/* SEGUNDO APELLIDO */}
        <label className={styles.label}>
          Segundo Apellido:
          <input
            className={styles.input}
            {...apellido2.inputProps}
          />
        </label>

        {/* FECHA DE NACIMIENTO */}
        <label className={styles.label}>
          Fecha de nacimiento
          <input
            className={styles.input}
            {...fechaNac.inputProps}
          />
        </label>

        {/* SEXO H=HOMBRE M=MUJER X=NO BINARIO */}
        <label className={styles.label}>
          Sexo:
          <select
          className={styles.select}
          {...sexo.inputProps}
          >
            <option value="">Selecciona tu sexo</option>
            <option value="H">HOMBRE</option>
            <option value="M">MUJER</option>
            <option value="X">NO BINARIO</option>
          </select>
        </label>

        {/* BOTON */}

        <div className={styles.cntBoton}>
          
          <BotonA
          variant='secondary'
          onClick={resetAll}
          >
            Limpiar
          </BotonA>
          <BotonA
          variant='primary'
          type='submit'
          >Enviar</BotonA>
        </div>
      </form>

      <a className={styles.volver}>Volver</a>
    </div>
  );
};

export default Formulario;
