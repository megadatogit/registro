// src/components/Formulario/FormularioINE.jsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/services/api";
import styles from "./formulario.module.css";
import BotonA from "../Botones/BotonA";
import { ROUTES } from "@/routes/AppRouter";

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
  const navigate = useNavigate();
  const { state } = useLocation(); // por si quieres conservar contexto

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
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
  const [resCurp, setResCurp] = useState({})

  const toInputDate = (s = "") => {
    // backend te devuelve dd/mm/yyyy → input date necesita yyyy-mm-dd
    const [d, m, y] = s.split("/");
    return y && m && d
      ? `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`
      : "";
  };

  const validarCurp = async () => {
    const curp = (watch("curp") || "").toUpperCase();

    // valida formato con zod sin bloquear UI
    if (!schema.shape.curp.safeParse(curp).success) return;

    try {
      setLoadingCurp(true);

      // Si este microservicio corre en otro host/puerto, crea otra instancia axios o usa URL absoluta <<para extraer curp
      const res = await api.get(
        `/ine/preregistro/curp/extraer/${encodeURIComponent(curp)}`
      );
      const data =
        typeof res.data === "string" ? JSON.parse(res.data) : res.data;

      setResCurp(data)

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
      const detail =
        err?.response?.data?.detail ??
        err?.response?.data?.message ??
        err?.message;
      const msg = Array.isArray(detail)
        ? detail.map((d) => d?.msg || JSON.stringify(d)).join(" · ")
        : detail || "Error al validar CURP";
      setError("curp", { message: msg });
    } finally {
      setLoadingCurp(false);
    }
  };

  const onSubmit = async (formData) => {
    try {
      const payload = {
        curp: formData.curp,
        nombre: formData.nombre,
        primer_apellido: formData.apellido1,
        segundo_apellido: formData.apellido2 || "",
        sexo: formData.sexo,
        fecha_nacimiento: formData.fechaNac, // yyyy-mm-dd desde input date
        nacionalidad: formData.nacionalidad,
        entidad_nacimiento: "CDMX",
        abr_entidad: "CMX",
        municipio_registro: "CDMX-01",
      };

      // ⚠️ Usa tu instancia axios (envía cookie HttpOnly para refresh/access si aplica)<< avienta el curp
      const { data } = await api.post("/ine/preregistro/curp/subir", resCurp);
      console.log("✅ CURP guardada:", data);

      // Continúa al formulario de domicilio
      navigate(ROUTES.COMPLETAR_DOMICILIO, { state });
      // o si prefieres notificar al padre:
      // onSuccess?.(data);
    } catch (err) {
      const detail =
        err?.response?.data?.detail ??
        err?.response?.data?.message ??
        err?.message;
      const msg = Array.isArray(detail)
        ? detail.map((d) => d?.msg || JSON.stringify(d)).join(" · ")
        : detail || "Error al guardar CURP";
      alert(msg);
    }
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
          <BotonA type="submit" disabled={isSubmitting || !curpOk}>
            Continuar
          </BotonA>
        </div>
      </form>
    </div>
  );
};

export default FormularioINE;
