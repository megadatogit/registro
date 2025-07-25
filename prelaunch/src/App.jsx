import { useState } from 'react'
import './App.css'
import EnlaceSocial from './components/EnlaceSocial'
import styles from './stylesApp.module.css'
import facebook from '../public/facebook.svg'
import logo from '../public/Group.svg'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <main className={styles.cntPrincipal}>

        <div className={styles.cuerpo}>
          <div className={styles.cntRedes}>
          <div className={styles.enlaces}>
            <EnlaceSocial
              srcRS={facebook}
            />
            <EnlaceSocial
              srcRS={facebook}
            />
            <EnlaceSocial
              srcRS={facebook}
            />
            <EnlaceSocial
              srcRS={facebook}
            />
            <EnlaceSocial
              srcRS={facebook}
            />
          </div>
          <p>Síguenos en nuestras redes sociales oficiales*</p>
        </div>

        <div className={styles.cntInfo}>
          <div className={styles.cntLogo}>
            <img src={logo} className={styles.logo}></img>
          </div>
          <div className={styles.cntTexto}>
            <h2 className={styles.tit}>Cuidando tu salud desde la prevención</h2>
            <p className={styles.txt}>Estamos desarrollando una plataforma digital dedicada a la prevención y atención temprana de enfermedades. Una herramienta pensada para fortalecer tu calidad de vida y apoyar al sistema de salud en México. Pronto podrás afiliarte y recibir atención directa, preventiva y accesible
            </p>
            <button>Avisarme cuando este listo</button>
          </div>
        </div>
        </div>
        <div className={styles.pie}>
          <p className={styles.pieTxt}>* Liber Salus es un proyecto de salud digital. Todos los enlaces oficiales serán comunicados exclusivamente por este medio y nuestras redes verificadas
          </p>
        </div>
      </main>

    </>
  )
}

export default App
