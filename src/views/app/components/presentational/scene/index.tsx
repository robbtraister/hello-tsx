'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import Title from '../title'
import Widget from '../widget'

const Scene = ({ title, children }) => (
  <>
    <Widget>
      <Title>{title}</Title>
    </Widget>
    {children}
  </>
)

Scene.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}

export default Scene
