import { useState } from 'react'
import './App.css'
import Login from './components/auth/Login'
import Background from './components/background/Background'
import Panel from './pages/Panel/Panel'
import Inicio from './pages/Inicio/Inicio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Panel/>
    </>
  )
}

export default App
