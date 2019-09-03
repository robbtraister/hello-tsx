'use strict'

const { unpack } = require('../../../utils')

module.exports = {
  __esModule: true,
  default: options => []
}

try {
  /**
   * if used in a fork, this import will loopback on itself
   * we have to define the export above to ensure that it is available before making this request
   * if using the CLI, this will attempt to load a project-specific api module
   */
  module.exports.default = unpack(require('~/src/server/router/api'))
} catch (_) {}
