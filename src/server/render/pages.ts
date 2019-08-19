'use strict'

const unpack = mod => (mod && mod.__esModule && mod.default ? mod.default : mod)

const attachName = (mod, name) => {
  const page = unpack(mod)
  page.fileName = name
  return page
}

const Pages = {}

try {
  Pages[200] = attachName(require('../../views/200'), '200')
} catch (e) {}

try {
  Pages[200] = attachName(require('../../views/app'), 'app')
} catch (e) {}

try {
  Pages[401] = attachName(require('../../views/401'), '401')
} catch (e) {}

try {
  Pages[401] = attachName(require('../../views/login'), 'login')
} catch (e) {}

try {
  Pages[403] = attachName(require('../../views/403'), '403')
} catch (e) {}

try {
  Pages[404] = attachName(require('../../views/404'), '404')
} catch (e) {}

module.exports = {
  __esModule: true,
  default: Pages
}
