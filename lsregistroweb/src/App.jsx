import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Registro from './components/Inicio/Registro'
import Confirmacion from './components/Confirmacion/Confirmacion'
import Verificacion from './components/Verificación/Verificacion'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Registro/>
    </>
  )
}

export default App
