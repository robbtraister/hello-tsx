'use strict'

import { Router } from 'express'

import { guidance, profile, score, txs } from '../../api'

function api (options) {
  const router = Router()

  router.get('/guidance', (req, res, next) => {
    res.send({ guidance: guidance(req.user) })
  })

  router.get('/profile', (req, res, next) => {
    res.send({ profile: profile(req.user) })
  })

  router.get('/score', (req, res, next) => {
    res.send({ score: score(req.user) })
  })

  router.get('/txs', (req, res, next) => {
    res.send({ txs: txs(req.user) })
  })

  return router
}

export function router (options) {
  const router = Router()

  router.use('/api', api(options))

  return router
}

export default router
