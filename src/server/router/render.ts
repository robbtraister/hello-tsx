'use strict'

import path from 'path'

import renderSite from '../render'

export default function (options) {
  async function render (req, res, next) {
    try {
      const user = req.user

      res.send(
        await renderSite({
          appId: options.app.id,
          appTitle: options.app.title,
          location: req.originalUrl,
          projectRoot: options.projectRoot,
          status: res.statusCode || 200,
          user
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
        res.status(err.statusCode)
        // just propagate the original error
        await render(req, res, () => next(err))
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
