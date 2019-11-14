'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import styles from './styles.scss'

const Widget = ({ children, className }) => (
  <div className={`${styles.widget} ${className || ''}`.trim()}>{children}</div>
)

Widget.propTypes = {
  className: PropTypes.string
}

export default Widget
