'use strict'

import React from 'react'

import styles from './styles.scss'

const Header = ({ children }) =>
  <div className={styles.header}>
    <div className={styles.hatching} />
    <div className={styles.title}>{children}</div>
  </div>

export default Header
