'use strict'

import path from 'path'

import renderSite from '../render'

export default function (options) {
  async function render (req, res, next) {
    try {
      res.send(
        await renderSite({
          appId: options.app.id,
          appTitle: options.app.title,
          location: req.originalUrl,
          projectRoot: options.projectRoot,
          status: res.statusCode || 200,
          user: req.user
        })
      )
    } catch (err) {
      next(err)
    }
  }

  return [
    render,
    async (err, req, res, next) => {
      // ignore redirect errors
      if (err && err.statusCode && err.statusCode >= 400) {
        try {
          res.status(err.statusCode)
          await render(req, res, next)
        } catch (_) {
          // just propagate the original error
          next(err)
        }
      } else {
        next(err)
      }
    },
    (req, res, next) => {
      res.sendFile(
        path.join(options.projectRoot, 'dist', 'index.html'),
        err => {
          if (err) next()
        }
      )
    }
  ]
}
