'use strict'

const { unpack } = require('../../../utils')

module.exports = {
  __esModule: true,
  default: options => []
}

try {
  module.exports.default = unpack(require('~/src/server/router/api'))
} catch (_) {}
