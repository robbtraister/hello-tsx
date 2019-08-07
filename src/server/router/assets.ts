'use strict'

import path from 'path'

import express from 'express'
import favicon from 'serve-favicon'

export default function assets (options) {
  const router = express.Router()

  try {
    router.use(
      favicon(path.join(options.projectRoot, 'resources', 'favicon.ico'))
    )
  } catch (_) {
    router.all('/favicon.ico', (req, res, next) => {
      res.sendStatus(404)
    })
  }

  router.use('/dist', express.static(path.join(options.projectRoot, 'dist')))
  router.use(
    '/resources',
    express.static(path.join(options.projectRoot, 'resources'))
  )

  router.use(/\/(dist|resources)/, (req, res, next) => {
    res.sendStatus(404)
  })

  return router
}
