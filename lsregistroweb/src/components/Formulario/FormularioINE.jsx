// src/components/Formulario/FormularioINE.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import styles from "./formulario.module.css";
import BotonA from "../Botones/BotonA";

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
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    setValue, // ⬅️ usamos setValue
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

  const [loadingCurp, setLoadingCurp] = useState(false);
  const [curpOk, setCurpOk] = useState(false);
  const navigate = useNavigate();

  const toInputDate = (s = "") => {
    const [d, m, y] = s.split("/");
    return y && m && d
      ? `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
      : "";
  };

  const validarCurp = async () => {
    const curp = (watch("curp") || "").toUpperCase();

    // Deja que RHF marque error si no pasa regex
    if (!schema.shape.curp.safeParse(curp).success) return;

    try {
      setLoadingCurp(true);
      // usa baseURL del api o fuerza aquí el host del microservicio
      const res = await api.get(
        `http://192.168.100.100:8008/consultar-curp/${curp}`
      );
      const data =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      // Autocompletar con setValue
      setValue("curp", curp, { shouldDirty: true });
      setValue("nombre", data?.nombre ?? "", { shouldDirty: true });
      setValue("apellido1", data?.primer_apellido ?? "", { shouldDirty: true });
      setValue("apellido2", data?.segundo_apellido ?? "", {
        shouldDirty: true,
      });
      setValue("fechaNac", toInputDate(data?.fecha_nacimiento), {
        shouldDirty: true,
      });
      setValue("sexo", data?.sexo ?? "", { shouldDirty: true });

      setCurpOk(true);
    } catch (err) {
      setCurpOk(false);
      const msg =
        err?.response?.data?.detail ||
        "No se encontró la CURP o el servicio no respondió.";
      setError("curp", { message: msg });
    } finally {
      setLoadingCurp(false);
    }
  };

  const onSubmit = async (formData) => {
    console.table(formData);
    onSuccess?.();
  };

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
            loading={loadingCurp}
            variant="secondary"
            onClick={validarCurp}
            disabled={loadingCurp}
          >
            {loadingCurp ? "Validando..." : curpOk ? "Validada" : "Validar"}
          </BotonA>
        </div>
        {errors.curp && (
          <span className={styles.errors}>{errors.curp.message}</span>
        )}

        {/* Campos */}
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

        <div className={styles.cntBoton}>
          <a className={styles.volver} onClick={() => navigate(-1)}>
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
