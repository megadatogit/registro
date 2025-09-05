import React from "react";
import styles from "./formulario.module.css";
import BotonA from "../Botones/BotonA";

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
    calle: z.string().min(1, "Calle requerida"),
    numeroExt: z.string().min(1, "Número exterior requerido"),
    numeroInt: z.string().optional(),
    colonia: z.string().min(1, "Colonia requerida"),
    alcaldiaMunicipio: z.string().min(1, "Alcaldia requerida"),
    codigoPostal: z
        .string()
        .length(5, 'El C.P. de tener 5 digitos')
        .regex(/^\d{5}$/, 'Código Postal inválido'),
    estado: z.string().min(1, "Estado requerido"),
    referencia: z.string().optional()
})

const FormularioDom = () => {

    const onSubmit = (data) => console.table(data);

    const {
        register,
        handleSubmit,
        reset,
        formState:{errors},
    } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            calle: "",
            numeroExt: "",
            numeroInt: "",
            colonia: "",
            alcaldiaMunicipio: "",
            codigoPostal: "",
            estado: "",
            referencia: ""
        },
    });

  return (
    <div className={styles.cntFormulario}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formulario}>
            {/* Calle */}
            <label className={styles.label}>
                Calle:
                <input
                className={styles.input}
                {...register("calle")}
                placeholder="Ingrese calle"
                />
                {errors.calle && (
                    <span className={styles.errors}>{errors.calle.message}</span>
                )}
            </label>

            {/* Número Exterior */}
            <label className={styles.label}>
                Número Exterior:
                <input
                className={styles.input}
                {...register("numeroExt")}
                placeholder="Ingrese Número exterior"
                />
                {errors.numeroExt && (
                    <span className={styles.errors}>{errors.numeroExt.message}</span>
                )}
            </label>

            {/* Número interior */}
            <label className={styles.label}>
                Número Interior
                <input
                className={styles.input}
                {...register("numeroInt")}
                placeholder="Ingrese Número interior"
                />
                {errors.numeroInt && (
                    <span className={styles.errors}>{errors.numeroInt.message}</span>
                )}
            </label>

            {/* Colonia */}
            <label className={styles.label}>
                Colonia:
                <input
                className={styles.input}
                {...register("colonia")}
                placeholder="Ingrese colonia"
                />
                {errors.colonia && (
                    <span className={styles.errors}>{errors.colonia.message}</span>
                )}
            </label>

            {/* Alcaldia o Municipio */}
            <label className={styles.label}>
                Alcaldia o Municipio:
                <input
                className={styles.input}
                {...register("alcaldiaMunicipio")}
                placeholder="Ingresa Alcaldia o Municipio"
                />
                {errors.alcaldiaMunicipio && (
                    <span className={styles.errors}>{errors.alcaldiaMunicipio.message}</span>
                )}
            </label>

            {/* Código postal */}
            <label className={styles.label}>
                Código Postal:
                <input
                className={styles.input}
                {...register("codigoPostal")}
                maxLength={5}
                inputMode='numeric'
                placeholder="C.P."
                
                />
                {errors.codigoPostal && (
                    <span className={styles.errors}>{errors.codigoPostal.message}</span>
                )}
            </label>

            {/* Estado */}
            <label className={styles.label}>
                Estado:
                <input
                className={styles.input}
                {...register("estado")}
                placeholder="Estado"
                />
                {errors.estado && (
                    <span className={styles.errors}>{errors.estado.message}</span>
                )}
                
            </label>

            <div className={styles.cntBoton}>
                <BotonA 
                className={styles.btnLimpiar}
                variant="secondary"
                onClick={() => reset()}
                >
                Limpiar
                </BotonA>
                <BotonA variant="primary" type="submit">
                Enviar
                </BotonA>
            </div>
        </form>
        
    </div>
  )
}

export default FormularioDom
