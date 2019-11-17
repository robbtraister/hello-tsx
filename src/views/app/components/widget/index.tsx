'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import styles from './styles.scss'

const Widget = ({ children, className = '', ...props }) => (
  <div className={`${styles.widget} ${className || ''}`.trim()} {...props}>
    {children}
  </div>
)

Widget.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
}

export default Widget
