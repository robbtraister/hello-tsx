'use strict'

import React from 'react'

const YesScript = ({ children, ...props }) => (
  <div {...props} className='yes-script'>
    {children}
  </div>
)

export default YesScript
