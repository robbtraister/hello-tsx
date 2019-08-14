'use strict'

export default class Redirect extends Error {
  location: string

  status: number

  constructor (location: string, status: number = 302) {
    super(`redirect to: ${location}`)
    this.location = location
    this.status = status
  }
}
