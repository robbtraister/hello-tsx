'use strict'

import React from 'react'

import Footer from '../footer'
import Header from '../header'

import { Store } from '../store'

import styles from './styles.scss'

const Layout = ({ children, store, tabs }) => (
  <div className={styles.container}>
    <Store store={store}>
      <Header tabs={tabs} />
      <div className={styles.body}>
        <div className={styles.main}>{children}</div>
      </div>
      <Footer />
    </Store>
  </div>
)

export default Layout
