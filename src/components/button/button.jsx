import React from 'react'
import classnames from 'classnames'

import button from './button.module.scss'
import buttonDisabled from './button.module.scss'
import styles from './button.module.scss'

export function Button({ children, type, disabled, className, ...props }) {
  const classNames = classnames(className, button, {
    [buttonDisabled]: disabled,
  })

  return (
    <button className={styles.classNames} {...props}>
      {children}
    </button>
  )
}
