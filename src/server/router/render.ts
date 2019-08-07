'use strict'

import renderSite from '../render'

export default function render (options) {
  async function renderer (req, res, next) {
    try {
      res.send(
        await renderSite({
          location: req.originalUrl,
          title: options.appTitle,
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
      if ([401, 403].includes(err.status)) {
        try {
          await renderer(req, res, next)
        } catch (e) {
          next(e)
        }
      } else {
        next(err)
      }
    }
  ]
}
