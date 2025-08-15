import React from 'react'
import styles from './panel.module.css';
import Menu from '@/components/menu/Menu';
import BackgroundPanel from '@/components/background/backgroundPanel/BackgroundPanel';
import TarjetaUsuario from '@/components/Tarjetas/TarjetaUsuario/TarjetaUsuario';
import TarjetaCuestionario from '@/components/Tarjetas/TarjetaCuestionarios/TarjetaCuestionario';

const Panel = () => {
  return (

    <div className={styles.panel}>
        <div className={styles.backgroundPanel}>
            <BackgroundPanel />
        </div>

        <div className={styles.cntMenu}>
            <Menu />
        </div>
        
        <div className={styles.cntTrjUsuario}>
            <TarjetaUsuario/>
        </div>
        <div className={styles.cntModulos}>

        <div className={styles.cntTrjCuestionario}>
            <TarjetaCuestionario />
        </div>
        </div>

    </div>
  )
}

export default Panel
