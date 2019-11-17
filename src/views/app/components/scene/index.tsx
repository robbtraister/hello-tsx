'use strict'

import React from 'react'

import Header from '../../components/header'
import Widget from '../../components/widget'

const Scene = (Component, name) => {
  const WrappedComponent = props => (
    <>
      <Widget>
        <Header>{name || Component.name}</Header>
      </Widget>
      <Component {...props} />
    </>
  )

  return WrappedComponent
}

export default Scene
