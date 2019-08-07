'use strict'

const path = require('path')

const compression = require('compression')
const express = require('express')

const { projectRoot } = require('../../env')

function unpack (mod) {
  return mod && mod.__esModule && mod.default ? mod.default : mod
}

function getMiddlewares (options) {
  const router = unpack(require(path.join(projectRoot, 'build', 'router')))

  return [].concat(
    ...[].concat(router || []).map(middleware => middleware(options))
  )
}

function app (options) {
  const app = express()

  app.disable('x-powered-by')

  app.use(compression())

  if (options.isProd) {
    app.use(getMiddlewares(options))
  } else {
    app.use((req, res, next) => {
      // clear require cache
      Object.keys(require.cache)
        .filter(mod => !/[\\/]node_modules[\\/]/.test(mod))
        .forEach(mod => {
          delete require.cache[mod]
        })

      getMiddlewares(options)
        .reverse()
        .reduce(
          (next, middleware) => err => {
            const isErrorHandler = middleware.length === 4
            if (err) {
              if (isErrorHandler) {
                middleware(err, req, res, next)
              } else {
                next(err)
              }
            } else {
              if (isErrorHandler) {
                next()
              } else {
                middleware(req, res, next)
              }
            }
          },
          next
        )()
    })
  }

  app.use(
    function redirectHandler (err, req, res, next) {
      if (err.location && err.status >= 300 && err.status < 400) {
        res.redirect(err.location)
      } else {
        next(err)
      }
    },
    function errorLogger (err, req, res, next) {
      console.error(err)
      next(err)
    },
    options.isProd
      ? function failHandler (err, req, res, next) {
        res.sendStatus(err.status || 500)
      }
      : function failHandler (err, req, res, next) {
        res.status(err.status || 500).send(err.message || err.body || err)
      }
  )

  return app
}

module.exports = app
