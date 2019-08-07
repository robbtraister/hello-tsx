'use strict'

/* global expect, test */

import { Redirect, Unauthenticated, Unauthorized } from '.'

test('verify redirect error', () => {
  const redirect = new Redirect('/home')

  expect(redirect.status).toBe(302)
  expect(redirect.location).toBe('/home')
})

test('verify permanent redirect error', () => {
  const redirect = new Redirect('/home', 301)

  expect(redirect.status).toBe(301)
  expect(redirect.location).toBe('/home')
})

test('verify unauthenticated error', () => {
  const unauthenticated = new Unauthenticated()

  expect(unauthenticated.status).toBe(401)
})

test('verify unauthorized error', () => {
  const unauthorized = new Unauthorized()

  expect(unauthorized.status).toBe(403)
})
