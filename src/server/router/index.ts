'use strict'

import api from './api'
import assets from './assets'
import auth from './auth'
import render from './render'

export default function router (options) {
  return [].concat(
    assets(options),
    auth(options),
    api(options),
    render(options)
  )
}
