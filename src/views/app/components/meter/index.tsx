'use strict'

import PropTypes from 'prop-types'
import React from 'react'

function getRotation (pct) {
  return pct * 260 - 130
}

const Meter = ({ value, total = 100, title, color = '#3a3' }) => {
  const pct = Math.max(Math.min(value / total, 1), 0)

  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='-125 -125 250 235'>
      <g transform='rotate(-45)' fill='none' strokeWidth='20'>
        <path d='M-100 0A100 100 0 0 1 0 -100' stroke='#f80' />
        <path d='M0 -100A100 100 0 0 1 100 0' stroke='#ff0' />
        <path d='M100 0A100 100 0 0 1 0 100' stroke='#0f0' />
      </g>
      <g style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif" }}>
        <g textAnchor='middle'>
          <text x='0' y='-5' fontSize='72'>{value}</text>
          <text x='0' y='25' fontSize='18'>out of</text>
          <text x='0' y='55' fontSize='36'>{total}</text>
        </g>
        {title &&
          <g transform='translate(0 65)'>
            <g fill={color} stroke='#fff' strokeWidth='2'>
              <path d='M-100 -8h40v30h-40l10 -15z' />
              <path d='M100 -8h-40v30h40l-10 -15z' />
              <path d='M-80 0v30h160v-30z' />
            </g>
            <text x='0' y='20' textAnchor='middle' fill='#fff' style={{ 'textTransform': 'uppercase' }}>{title}</text>
          </g>
        }
      </g>
      <path d='M0 -100l-10 -20h20z' stroke='#eee' strokeWidth='2' fill='#444' transform={`rotate(${getRotation(pct)})`}>
        <animateTransform
          attributeName='transform'
          type='rotate'
          values={`-135 0 0 ; ${getRotation(pct)} 0 0 ; ${getRotation(0.8 * pct)} 0 0 ; ${getRotation(pct)} 0 0 ; ${getRotation(0.95 * pct)} 0 0 ; ${getRotation(pct)} 0 0`}
          keyTimes='0 ; 0.4 ; 0.6 ; 0.8 ; 0.9 ; 1'
          calcMode='spline'
          keySplines='0.5 0 1 0.5 ; 0 0.5 0.5 1 ; 0.5 0 1 0.5 ; 0 0.5 0.5 1 ; 0.5 0 1 0.5'
          dur='1s'
          />
      </path>
    </svg>
  )
}

Meter.propTypes = {
  value: PropTypes.number.isRequired,
  total: PropTypes.number,
  title: PropTypes.string,
  color: PropTypes.string
}

export default Meter
