import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { ROUTES } from '../../routes/AppRouter';

import styles          from './v2confirmacion.module.css';
import Logo            from '@/components/ElementosVista/Logo/Logo';
import BotonA          from '@/components/Botones/BotonA';
import TextoPrincipal  from '@/components/ElementosVista/TextoPrincipal/TextoPrincipal';
import TextoSecundario from '@/components/ElementosVista/TextoSecundario/TextoSecundario';


const Confirmacion = () => {
  
  const {state } = useLocation();
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState('');  //'email' _ 'phone' 
  const [loading, setLoading] = useState(false);

  const maskPhone = (tel) => `•••• ••• • ${tel.slice(-4)}`
  const maskMail  = (mail) =>{
    const [u,d] = mail.split('@');
     return `${u[0]}••••@${d}`
  };

  /* Envio de código */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!metodo) return;
6
    try {
      setLoading(true);

      await api.post(`/preregistro/preregistro/enviar-codigo-${metodo}`, { 
        identificador: state[metodo]
      });

      navigate(ROUTES.VERIFICACION, {state:{...state, metodo}});

    } catch (err) {
      console.log(err)
      alert(err.response.data.detail);
    } finally {
      setLoading(false);
    }
  };


    return (
        <div className={styles.cntConfirmacion}>
            <div className={styles.cntLogo}>
                <Logo />
            </div>
            <div className={styles.cntTextos}>
                <TextoPrincipal
                    textoPrincipal="Confirmemos tu información de contacto"
                />

                <TextoSecundario
                    textoSecundario={[
                      "Antes de continuar, elige a dónde deseas que te enviemos tu código de verificación.",
                      <br key="1" />,
                      "Esto nos permite asegurar que tus datos sean correctos y proteger tu cuenta."
                    ]}
                />
            </div>

            {/* formulario */}

            <form className={styles.form} onSubmit={handleSubmit}>
  <fieldset className={styles.fieldset}>
    {/* <legend>Selecciona cómo quieres recibir tu código</legend> */}

    <div className={styles.input}>
      <input
        type="radio"
        id="correo"
        name="metodo"           // <-- nombre IGUAL para ambos radios
        value="correo"
        checked={metodo === 'correo'}
        onChange={()=>setMetodo('correo')}
      />
      <label htmlFor="correo"> {/* <-- htmlFor en React */}
        Enviar código a e-mail:<br />
        <span className={styles.datos}>{maskMail(state?.correo)}</span>
      </label>
    </div>

    <div className={styles.input}>
      <input
        type="radio"
        id="telefono"
        name="metodo"          // <-- igual aquí
        value="telefono"
        checked={metodo==='telefono'}
        onChange={()=>setMetodo('telefono')}
      />
      <label htmlFor="telefono">
        Enviar código por SMS:<br />
        <span className={styles.datos}>{maskPhone(state?.telefono)}</span>
      </label>
    </div>

    <div>
      <BotonA type="submit" disabled={!metodo || loading}>{loading ? 'Enviando' : "Enviar código"}</BotonA>
    </div>
  </fieldset>

  <p>¿Tu información no es correcta? </p>
  <a 
    onClick={()=> navigate(-1)}
    className={styles.volver}
  >Volver a registro</a>
</form>

        </div>
    )
}

export default Confirmacion
