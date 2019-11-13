'use strict'

import express from 'express'
import React from 'react'
import ReactDOM from 'react-dom/server'

import Graph from '~/src/views/app/components/graph'
import Meter from '~/src/views/app/components/meter'

export default function router (options) {
  const apiRouter = express()

  apiRouter.use((req, res, next) => {
    req.user ? next() : res.sendStatus(401)
  })

  apiRouter.use('/uri', (req, res, next) => {
    res.send({ uri: req.originalUrl })
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
