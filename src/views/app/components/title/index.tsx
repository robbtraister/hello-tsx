'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import styles from './styles.scss'

const Title = ({ children }) => (
  <div className={styles.header}>
    <div className={styles.hatching} />
    <div className={styles.title}>{children}</div>
  </div>
)

Title.propTypes = {
  children: PropTypes.node
}

export default Title
