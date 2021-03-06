'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import './styles.scss'

const Site = ({ title = '', App, Styles }) => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width" />
      <meta name="description" content="HelloWallet in JavaScript" />
      <title>{title}</title>
      <Styles />
      <noscript>
        <style
          dangerouslySetInnerHTML={{ __html: '.yes-script{display:none};' }}
        />
      </noscript>
    </head>
    <body>
      <App />
    </body>
  </html>
)

Site.propTypes = {
  title: PropTypes.string,
  App: PropTypes.elementType,
  Styles: PropTypes.elementType
}

export default Site
