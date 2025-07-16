import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import V1Registro from './components/V1Registro/V1Registro'
import V2Confirmacion from './components/V2Confirmacion/V2Confirmacion'
import V3Verificacion from './components/V3Verificación/V3Verificacion'
import V4ConfExito from './components/V4ConfExito/V4ConfExito'
import Logo from './components/ElementosVista/Logo/Logo'
import TextoPrincipal from './components/ElementosVista/TextoPrincipal/TextoPrincipal'
import TextoSecundario from './components/ElementosVista/TextoSecundario/TextoSecundario'
import V5ComprIdentidad from './components/V5ComprIdentidad/V5ComprIdentidad'
import V6Adjuntar from './components/V6Adjuntar/V6Adjuntar'
import V7Recibidos from './components/V7Recibidos/V7Recibidos'
import V5ACompletarIne from './components/V5ACompletarIne/V5ACompletarIne'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <V5ACompletarIne
      />
    </>
  )
}

export default App
