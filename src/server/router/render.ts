'use strict'

import renderSite from '../render'

export default function (options) {
  async function render (req, res, next) {
    try {
      res.send(
        await renderSite({
          appId: options.appId,
          appTitle: options.appTitle,
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
      if (err && err.statusCode) {
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
    }
  ]
}
