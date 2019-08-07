'use strict'

export default class Unauthorized extends Error {
  status: number

  constructor () {
    super('Unauthorized')
    this.status = 403
  }
}
