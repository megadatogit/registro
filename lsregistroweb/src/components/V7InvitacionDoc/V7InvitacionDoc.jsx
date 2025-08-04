import React from 'react'
import styles from './v7invitacionDoc.module.css'
import BotonA from '@/components/Botones/BotonA';

const V7InvitacionDoc = () => {
  return (
    <div clasName={styles.cntV7InvitacionDoc}>
        <p>Despues subes tus documentos</p>

        <BotonA>
            Continuar
        </BotonA>


    </div>
  )
}

export default V7InvitacionDoc
