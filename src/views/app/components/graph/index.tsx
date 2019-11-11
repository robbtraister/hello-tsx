'use strict'

import React from 'react'

function x (v) {
  return 3 * v
}

function y (v) {
  return -2 * v
}

const mockData = [
  [0, 10],
  [20, 25],
  [40, 35],
  [60, 40],
  [80, 50],
  [100, 75]
]

const Graph = ({ data = mockData, xLabel = 'time', yLabel = 'money' }) => {
  const line = data.map(([px, py]) => `${x(px)},${y(py)}`).join('L')

  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='-20 -205 325 225'>
      <g clipPath='inset(0)'>
        <g>
          <path d={`M${x(100)},${y(0)}h-${x(100)}L${line}z`} fill='#cfc' />
          <path d={`M${line}`} stroke='#080' strokeWidth='3' fill='none' />
          <animateTransform
              attributeName='transform'
              type='scale'
              values='1 0 ; 1 1'
              keyTimes='0 ; 1'
              calcMode='spline'
              keySplines='0.5 0 0.5 1'
              dur='1s'
              />
        </g>
        <path d={`M${x(0)},${y(0)}h${x(100)}v${y(100)}h-${x(100)}z`} strokeWidth='2' stroke='#333' fill='none' />
      </g>
      <g x='0' y='0' fontSize='18'>
        <text textAnchor='middle' transform='translate(150 18)'>{xLabel}</text>
        <text textAnchor='middle' transform='rotate(-90) translate(100 -5)'>{yLabel}</text>
      </g>
    </svg>
  )
}

export default Graph
