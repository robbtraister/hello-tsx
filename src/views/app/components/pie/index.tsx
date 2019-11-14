'use strict'

import React from 'react'

const Budget = () => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='-125 -125 250 250'>
    <circle
      cx='0'
      cy='0'
      r='100'
      fill='#f00'
      strokeWidth='0'
      clipPath='polygon(50% 50%, 100% 100%, 50% 100%)'
    />
    <circle
      cx='0'
      cy='0'
      r='100'
      fill='#ff0'
      strokeWidth='0'
      clipPath='polygon(50% 50%, 0% 50%, 0% 100%, 50% 100%)'
    />
    <circle
      cx='0'
      cy='0'
      r='100'
      fill='#0f0'
      strokeWidth='0'
      clipPath='polygon(50% 50%, 0% 50%, 0% 0%, 100% 0%)'
    />
    <circle
      cx='0'
      cy='0'
      r='100'
      fill='#00f'
      strokeWidth='0'
      clipPath='polygon(50% 50%, 100% 0%, 100% 100%)'
    />
  </svg>
)

export default Budget
