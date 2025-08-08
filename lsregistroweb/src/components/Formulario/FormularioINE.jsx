// src/components/Formulario/FormularioINE.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api"; // ← ya lo tienes creado
import styles from "./formulario.module.css";
import BotonA from "../Botones/BotonA";

/* --- esquema --- */
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

const FormularioINE = ({ onSuccess }) => {
  /* RHF */
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isSubmitting, isValid },
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

  /* estado local */
  const [loadingCurp, setLoadingCurp] = useState(false);
  const [curpOk, setCurpOk] = useState(false);

  /* --- VALIDAR CURP --- */
  const validarCurp = async () => {
    const curp = watch("curp").toUpperCase();

    // si no cumple regex, deja que RHF muestre su error
    if (!schema.shape.curp.safeParse(curp).success) return;

    try {
      setLoadingCurp(true);
      /* Llama al endpoint */
      const { data } = await api.get(
        `http://192.168.100.100:8007/consultar-curp/${curp}`
      );

      // helper para fecha dd/mm/aaaa → yyyy-mm-dd
      const toInputDate = (s) => {
        const [d, m, y] = s.split("/");
        return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
      };

      /* Autocompleta */
      reset({
        curp,
        nombre: data.nombre ?? "",
        apellido1: data.primer_apellido ?? "",
        apellido2: data.segundo_apellido ?? "",
        fechaNac: data.fecha_nacimiento
          ? toInputDate(data.fecha_nacimiento)
          : "",
        sexo: data.sexo ?? "",
      });
      setCurpOk(true);
    } catch (err) {
      setCurpOk(false);
      const msg =
        err?.response?.data?.detail ??
        "No se encontró la CURP o el servicio no respondió.";
      setError("curp", { message: msg });
    } finally {
      setLoadingCurp(false);
    }
  };

  /* --- SUBMIT FINAL --- */
  const onSubmit = async (formData) => {
    /* aquí puedes POSTear al backend o simplemente avisar al padre */
    console.table(formData);
    onSuccess?.(); // avisa a V5ACompletarIne para pasar al domicilio
  };

  const navigate  = useNavigate();
  /* --- UI --- */
  return (
    <div className={styles.cntFormulario}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.formulario}
        noValidate
      >
        {/* CURP */}
        <div className={styles.cntValCurp}>
          <label className={styles.label}>
            CURP:
            <input
              {...register("curp")}
              className={styles.input}
              placeholder="Ingresa tu CURP"
              maxLength={18}
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
            />
          </label>

          <BotonA
            className={styles.BotonA}
            type="button"
            loadig={loadingCurp}
            variant="secondary"
            onClick={validarCurp}
            disabled={loadingCurp}
          >
            {loadingCurp ? "Validando…" : curpOk ? "Validada" : "Validar"}
          </BotonA>
        </div>
        {errors.curp && (
          <span className={styles.errors}>{errors.curp.message}</span>
        )}

        {/* NOMBRE Y DEMÁS CAMPOS – sin cambios visuales, solo quité comentarios */}
        <label className={styles.label}>
          Nombre(s):
          <input {...register("nombre")} className={styles.input} />
          {errors.nombre && (
            <span className={styles.errors}>{errors.nombre.message}</span>
          )}
        </label>

        <label className={styles.label}>
          Primer Apellido:
          <input {...register("apellido1")} className={styles.input} />
          {errors.apellido1 && (
            <span className={styles.errors}>{errors.apellido1.message}</span>
          )}
        </label>

        <label className={styles.label}>
          Segundo Apellido:
          <input {...register("apellido2")} className={styles.input} />
        </label>

        <label className={styles.label}>
          Fecha de nacimiento:
          <input
            type="date"
            {...register("fechaNac")}
            className={styles.input}
          />
          {errors.fechaNac && (
            <span className={styles.errors}>{errors.fechaNac.message}</span>
          )}
        </label>

        <label className={styles.label}>
          Sexo:
          <select {...register("sexo")} className={styles.select}>
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

        {/* BOTONES */}
        <div className={styles.cntBoton}>
          <a 
            className={styles.volver} 
            onClick={() => navigate(-1)}>
            Volver
          </a>
          <BotonA variant="secondary" onClick={() => reset()}>
            Limpiar
          </BotonA>
          <BotonA type="submit" disabled={!isValid || isSubmitting}>
            Continuar
          </BotonA>
        </div>
      </form>
    </div>
  );
};

export default FormularioINE;
