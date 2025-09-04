# Documentación del Frontend – Liber Salus Registro Web

> Proyecto React + Vite para el flujo de registro de usuarios en Liber Salus. Incluye rutas, estructura de carpetas, estilos, navegación, ejemplos visuales y contexto de cada vista.

<hr>

### Índice

1. Estructura general del proyecto
2. Rutas y navegación
3. Componentes principales
4. Estilos y assets
5. Ejemplo visual de navegación
6. Contexto y propósito de cada vista
7. Notas y recomendaciones

### 1. Estructura general del proyecto


>lsregistroweb/
├── public/                # Recursos estáticos (imágenes, fuentes)
├── src/
│   ├── assets/            # Imágenes y SVGs globales
│   ├── components/        # Componentes React modulares
│   │   ├── Botones/
│   │   ├── ElementosVista/
│   │   ├── Formulario/
│   │   ├── Seleccion/
│   │   ├── V1Registro/ ... V8Opciones/   # Vistas del flujo
│   ├── hooks/             # Custom hooks
│   ├── routes/            # Definición de rutas y navegación
│   ├── services/          # Lógica de API
│   ├── App.jsx            # (No se usa directamente, ver main.jsx)
│   ├── main.jsx           # Entry point, monta rutas
│   ├── index.css          # Estilos globales
│   ├── App.css            # Estilos globales
├── index.html             # HTML principal
├── package.json           # Dependencias y scripts

<hr>

### 2. Rutas de navegación

La navegación se gestiona con `react-router-dom` en `AppRouter.jsx`

**Mapa de rutas:**

| Ruta |	Componente React |	Descripción breve |
|------|---------------------|--------------------|
| / |	Redirige a /registro |	Raíz, inicio del flujo |
| /registro |	V1Registro	 |  Registro de usuario |
| /confirmacion |	V2Confirmacion |	Confirmación de datos |
| /verificacion |	V3Verificacion |	Verificación de código |
| /confirmacion-exito |	V4ConfExito |	Éxito, pasa a identidad |
| /comprobar-identidad |	V5ComprIdentidad |	Selección de método de identidad |
| /completar-ine |	V5ACompletarIne	| Formulario INE |
| /completar-domicilio |	V5BCompletarDom	| Formulario domicilio |
| /adjuntar-documentos |	V6Adjuntar	| Adjuntar archivos |
| /capturar-documentos | V6Capturar	| Captura de documentos |
| /recibidos |	V7Recibidos	| Documentos recibidos |
| /revisar-documentos	| V7RevisarDoc	| Revisión de documentos |
| /invitacion-documentos |	V7RevisarDoc |	Invitación a subir documentos |
| /opciones |	V8Opciones |	Opciones finales |

**Ejemplo de definición de rutas:**

``` Javascript 
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Navigate to={ROUTES.REGISTRO} replace />} />
    <Route path={ROUTES.REGISTRO} element={<V1Registro />} />
    ...
  </Routes>
</BrowserRouter>

```

<hr>

### 3. Componentes principales

Estrucutura de vistas (V1...V8)
Cada vista del flujo tiene su propio folder y archivo principal en conjunto con su archivo de estilos utilizando module: `nombre.module.css`

```Javascript
src/components/
  V1Registro/V1Registro.jsx
  V2Confirmacion/V2Confirmacion.jsx
  ...
  V8Opciones/V8Opciones.jsx
```

Ejemplo de jerarquia de componentes en una vista:

>V1Registro
├── Logo
├── Switch (selección de rol)
├── Formulario (inputs, validación)
│   ├── RHF + Zod para validación
│   └── BotonA (botón principal)
├── TextoPrincipal / TextoSecundario
└── Derechos (información legal)

El componente de una vista se integra de la siguiente manera: Su composición integra los elementos requeridos según su contexto. Este es el componente `V1Registro`

