'use strict'

import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './styles.scss'

export default function TabLink ({ children, className, tab, to }) {
  return (
    <NavLink
      className={[styles.tab]
        .concat(className || [])
        .filter(c => c)
        .join(' ')}
      to={to || `/${tab}`}
    >
      {children || tab}
    </NavLink>
  )
}
