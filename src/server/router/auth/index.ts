'use strict'

import { Router } from 'express'
import passport from 'passport'

import google from './google'
import jwt from './jwt'

import { Redirect, Unauthenticated } from '../../errors'

passport.serializeUser(function (user, done) {
  done(null, JSON.stringify(user))
})

passport.deserializeUser(function (token, done) {
  done(null, JSON.parse(token))
})

export default function router (options: {
  auth: { cookie: string; secret: string; google?: object }
}) {
  const router = Router()

  router.use(/(\/auth)?\/(log|sign)out/, (req, res, next) => {
    res.clearCookie(options.auth.cookie)
    next(new Redirect('/'))
  })

  router.use(passport.initialize({}))

  options.auth.google && router.use('/auth/google', google(options))
  router.use(jwt(options))

  router.use((req, res, next) => {
    if (req.user) {
      next()
    } else {
      next(new Unauthenticated())
    }
  })

  router.use(/(\/auth)?\/use?r/, (req, res, next) => {
    req.query.jsonp && /^[$_a-z][$_a-z0-9]*$/i.test(req.query.jsonp)
      ? res.send(`/**/;${req.query.jsonp}(${JSON.stringify(req.user)})`)
      : res.send({ user: req.user })
  })

  return router
}