```Javascript 
// src/components/V1Registro/V1Registro.jsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/routes/AppRouter';

import styles from './v1registro.module.css';
import srcAbierto from './eye-password-see-view-svgrepo-com.svg';
import srcCerrado from './eye-key-look-password-security-see-svgrepo-com.svg';
import Logo       from '@/components/ElementosVista/Logo/Logo';
import BotonA     from '@/components/Botones/BotonA';
import Switch     from '@/components/Seleccion/Switch';
import Derechos   from './Derechos';

/* ---------- Validación ---------- */
const schema = z.object({
  correo:    z.string().email('Correo no válido'),
  telefono:  z.string().regex(/^\d{10}$/, 'Debe tener 10 dígitos'),
  contrasena:z.string().regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,'8+, 1 mayús., 1 minús., 1 número, 1 símbolo'),
  confirmContra: z.string(),
  politicas: z.literal(true, 'Lee los terminos y condiciones y activa la casilla' ),
}).refine((d) => d.contrasena === d.confirmContra, {
  path: ['confirmContra'],
  message: 'Las contraseñas no coinciden',
});

const Registro = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);

  /* ---------- Form RHF ---------- */
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { errors, isValid, isSubmitting, isDirty, touchedFields },
  } = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  /* Re-validar confirmación al cambiar la contraseña */
  const pwd = watch('contrasena');
  useEffect(() => {
    if (pwd) trigger('confirmContra');
  }, [pwd, trigger]);

  /* ---------- Submit ---------- */
  const onSubmit = (data) => {
    const payload = {
      rol: 1,
      correo:        data.correo,
      telefono:      data.telefono,
      code_telefono: '52',
      contrasena:    data.contrasena,
    };
    navigate(ROUTES.CONFIRMACION, { state: payload });
  };
  console.log(errors)
  /* ---------- UI ---------- */
  return (
    <div className={styles.cntV1Registro}>
      <div className={styles.cntBienvenida}>

        <div className={styles.cntSaludo}>
          <div>
            <p>¡Bienvenido a Liber Salus!</p>
            <p >Afíliate y toma el control de tu bienestar</p>
          </div>
          <div className={styles.cntLogo}>
            <Logo />
          </div>
        </div>
        <p>Para comenzar a usar nuestra plataforma, necesitas crear un usuario y afiliarte.<br />
          Este proceso es sencillo y sólo toma tres pasos:</p>
        <div className={styles.cntPasos}>
          <div className={styles.elementoPaso}>
            <p className={styles.paso}>Crea tu usuario: <br />
              Llena tus datos personales.</p>
          </div>
          <div className={styles.elementoPaso}>
            <p className={styles.paso}>Sube tus documentos: <br />
              CURP, INE y comprobante de domicilio</p>
          </div>
          <div className={styles.elementoPaso}>
            <p className={styles.paso}>Completa tus cuestionarios de saliud</p>
          </div>
        </div>

        <div className={styles.cntDerechosInfo}>
          <Derechos />
        </div>
      </div>

      <div className={styles.cntFormulario}>
        <div className={styles.formulario}>
          <div className={styles.logoForm}><Logo /></div>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Switch />

            {/* Correo */}
            <div className={styles.cntImput}>
              <label className={styles.label}>Correo electrónico</label>
              <input
                type="email"
                placeholder="Correo electrónico"
                {...register('correo')}
                className={errors.correo ? styles.errorInput : ''}
              />
              {errors.correo && <span className={styles.error}>{errors.correo.message}</span>}
            </div>

            {/* Teléfono */}
            <div className={styles.cntImput}>
              <label className={styles.label}>Teléfono</label>
              <input
                type="text"
                placeholder="Teléfono celular"
                maxLength={10}
                {...register('telefono')}
                className={errors.telefono ? styles.errorInput : ''}
              />
              {errors.telefono && <span className={styles.error}>{errors.telefono.message}</span>}
            </div>

            {/* Contraseña */}
            <div className={styles.cntImput}>
              <label className={styles.label}>Contraseña</label>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Contraseña"
                {...register('contrasena')}
                className={errors.contrasena ? styles.errorInput : ''}
              />
              <span
                className={styles.passwordToggle}
                onClick={() => setShowPass(!showPass)}
                role="button"
                tabIndex={0}
                aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();          // evita que el espacio haga scroll
                    setShowPass((p) => !p);
                  }
                }}
              >
                <img src={showPass ? srcCerrado : srcAbierto} className={styles.ojos} alt="" />
              </span>
              {errors.contrasena && <span className={styles.error}>{errors.contrasena.message}</span>}
            </div>

            {/* Confirmar */}
            <div className={styles.cntImput}>
              <label className={styles.label}>Confirmar contraseña</label>
              <input
                type={showConf ? 'text' : 'password'}
                placeholder="Confirmar contraseña"
                {...register('confirmContra')}
                className={errors.confirmContra ? styles.errorInput : ''}
              />
              <span
                className={styles.passwordToggle}
                onClick={() => setShowConf(!showConf)}
                role="button"
                tabIndex={0}
                aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();          // evita que el espacio haga scroll
                    setShowConf((p) => !p);
                  }
                }}
              >
                <img src={showConf ? srcCerrado : srcAbierto} className={styles.ojos} alt="" />
              </span> 
              {errors.confirmContra && <span className={styles.error}>{errors.confirmContra.message}</span>}
            </div>

            {/* Políticas */}
            <div className={styles.cntPoliticas}>
              <input id="politicas" type="checkbox" {...register('politicas')} />
              <label htmlFor="politicas">
                He leído y acepto <a href="#">Términos</a> y <a href="#">Privacidad</a>
              </label>
              {errors.politicas && touchedFields.politicas && <span className={styles.error}>{errors.politicas.message}</span>}
            </div>

            {/* Botón */}
            <BotonA type="submit" disabled={!isValid || !isDirty || isSubmitting}>
              {isSubmitting ? 'Creando…' : 'Crear cuenta'}
            </BotonA>
          </form>
        </div>
        <div className={styles.cntDerechosForm}><Derechos /></div>
      </div>
    </div>
  );
};

export default Registro;

```
<hr>

