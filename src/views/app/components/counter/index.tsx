'use strict'

import PropTypes from 'prop-types'
import React, { useState } from 'react'

const Counter = ({ right }) => {
  const [count, setCount] = useState(0)

  const inc = () => setCount(count => count + 1)

  return (
    <div style={{ textAlign: right ? 'right' : 'left' }}>
      <button onClick={inc}>inc</button>: {count}
    </div>
  )
}

Counter.propTypes = {
  right: PropTypes.bool
}

export default Counter
