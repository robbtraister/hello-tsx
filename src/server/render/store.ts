'use strict'

const { unpack } = require('../../utils')

module.exports = {
  __esModule: true,
  default: () => ({})
}

try {
  /**
   * if used in a fork, this import will loopback on itself
   * we have to define the export above to ensure that it is available before making this request
   * if using the CLI, this will attempt to load a project-specific store module
   */
  module.exports.default = unpack(require('~/src/server/render/store'))
} catch (_) {}
