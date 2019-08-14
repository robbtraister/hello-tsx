'use strict'

const app = require('./app')

const defaults = require('../env')

function server (options = defaults) {
  return app(options).listen(options.port, err =>
    err ? console.error(err) : console.log(`Listening on port: ${options.port}`)
  )
}

module.exports = server

if (module === require.main) {
  server()
}