## 4. Estilos por módulo

El componente enlaza el archivo de estilos utilizando el nombre que se da al mismo componente. 
Ejemplo.

|Nombre del componente| Enlace de estilos |
|---------------------|-------------------|
| `/V1Registro`|`/v1Registro.module.css` |

La estructura de estilos maneja clases en fución del elemento al que se aplica estilos.

|Nombre del elemento| Nombre de la clase |
|---------------------|-------------------|
| Contenedor principal |`<className={styles.cntPrinpical}>` |

Ejemplo de estilos

```Css
.cntV1Registro {
    width: 100%;
    height: 100dvh;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    overflow: hidden;
}

.cntBienvenida{
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 5%;
    background-image: url(./Mask.png);
    background-size: cover;
    z-index: 1;
    color: white;
    width: 55%;
    height: 100dvh;
    position: relative;
}

.cntBienvenida::after {
    /* border: 2px dashed; */
    position: absolute;
    z-index: -2;
    content: '';
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width:  100%;
    min-width: 320px;
    background-color: #3b63a8 ;
    filter: opacity(0.6);
}

.cntSaludo {
    display: flex;
    flex-direction: column;
    & .cntLogo {
        display: none;
    }
}

.cntSaludo div > :nth-child(1) {
    font-size: 2rem;
}

.cntPasos {
    margin: 0 auto;
    width: 50%;
    margin-left: 5rem ;
    font-size: 0.8rem;
    /* border: 2px dashed; */
}

.elementoPaso {
    display: flex;
    flex-direction: row;
    position: relative;
    line-height: 1.2;
    margin-bottom: 2rem;
}

.cntPasos > :nth-child(1)::before, 
.cntPasos > :nth-child(2)::before, 
.cntPasos > :nth-child(3)::before { 
    position: absolute;
    width:  3rem;
    height: 3rem;
    background-color: white;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    left: -4rem;
    font-size: 1.05rem;
    font-weight: 600;
    color: #5981c6;
}

.cntPasos > :nth-child(1)::before {content: '1';}
.cntPasos > :nth-child(2)::before {content: '2';}
.cntPasos > :nth-child(3)::before {content: '3';}
.cntPasos > :nth-child(1)::after,
.cntPasos > :nth-child(2)::after {
    position: absolute;
    content: '';
    width: 0.3rem;
    height:  5rem;
    background-color: white;
    left: calc(-4rem - (-1.35rem));
    bottom: -2rem;
    z-index: -1;
}

.cntBienvenida > :nth-child(5),
.cntBienvenida > :nth-child(6) {
    font-size: 0.8rem;
    margin: 0.5rem;
}

.cntDerechos {
    display: block;
}

.derechos {
    font-size: 0.6rem;
    text-align: center;
}

.liga {
    text-decoration: underline;
    cursor: pointer;
}

.cntFormulario {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;    
}

.logoForm {
    margin: 1rem auto 2rem;
    width: 100%;
}

.formulario {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    min-width: 330px;
}

.cntDerechosForm {
    display: none;
}

.cntImput {    
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    /* border: 2px dashed; */
    margin-top: 1rem;
    flex-direction: column;
    & input {
        margin-bottom: 0.25rem;
        appearance: none;
        border: 1px solid #8f8f8f;
        padding: 0.65rem;
        width: 55%;
        border-radius: 6px;
        outline: none;
        outline-color: #5981c6;
        /* border: 2px dashed; */
    }
    
    & input:focus {
        outline: none;
        outline-color: #5981c6;
    }

    & input.errorInput {
        border: 2.5px solid #e95757 !important;
        outline: none;
    }
}

input::placeholder {
    color: lightgray;
    margin: 0.5rem;
}

.error {
    color: #ec3b3b;
    font-size: 0.6rem;
    display: block;
    margin: 0.4em auto;
    width: 80%;
    text-decoration: none;
}

.errorInput {
    background-color: rgb(252, 236, 236);
    outline: none;
    border: 1px solid #e95757;
    outline-color: #e95757 !important;
}

.cntPoliticas {
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 60%;
    gap: 1rem;
}

.cntChk {
    display: flex;
}

.terminos > p,
.iniciarSesion > p {
    width: 100%;
    text-wrap: balance;
    font-size: 0.6rem;
    text-align: left;
    margin-left: 1rem;
    line-height: 1.2;
}

.iniciarSesion > p {
    text-align: center;
    margin: 0;
    line-height: 1.6;
}

.boton {
    appearance: none;
    padding: 0.5rem;
    border: none;
    border-radius: 8px;
    width: 60%;
    background-color: #5981c6;
    color: white;
}

.passwordToggle {
    position: absolute;
    right: 23%;
    cursor: pointer;
    display: flex;
    top:1.85rem    
}

.ojos {
    width: 13px;
    filter: opacity(0.6);
}

.label {
    display: inline-block;
    width: 55%;
    /* border: 2px dashed; */
    text-align: start;
    transform: translateX(-0.5rem);
    margin-bottom: 0.5rem;
    font-size: 0.85rem;
}

@media (max-width: 950px) {

    .cntSaludo {
        display: flex;
        flex-direction: column-reverse;        
        & .cntLogo {
            margin: 0 auto;
            display: inline-block;
            width: 100%;
            max-width: 250px;
            text-align: center;
        }
    }

    .cntDerechosInfo{
        display: none;
    }

    .cntDerechosForm {
        display: block;
        color: white;
        width: 80%;
    }

    .logoForm {
        display: none;
    }

    .cntBienvenida > :nth-child(2),
    .cntBienvenida > :nth-child(3),
    .cntBienvenida > :nth-child(6),
    .cntPasos {
        display: none;        
    }

    .cntBienvenida{
        background-image: none;
        width: 100%;
        margin: 0 auto;
        padding: 0;
        z-index: 2;
        text-align: center;
    }

    .cntBienvenida::after {
        display: none;
        filter: opacity(0.6);
    }
    .cntV1Registro {
        flex-direction: column;
        width: 100%;
        margin: 0;
        padding: 0;
        background-image: url(./Mask.png);
        position: relative;
        z-index: 1;
    }
    
    .imgLogo {
        min-width: 40%;
    }

    .cntV1Registro::before {
        position: absolute;
        content: '';
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width:  100%;
        background-color: #3b63a8 ;
        filter: opacity(0.6);
        z-index: -1;
    }

    .cntFormulario {
        min-width: 100%;
    }

    .formulario {
        width: 90%;
        color: white;
    }

    .error {
        color: #aa2020;
    }

    .cntImput > input:focus-visible {
        appearance: none;
        outline-color: #5981c6;
    }
}

```

* **Estilos globales.** Estos serán integrados cuando el área de diseño comparta las guias de estilos definidas de la indetidad de marca. Para ello, se programa una estructura mantenible en un recurso global con las nomenclaturas y claves de las variables a utilizar. (pendientes por definir). Para ello se cuenta con los archivos `index.css` y `App.css`
<br>
* **Estilos por módulo.** Cada componente mantiene su archivo como se señalo antemriormente para estilos scoped. 
<br>
* **Assets.**  

6