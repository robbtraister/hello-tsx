'use strict'

export default class Unauthenticated extends Error {
  status: number

  constructor () {
    super('Unauthenticated')
    this.status = 401
  }
}
