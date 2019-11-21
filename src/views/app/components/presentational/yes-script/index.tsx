'use strict'

import PropTypes from 'prop-types'
import React from 'react'

const YesScript = ({ children, ...props }) => (
  <div {...props} className="yes-script">
    {children}
  </div>
)

YesScript.propTypes = {
  children: PropTypes.node
}

export default YesScript
