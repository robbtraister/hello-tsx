'use strict'

import React from 'react'

import styles from './styles.scss'

const Body = ({ children }) =>
  <div className={styles.body}>
    <div className={styles.container}>
      {children}
    </div>
  </div>

export default Body
