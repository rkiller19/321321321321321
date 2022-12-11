import React from 'react'
import ReactModal from 'react-modal'

import overlay from './modal.module.scss'
import content from './modal.module.scss'
import closeModalButton from './modal.module.scss'
import styles from './modal.module.scss'
import { CloseButton } from '../'

export const Modal = ({ children, isOpen, closeHandler }) => {
  ReactModal.setAppElement('#root')

  return (
    <ReactModal
      isOpen={isOpen}
      className={styles.content}
      overlayclassName={styles.overlay}
      onRequestClose={closeHandler}
      contentElement={(props, children) => <div {...props}>{children}</div>}
    >
      <CloseButton className={styles.closeModalButton} onClick={closeHandler} />

      {children}
    </ReactModal>
  )
}
