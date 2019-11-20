'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import styles from './styles.scss'

import Input from '../input'

const mockData = {
  savings: [
    [0, 0],
    [50, 50],
    [50, 0],
    [150, 100],
    [150, 0],
    [300, 150]
  ],
  debt: [
    [0, -120],
    [120, -40],
    [120, -100],
    [240, -30],
    [240, -50],
    [300, -20]
  ]
}

const ToggleButton = ({ initialMode, value }) => (
  <Input
    label={value}
    type="radio"
    name="mode"
    value={value}
    defaultChecked={initialMode === value}
  />
)

ToggleButton.propTypes = {
  initialMode: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
}

const Retirement = ({ data = mockData, initialMode = 'both' }) => (
  <form style={{ textAlign: 'center' }}>
    <ToggleButton initialMode={initialMode} value="savings" />
    <ToggleButton initialMode={initialMode} value="both" />
    <ToggleButton initialMode={initialMode} value="debt" />

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 -205 325 225">
      <defs>
        <linearGradient id="pink" x1="0%" y1="0%" x2="100%" y2="0%">
          {data.savings.map((datum, idx) => (
            <stop
              key={idx}
              offset={`${datum[0] / 3}%`}
              style={{
                stopColor: `rgb(255,${255 * (1 - datum[1] / 150)},255)`,
                stopOpacity: 1
              }}
            />
          ))}
        </linearGradient>
        <linearGradient id="aqua" x1="0%" y1="0%" x2="100%" y2="0%">
          {data.debt.map((datum, idx) => (
            <stop
              key={idx}
              offset={`${datum[0] / 3}%`}
              style={{
                stopColor: `rgb(${255 * (1 + datum[1] / 120)},255,255)`,
                stopOpacity: 1
              }}
            />
          ))}
        </linearGradient>
      </defs>
      <g clipPath="inset(0)">
        <g
          className={`${styles.grid}`}
          style={{ transform: 'translate(0,-100px) scaleY(0.5)' }}>
          <g transform="scale(1 0)">
            <g fill="url(#pink)" strokeWidth="0" className={styles.savings}>
              <g className={styles.area}>
                <path
                  d={`M0,0${data.savings
                    .map(datum => `L${datum[0]},${-datum[1]}`)
                    .join('')}L300,0z`}
                />
              </g>
              <g className={styles.line}>
                <path d="M0,0v-10h300v10z" />
              </g>
            </g>
            <g fill="url(#aqua)" strokeWidth="0" className={styles.debt}>
              <g className={styles.area}>
                <path
                  d={`M0,0${data.debt
                    .map(datum => `L${datum[0]},${-datum[1]}`)
                    .join('')}L300,0z`}
                />
              </g>
              <g className={styles.line}>
                <path d="M0,0v10h300v-10z" />
              </g>
            </g>
            <animateTransform
              attributeName="transform"
              type="scale"
              from="1 0"
              to="1 1"
              begin="0s"
              dur="1s"
              fill="freeze"
            />
          </g>
        </g>
        <path
          d="M0,0h300v-200h-300z"
          strokeWidth="2"
          stroke="#555"
          fill="none"
        />
      </g>
    </svg>
  </form>
)

Retirement.propTypes = {
  data: PropTypes.shape({
    debt: PropTypes.array,
    savings: PropTypes.array
  }),
  initialMode: PropTypes.string
}

export default Retirement
