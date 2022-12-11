import React from 'react'

import spinner from './spinner.module.scss'
import spinnerInner from './spinner.module.scss'
import styles from './spinner.module.scss'

export function Spinner() {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinnerInner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}
