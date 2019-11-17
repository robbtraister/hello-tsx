'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import './styles.scss'

const Site = ({ title = '', App, Styles }) => (
  <html>
    <head>
      <title>{title}</title>
      <meta name="viewport" content="width=device-width" />
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
