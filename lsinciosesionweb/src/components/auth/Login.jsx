import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./login.module.css";
import logo from "@/images/Capa_1-2.png";
import eyeIcon from "@/images/Icons _ eye-empty.png"; // ✅ importa el icono
import { login } from "@/services/auth"; // ✅ importa el servicio
//import { setAuthToken } from "@/services/apiClient";
import Derechos from "../Derechos/Derechos";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "paciente", // paciente | medico
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "switch" && type === "checkbox") {
      setForm((f) => ({ ...f, role: checked ? "medico" : "paciente" }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const validate = () => {
    if (!form.email.trim()) return "El correo es obligatorio.";
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) return "Formato de correo inválido.";
    if (!form.password) return "La contraseña es obligatoria.";
    if (form.password.length < 6) return "Mínimo 6 caracteres en contraseña.";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    const v = validate();
    if (v) return setErrorMsg(v);

    try {
      setLoading(true);
      const data = await login({
        username: form.email.trim(),
        password: form.password,
        role: form.role, // "paciente" | "medico"
      });

      // si usas cookie HttpOnly, no necesitas guardarla manualmente.
      // marcamos auth para el ProtectedRoute “temporal”:
      localStorage.setItem("auth_ready", "1");

      // ...después de obtener los datos del login/usuario:
      localStorage.setItem(
        "perfil_min",
        JSON.stringify({
          nombre: data?.user?.first_name && data?.user?.last_name || data?.user?.nombre || "Usuario",
          // puedes guardar más campos si quieres:
          // avatarUrl: data?.user?.avatar,
        })
      );

      navigate("/inicio", { replace: true });
    } catch (err) {
      console.error(err);
      const apiMsg =
        err?.response?.data?.detail ||
        err?.response?.data?.message ||
        err?.message;
      setErrorMsg(
        apiMsg || "No fue posible iniciar sesión. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.cntTarjeta}>
      <div className={styles.cntLogo}>
        <img className={styles.logo} src={logo} alt="Liber Salus Logo" />
      </div>

      <h2 className={styles.h2}>
        Bienvenido a <br /> Liber Salus
      </h2>

      <form className={styles.formulario} onSubmit={onSubmit} noValidate>
        {/* Switch Paciente/Médico */}
        <div
          className={
            form.role === "medico"
              ? `${styles.cntSwitch} ${styles.switchActivo}`
              : styles.cntSwitch
          }
        >
          <input
            type="checkbox"
            name="switch"
            id="switch"
            checked={form.role === "medico"}
            onChange={onChange}
            aria-label="Cambiar a perfil Médico"
          />
          <div className={styles.cntSwitch}>
            <div
              className={
                form.role === "medico"
                  ? `${styles.switchBg} ${styles.switchBgRight}`
                  : styles.switchBg
              }
            />
            <div className={styles.perfil}>
              <span
                className={`${styles.span} ${
                  form.role === "paciente" ? styles.activo : styles.inactivo
                }`}
                onClick={() => setForm((f) => ({ ...f, role: "paciente" }))}
                style={{ cursor: "pointer" }}
              >
                Paciente
              </span>
              <span
                className={`${styles.span} ${
                  form.role === "medico" ? styles.activo : styles.inactivo
                }`}
                onClick={() => setForm((f) => ({ ...f, role: "medico" }))}
                style={{ cursor: "pointer" }}
              >
                Médico
              </span>
            </div>
          </div>
        </div>

        {/* ✅ Email (antes estaba cortado) */}
        <div className={styles.cntInput}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="ejemplo@mail.com"
            value={form.email}
            onChange={onChange}
            autoComplete="username"
            required
          />
        </div>

        {/* Password */}
        <div className={styles.cntInput}>
          <label htmlFor="password">Contraseña</label>
          <div className={styles.cntInpContra}>
            <button
              type="button"
              className={styles.imgOjo}
              onClick={() => setShowPwd((s) => !s)}
              aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <img
                className={styles.imgOjo}
                src={eyeIcon}
                alt={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
              />
            </button>

            <input
              className={styles.input}
              id="password"
              name="password"
              type={showPwd ? "text" : "password"}
              placeholder="Contraseña"
              value={form.password}
              onChange={onChange}
              autoComplete="current-password"
              required
              minLength={6}
            />
          </div>
        </div>

        {errorMsg && (
          <div
            className={styles.mensajeError}
            role="alert"
            aria-live="assertive"
          >
            {errorMsg}
          </div>
        )}

        <a className={styles.olvida} href="/recuperar">
          ¿Olvidaste tu contraseña?
        </a>

        <input
          className={styles.btn}
          type="submit"
          value={loading ? "Iniciando..." : "Iniciar Sesión"}
          disabled={loading}
        />
      </form>

      <div className={styles.cntRegistro}>
        <p>
          ¿Aún no tienes cuenta? <a href="/registro">Registrarme</a>
        </p>
      </div>
      <Derechos />
    </div>
  );
};

export default Login;
