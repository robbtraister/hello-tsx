'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import styles from './styles.scss'

const Header = ({ children }) => (
  <div className={styles.header}>
    <div className={styles.hatching} />
    <div className={styles.title}>{children}</div>
  </div>
)

Header.propTypes = {
  children: PropTypes.node
}

export default Header
