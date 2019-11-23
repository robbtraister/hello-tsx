'use strict'

import React from 'react'
import { RouteChildrenProps } from 'react-router'

import Scene from '../../components/presentational/scene'
import Widget from '../../components/presentational/widget'

const Login = ({ location }: RouteChildrenProps) => {
  const uri = encodeURIComponent(`${location.pathname}${location.search}`)
  return (
    <Scene title="Login">
      <Widget>
        <a href={`/auth/google?redirect=${uri}`}>Google</a>
      </Widget>
      <Widget>
        <a href={`/auth/facebook?redirect=${uri}`}>Facebook</a>
      </Widget>
    </Scene>
  )
}

export { Login }
