import React from 'react'
import styles from './cuestionarios.module.css';
import { ROUTES } from '@/routes';
import { NavLink } from 'react-router-dom';
import Menu from '@/components/menu/Menu';
import Principal from '@/Layout/Principal';
import TarjetaListadoAvance from './TarjetaListadoAvance/TarjetaListadoAvance';

const Cuestionarios = () => {
  return (
    <Principal>
      
      <div className={styles.cntCuestionarios}>

        <div className={styles.cntInfo}>
          <h2>Cuestionarios</h2>

        </div>

      </div>
      
      
      <TarjetaListadoAvance />

    </Principal>
  )
}

export default Cuestionarios
