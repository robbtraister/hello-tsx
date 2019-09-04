'use strict'

import React from 'react'

import { body } from './styles.scss'

const Site = ({ App, Styles }) => (
  <html>
    <head>
      <Styles />
    </head>
    <body className={body}>
      <App />
    </body>
  </html>
)

export default Site
