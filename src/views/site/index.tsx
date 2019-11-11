'use strict'

import React from 'react'

import './styles.scss'

const Site = ({ title, App, Styles }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta name='viewport' content='width=device-width' />
      <Styles />
    </head>
    <body>
      <App />
    </body>
  </html>
)

export default Site
