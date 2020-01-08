'use strict'

/* global test */

import assert from 'assert'

import request from 'supertest'

import app from '../src/server/app'

test('redirect', () => {
  return request(app({ auth: null }))
    .get('/')
    .expect(302)
    .then(res => {
      assert.strictEqual(res.header.location, '/dashboard')
    })
})

test('favicon', () => {
  return request(app({ auth: null }))
    .get('/favicon.ico')
    .expect(200)
})

test('favicon', () => {
  return request(app({ auth: null, projectRoot: null }))
    .get('/favicon.ico')
    .expect(200)
})

test('uri', () => {
  return request(app({ auth: null }))
    .get('/api/uri')
    .expect(200)
    .expect('Content-Type', /^application\/json(;|$)/)
    .then(res => {
      assert.strictEqual(res.body.uri, '/api/uri')
    })
})

test('asset 404', () => {
  return request(app({ auth: null, projectRoot: null }))
    .get('/dist/does-not-exist')
    .expect(404)
})

test('logging 400', () => {
  return request(app({ auth: null, logging: true }))
    .get('/api/error/400')
    .expect(400)
})

test('logging 500', () => {
  return request(app({ auth: null, logging: true }))
    .get('/api/error')
    .expect(500)
})

test('production 400', () => {
  return request(app({ auth: null, isProd: true }))
    .get('/api/error/400')
    .expect(400)
})

test('production 500', () => {
  return request(app({ auth: null, isProd: true }))
    .get('/api/error')
    .expect(500)
})

test('csrf', () => {
  return request(app({ auth: null }))
    .get('/api/csrf')
    .expect(200)
    .expect('Content-Type', /^application\/json(;|$)/)
    .then(res => {
      const csrfToken = res.body.csrf
      const csrfCookie = res.header['set-cookie']
        .shift()
        .split(';')
        .shift()

      assert.strictEqual(typeof csrfToken, 'string')

      return request(app({ auth: null }))
        .post(`/api/uri?_csrf=${csrfToken}`)
        .set('Cookie', csrfCookie)
        .expect(200)
    })
})

test('unauthorized', () => {
  return request(
    app({
      auth: {
        cookie: 'jwt-token',
        secret: 'secret',
        providers: { google: { clientID: 'abc', clientSecret: 'def' } }
      }
    })
  )
    .get('/api/uri')
    .expect(401)
})

test('google', () => {
  return request(
    app({
      auth: {
        cookie: 'jwt-token',
        secret: 'secret',
        providers: { google: { clientID: 'abc', clientSecret: 'def' } }
      }
    })
  )
    .get('/auth/google')
    .expect(302)
})

test('logout', () => {
  return request(
    app({
      auth: {
        cookie: 'jwt-token',
        secret: 'secret',
        providers: { google: { clientID: 'abc', clientSecret: 'def' } }
      }
    })
  )
    .get('/auth/logout')
    .expect(302)
})
