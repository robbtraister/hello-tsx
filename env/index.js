'use strict'

const path = require('path')

const projectRoot = path.resolve(
  process.env.PROJECT_ROOT || path.join(__dirname, '..')
)

require('dotenv').config({ path: path.join(projectRoot, '.env') })

const isProd = /^prod/i.test(process.env.NODE_ENV)

function getConfigs () {
  try {
    return require(path.resolve(projectRoot, 'package.json')).composition || {}
  } catch (_) {}
  return {}
}

const configs = getConfigs()

const google = process.env.GOOGLE_CLIENT_ID
  ? {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET
  }
  : null

const port = Number(process.env.PORT) || Number(configs.port) || 8080

module.exports = {
  app: {
    fileLimit:
      Number(process.env.FILE_LIMIT) || Number(configs.fileLimit) || 16 * 1024,
    id: process.env.APP_ID || (configs.app && configs.app.id) || 'app',
    title: process.env.APP_TITLE || (configs.app && configs.app.title) || ''
  },
  auth: {
    cookie:
      process.env.COOKIE ||
      (configs.auth && configs.auth.cookie) ||
      'jwt-token',
    secret: process.env.SECRET,
    google
  },
  host: process.env.HOST || configs.host || `http://localhost:${port}`,
  isProd,
  port,
  projectRoot,
  workerCount:
    Number(process.env.WORKER_COUNT) ||
    Number(configs.workerCount) ||
    require('os').cpus().length
}
