import React, { useState } from "react";
import { login } from "../../components/auth";
// import { useNavigate } from "react-router-dom";

const Login = () => {
  // const navigate = useNavigate();

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
      // checkbox activado => "medico", desactivado => "paciente"
      setForm((f) => ({ ...f, role: checked ? "medico" : "paciente" }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const validate = () => {
    if (!form.email.trim()) return "El correo es obligatorio.";
    // Validación simple de email
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
    if (v) {
      setErrorMsg(v);
      return;
    }
    try {
      setLoading(true);
      const data = await login({
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      });
      // Si usas cookies httpOnly, ya estás autenticado.
      // Si usas token en el body, ya se guardó con setAuthToken(...)
      // Aquí podrías redirigir:
      // navigate("/dashboard");
      console.log("Login OK:", data);
    } catch (err) {
      console.error(err);
      // Muestra mensaje legible:
      const apiMsg = err?.response?.data?.message;
      setErrorMsg(
        apiMsg || "No fue posible iniciar sesión. Inténtalo de nuevo."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tarjeta-login">
      <div className="cnt-logo">
        <img className="logo" src="./Capa_1-2.png" alt="Liber Salus Logo" />
      </div>

      <h2 className="h2">
        Bienvenido a <br /> Liber Salus
      </h2>

      <form className="formulario" onSubmit={onSubmit} noValidate>
        {/* Switch Paciente/Médico */}
        <div className="cnt-switch">
          <input
            type="checkbox"
            name="switch"
            id="switch"
            checked={form.role === "medico"}
            onChange={onChange}
            aria-label="Cambiar a perfil Médico"
          />
          <div className="perfil">
            <span
              className={`span paciente ${
                form.role === "paciente" ? "activo" : ""
              }`}
            >
              Paciente
            </span>
            <span
              className={`span medico ${
                form.role === "medico" ? "activo" : ""
              }`}
            >
              Medico
            </span>
          </div>
        </div>

        {/* Email */}
        <div className="cnt-input">
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
        <div className="cnt-input">
          <label htmlFor="password">Contraseña</label>
          <div className="cnt-inp-contra">
            <button
              type="button"
              className="ojo"
              onClick={() => setShowPwd((s) => !s)}
              aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
            >
              <img
                src="./Icons _ eye-empty.png"
                alt={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
              />
            </button>

            <input
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

        {/* Error global */}
        {errorMsg && (
          <div className="mensaje-error" role="alert" aria-live="assertive">
            {errorMsg}
          </div>
        )}

        <a className="olvida" href="/recuperar">
          ¿Olvidaste tu contraseña?
        </a>

        <input
          className="btn"
          type="submit"
          value={loading ? "Iniciando..." : "Iniciar Sesión"}
          disabled={loading}
        />
      </form>

      <div className="cnt-registro">
        <p>
          ¿Aún no tienes cuenta? <a href="/registro">Registrarme</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
