'use strict'

/* global expect, test */

import env from '.'

test('verify env', () => {
  expect(env.appId).toBe('app')
  expect(env.auth.cookie).toBe('jwt-token')
  expect(env.port).toBe(8080)
})
