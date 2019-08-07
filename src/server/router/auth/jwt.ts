'use strict'

import cookieParser from 'cookie-parser'
import jsonwebtoken from 'jsonwebtoken'
import passport from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'

import { Redirect } from '../../errors'

const algorithm = 'HS512'
const JWT_NAME = 'jwt'

export function authenticate (
  strategy,
  options: { cookie: string; secret: string; successRedirect?: any }
) {
  const { cookie, secret } = options

  const successRedirect = !options.successRedirect
    ? null
    : options.successRedirect instanceof Function
    ? options.successRedirect
    : () => options.successRedirect

  return (req, res, next) => {
    if (req.user) {
      next()
    } else {
      passport.authenticate(strategy, options, (err, user) => {
        if (err) {
          next(err)
        } else if (user) {
          req.user = user
          const token = jsonwebtoken.sign({ usr: req.user }, secret, {
            algorithm
          })
          res.cookie(cookie, token, {
            httpOnly: true
          })
          successRedirect ? next(new Redirect(successRedirect(req))) : next()
        } else {
          next()
        }
      })(req, res, next)
    }
  }
}

export default (options: { auth: { cookie: string; secret: string } }) => {
  passport.use(
    JWT_NAME,
    new JwtStrategy(
      {
        secretOrKey: options.auth.secret,
        jwtFromRequest: req =>
          req && req.cookies && req.cookies[options.auth.cookie],
        algorithms: [algorithm]
      },
      function (payload, done) {
        done(null, payload.usr)
      }
    )
  )

  return [cookieParser(), authenticate(JWT_NAME, options.auth)]
}
