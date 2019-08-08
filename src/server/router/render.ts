'use strict'

import renderSite from '../render'

export default function render (options) {
  async function renderer (req, res, next) {
    try {
      res.send(
        await renderSite({
          appId: options.appId,
          appTitle: options.appTitle,
          location: req.originalUrl,
          user: req.user
        })
      )
    } catch (err) {
      next(err)
    }
  }

  return [
    renderer,
    async (err, req, res, next) => {
      if (err.status === 401) {
        try {
          res.status(err.status)
          await renderer(req, res, next)
        } catch (_) {
          // just propagate the original error
          next(err)
        }
      } else {
        next(err)
      }
    }
  ]
}
