'use strict'

const fs = require('fs')
const path = require('path')

function getProjectRoot (base = '.') {
  if (fs.existsSync(path.join(base, 'package.json'))) {
    return path.resolve(base)
  }
  const nextBase = path.resolve(base, '..')
  if (nextBase === base) {
    return false
  }
  return getProjectRoot(nextBase)
}

const packageRoot = path.resolve(__dirname, '..')
const projectRoot = path.resolve(
  process.env.PROJECT_ROOT || getProjectRoot('.') || '.'
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
  packageRoot,
  port,
  projectRoot,
  workerCount:
    Number(process.env.WORKER_COUNT) ||
    Number(configs.workerCount) ||
    require('os').cpus().length
}
