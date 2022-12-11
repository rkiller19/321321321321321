import React from 'react'
import { useDispatch } from 'react-redux'

import { openMenuHandler } from '../../actions/menuActions'

import header from './header.module.scss'
import headerLeftSide from './header.module.scss'
import headerBurgerButton from './header.module.scss'
import styles from './header.module.scss'


import { Title, ConnectionStatus } from '../'

export function Header({ title }) {
  const dispatch = useDispatch()

  const openMenu = () => {
    dispatch(openMenuHandler(true))
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerLeftSide}>
        <button onClick={openMenu} className={styles.headerBurgerButton}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Title level={1}>{title}</Title>
      </div>
      <ConnectionStatus />
    </header>
  )
}
