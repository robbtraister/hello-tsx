'use strict'

const { unpack } = require('../../utils')

const attachName = (mod, name) => {
  const page = unpack(mod)
  page.fileName = name
  return page
}

const Pages = {}

try {
  Pages[200] = attachName(require('~/src/views/200'), '200')
} catch (e) {}

try {
  Pages[200] = attachName(require('~/src/views/app'), 'app')
} catch (e) {}

try {
  Pages[401] = attachName(require('~/src/views/401'), '401')
} catch (e) {}

try {
  Pages[401] = attachName(require('~/src/views/login'), 'login')
} catch (e) {}

try {
  Pages[403] = attachName(require('~/src/views/403'), '403')
} catch (e) {}

try {
  Pages[404] = attachName(require('~/src/views/404'), '404')
} catch (e) {}

module.exports = Pages
