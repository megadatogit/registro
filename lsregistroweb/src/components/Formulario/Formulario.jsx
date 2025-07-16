import React, { useState } from "react";
import styles from "./formulario.module.css";
import BotonA from "../Botones/BotonA";

const Formulario = () => {
  const [curp, setCurp] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido1, setApellido1] = useState("");
  const [apellido2, setApellido2] = useState("");
  const [fechaNac, setFechaNac] = useState("");
  const [sexo, setSexo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.table({ curp, nombre, apellido1, apellido2, fechaNac, sexo });
  };

  const reset = () => {
    setCurp("");
    setNombre("");
    setApellido1("");
    setApellido2("");
    setFechaNac("");
    setSexo("");
  };

  return (
    <div className={styles.cntFormulario}>
      <form onSubmit={handleSubmit} className={styles.formulario
      }>
        {/* CURP A 18 CARACTERES */}
        {/* CURP corregido */}
        <label className={styles.label}>
          CURP:
          <input
            className={styles.input}
            type='text'
            placeholder='Ingresa tu CURP'
            value={curp}
            onChange={e => setCurp(e.target.value.toUpperCase())}
            pattern='^[A-Z]{4}\\d{6}[HM][A-Z]{5}[A-Z\\d]\\d$'
            maxLength={18}
            required
          />
        </label>


        {/* NOMBRE,(UN CAMPO PARA TODOS) */}
        <label className={styles.label}>
          Nombre(s):
          <input
            className={styles.input}
            type="text"
            placeholder="Ingresa tu nombre(s)"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        {/* PRIMER APELLIDO */}
        <label className={styles.label}>
          Primer Apellido:
          <input
            className={styles.input}
            type="text"
            placeholder="Ingresa tu primer apellido"
            value={apellido1}
            onChange={(e) => setApellido1(e.target.value)}
            required
          />
        </label>

        {/* SEGUNDO APELLIDO */}
        <label className={styles.label}>
          Segundo Apellido:
          <input
            className={styles.input}
            type="text"
            placeholder="Ingresa tu segundo Apellido"
            value={apellido2}
            onChange={(e) => setApellido2(e.target.value)}
            required
          />
        </label>

        {/* FECHA DE NACIMIENTO */}
        <label className={styles.label}>
          Fecha de nacimiento
          <input
            className={styles.input}
            type="date"
            placeholder="DD / MM / 0000"
            value={fechaNac}
            onChange={(e) => setFechaNac(e.target.value)}
            required
          />
        </label>

        {/* SEXO H=HOMBRE M=MUJER X=NO BINARIO */}
        <label className={styles.label}>
          Sexo:
          <select
          className={styles.select}
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            required
          >
            <option value="">Selecciona tu sexo</option>
            <option value="H">HOMBRE</option>
            <option value="M">MUJER</option>
            <option value="X">NO BINARIO</option>
          </select>
        </label>

        {/* BOTON */}

        <div className={styles.cntBoton}>
          <BotonA textoBoton="Siguiente" />
        </div>
      </form>

      <a className={styles.volver}>Volver</a>
    </div>
  );
};

export default Formulario;
