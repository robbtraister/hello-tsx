'use strict'

import React, { PureComponent } from 'react'

function formatDollars (value) {
  const negative = value < 0
  const [dollars, cents] = Math.abs(value)
    .toFixed(2)
    .split('.')
  const result = `$${dollars.replace(/\d(?=(\d{3})+$)/g, '$&,')}.${cents}`
  return negative ? `(${result})` : result
}

class Transaction extends PureComponent {
  render () {
    return (
      <table>
        <tbody>
          <tr>
            <td>{this.props.account}</td>
            <td>{this.props.title}</td>
            <td>{formatDollars(this.props.amount)}</td>
          </tr>
        </tbody>
      </table>
    )
  }
}

export default Transaction
