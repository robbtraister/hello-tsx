'use strict'

import React from 'react'

import Footer from '../footer'
import Header from '../header'

import styles from './styles.scss'

const Layout = ({ children, tabs }) => (
  <div className={styles.container}>
    <Header tabs={tabs} />
    <div className={styles.body}>
      <div className={styles.main}>{children}</div>
    </div>
    <Footer />
  </div>
)

export default Layout
