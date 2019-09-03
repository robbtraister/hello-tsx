'use strict'

/* global expect, test */

import env from '.'

test('verify env', () => {
  expect(env.app.id).toBe('app')
  expect(env.auth.cookie).toBe('jwt-token')
  expect(env.port).toBe(8080)
})
