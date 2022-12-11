import React from 'react'

import styles from './cardsContainer.module.scss'

export function CardsContainer({ children }) {
  return <div className={styles.stakingCardsContainer}>{children}</div>
}
