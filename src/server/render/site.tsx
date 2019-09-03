'use strict'

const React = require('react')

const { unpack } = require('../../utils')

try {
  module.exports = unpack(require('~/src/views/site'))
} catch (_) {
  const Site = ({ App, Styles }) => (
    <html>
      <head>
        <Styles />
      </head>
      <body>
        <App />
      </body>
    </html>
  )

  module.exports = Site
}
