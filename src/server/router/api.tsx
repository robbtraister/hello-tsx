'use strict'

import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'

import { Server as ServerError } from '../errors'

import Graph from '~/src/views/app/components/presentational/graph'
import Meter from '~/src/views/app/components/presentational/meter'

export default function router(options) {
  const apiRouter = express()

  apiRouter.use('/csrf', (req, res, next) => {
    res.send({ csrf: req.csrfToken() })
  })

  apiRouter.use('/uri', (req, res, next) => {
    res.send({ uri: req.originalUrl })
  })

  apiRouter.use(['/error/:code(\\d+)', '/error'], (req, res, next) => {
    next(new ServerError(+req.params.code || 500))
  })

  apiRouter.use('/meter', (req, res, next) => {
    try {
      const props = {
        value: +req.query.value || +req.query.v,
        total: +req.query.total || +req.query.t || 100,
        title: req.query.title,
        color: req.query.color
      }
      res.set('Content-Type', 'image/svg+xml')
      res.send(ReactDOM.renderToStaticMarkup(<Meter {...props} />))
    } catch (e) {
      next(e)
    }
  })

  apiRouter.use('/graph', (req, res, next) => {
    try {
      const props = {
        xLabel: req.query.xLabel,
        yLabel: req.query.yLabel
      }
      res.set('Content-Type', 'image/svg+xml')
      res.send(ReactDOM.renderToStaticMarkup(<Graph {...props} />))
    } catch (e) {
      next(e)
    }
  })

  return apiRouter
}
