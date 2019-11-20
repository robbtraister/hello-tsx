'use strict'

import React from 'react'

import Title from '../../components/title'
import Widget from '../../components/widget'

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
