'use strict'

const { unpack } = require('../../utils')

module.exports = {
  __esModule: true,
  default: unpack(require('./render'))
}

try {
  module.exports.default = unpack(require('~/src/server/render'))
} catch (_) {}
