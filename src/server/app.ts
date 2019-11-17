'use strict'

import compression from 'compression'
import express from 'express'

import router from './router'

import env from '~/env'

export default function app(options: Options = {}) {
  const app = express()

  app.disable('x-powered-by')

  app.use(compression())

  app.use(router(Object.assign({}, env, options)))

  app.use(
    (err, req, res, next) => {
      if (
        err &&
        err.location &&
        err.statusCode &&
        err.statusCode >= 300 &&
        err.statusCode < 400
      ) {
        res.redirect(err.location)
      } else {
        next(err)
      }
    },
    (err, req, res, next) => {
      console.error(err)
      next(err)
    },
    options.isProd
      ? (err, req, res, next) => {
          res.sendStatus(err.statusCode || 500)
        }
      : (err, req, res, next) => {
          res.status(err.statusCode || 500).send(err.message || err.body || err)
        }
  )

  return app
}
