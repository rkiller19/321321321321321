import React from 'react'
import classnames from 'classnames'

import h1 from './title.module.scss'
import h2 from './title.module.scss'
import h3 from './title.module.scss'
import h4 from './title.module.scss'
import h5 from './title.module.scss'
import h6 from './title.module.scss'
import styles from './title.module.scss'

export function Title({ level, children, className, ...props }) {
  let TitleTag
  let levelClassName

  switch (level) {
    case 1:
      TitleTag = 'h1'
      levelClassName = styles.h1
      break
    case 2:
      TitleTag = 'h2'
      levelClassName = styles.h2
      break
    case 3:
      TitleTag = 'h3'
      levelClassName = styles.h3
      break
    case 4:
      TitleTag = 'h4'
      levelClassName = styles.h4
      break
    case 5:
      TitleTag = 'h5'
      levelClassName = styles.h5
      break
    case 6:
      TitleTag = 'h6'
      levelClassName = styles.h6
      break
    default:
      TitleTag = 'span'
  }

  const classNames = classnames(levelClassName, className)

  return (
    <TitleTag className={styles.classNames} {...props}>
      {children}
    </TitleTag>
  )
}
