import React, { useState, useEffect } from 'react'

 
import cardModal from './cardModal.module.scss'
import cardModalTitle from './cardModal.module.scss'
import cardModalInputContainer from './cardModal.module.scss'
import cardModalInput from './cardModal.module.scss'
import cardModalMaxButton from './cardModal.module.scss'
import cardModalBalance from './cardModal.module.scss'
import styles from './cardModal.module.scss'

import { Modal, Title, Button, Input } from '../../'

export function CardModal(props) {
  const { title, isOpen, closeHandler, balance, callMethod, buttonText } = props
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    props.updateWalletAmount(inputValue)
  }, [inputValue])

  const inputHandler = (e) => {
    setInputValue(e.target.value)
  }

  const callMethodHandler = () => {
    if (props.walletAmount === 0 || props.walletAmount === '') {
      return
    }
    callMethod()
  }

  return (
    <Modal isOpen={isOpen} closeHandler={closeHandler}>
      <div className={styles.cardModal}>
        <Title className={styles.cardModalTitle} level={3}>
          {title}
        </Title>
        <div className={styles.cardModalInputContainer}>
          <Input
            onChange={inputHandler}
            value={inputValue}
            className={styles.cardModalInput}
          />
          <Button
            className={styles.cardModalMaxButton}
            onClick={() => {
              setInputValue(String(balance))
            }}
          >
            Max
          </Button>
        </div>

        <span className={styles.cardModalBalance}>Balance: {balance}</span>

        <Button
          onClick={callMethodHandler}
          disabled={props.walletAmount === 0 || props.walletAmount === ''}
        >
          {buttonText}
        </Button>
      </div>
    </Modal>
  )
}
