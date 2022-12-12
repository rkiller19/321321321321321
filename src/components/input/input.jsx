import React from 'react'
import classnames from 'classnames'

import input from './input.module.scss'
import styles from './input.module.scss'

export function Input({ className, ...props }) {
  const classNames = classnames(styles.input, className)

  return <input className={classNames} {...props} />
}
