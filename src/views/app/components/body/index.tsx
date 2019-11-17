'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import styles from './styles.scss'

const Body = ({ children }) => (
  <div className={styles.body}>
    <div className={styles.container}>{children}</div>
  </div>
)

Body.propTypes = {
  children: PropTypes.node
}

export default Body
