'use strict'

import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import Title from '../title'
import Widget from '../widget'

const Scene = ({ title, children }) => {
  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <>
      <Widget>
        <Title>{title}</Title>
      </Widget>
      {children}
    </>
  )
}

Scene.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired
}

export default Scene
