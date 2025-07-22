import React from "react";
import styles from "./formulario.module.css";
import BotonA from "../Botones/BotonA";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  curp: z
    .string()
    .regex(/^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z\d]\d$/, "CURP inválida"),
  nombre: z.string().min(1, "Nombre requerido"),
  apellido1: z.string().min(1, "Primer apellido requerido"),
  apellido2: z.string().optional(),
  fechaNac: z.string().min(1, "Fecha requerida"),
  sexo: z.enum(["H", "M", "X"], { message: "Selecciona un sexo" }),
});

const FormularioINE = () => {

  const onSubmit = (data) => console.table(data);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      curp: "",
      nombre: "",
      apellido1: "",
      apellido2: "",
      fechaNac: "",
      sexo: "",
    },
  });

  return (
    <div className={styles.cntFormulario}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formulario}>
        {/* CURP A 18 CARACTERES */}
        <label className={styles.label}>
          CURP:
          <input
            className={styles.input}
            {...register("curp")}
            placeholder="Ingresa tu CURP"
            maxLength={18}
            onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
          />
          {errors.curp && (
            <span className={styles.errors}>{errors.curp.message}</span>
          )}
        </label>

        {/* NOMBRE,(UN CAMPO PARA TODOS) */}
        <label className={styles.label}>
          Nombre(s):
          <input
            className={styles.input}
            {...register("nombre")}
            placeholder="Ingresa tu nombre(s)"
          />
          {errors.nombre && (
            <span className={styles.errors}>{errors.nombre.message}</span>
          )}
        </label>

        {/* PRIMER APELLIDO */}
        <label className={styles.label}>
          Primer Apellido:
          <input
            className={styles.input}
            {...register("apellido1")}
            placeholder="Ingresa tu primer apellido"
          />
          {errors.apellido1 && (
            <span className={styles.errors}>{errors.apellido1.message}</span>
          )}
        </label>

        {/* SEGUNDO APELLIDO */}
        <label className={styles.label}>
          Segundo Apellido:
          <input
            className={styles.input}
            {...register("apellido2")}
            placeholder="Ingresa tu segundo apellido"
          />
          {errors.apellido2 && (
            <span className={styles.errors}>{errors.apellido2.message}</span>
          )}
        </label>

        {/* FECHA DE NACIMIENTO */}
        <label className={styles.label}>
          Fecha de nacimiento
          <input
            className={styles.input}
            type="date"
            {...register("fechaNac")}
            placeholder="Ingresa tu fecha de nacimiento"
          />
          {errors.fechaNac && (
            <span className={styles.errors}>{errors.fechaNac.message}</span>
          )}
        </label>

        {/* SEXO H=HOMBRE M=MUJER X=NO BINARIO */}
        <label className={styles.label}>
          Sexo:
          <select className={styles.select} {...register("sexo")}>
            <option value="" disabled>
              Selecciona tu sexo
            </option>
            <option value="H">HOMBRE</option>
            <option value="M">MUJER</option>
            <option value="X">NO BINARIO</option>
          </select>
          {errors.sexo && (
            <span className={styles.errors}>{errors.sexo.message}</span>
          )}
        </label>

        {/* BOTON */}

        <div className={styles.cntBoton}>
          <BotonA className={styles.btnLimpiar} variant="secondary" onClick={() => reset()}>
            Limpiar
          </BotonA>
          <BotonA
          
          type="submit">
            Enviar
          </BotonA>
        </div>
      </form>

      <a className={styles.volver}>Volver</a>
    </div>
  );
};

export default FormularioINE;
