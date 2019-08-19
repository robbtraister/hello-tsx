'use strict'

const React = require('react')

const unpack = mod => (mod && mod.__esModule && mod.default ? mod.default : mod)

function getSite () {
  try {
    return unpack(require('../../views/site'))
  } catch (e) {
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
    return Site
  }
}

module.exports = {
  __esModule: true,
  default: getSite()
}
