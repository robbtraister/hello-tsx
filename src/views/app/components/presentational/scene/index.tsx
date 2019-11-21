'use strict'

import React from 'react'

import Title from '../title'
import Widget from '../widget'

const Scene = (Component, name) => {
  const WrappedComponent = props => (
    <>
      <Widget>
        <Title>{name || Component.name}</Title>
      </Widget>
      <Component {...props} />
    </>
  )

  return WrappedComponent
}

export default Scene
