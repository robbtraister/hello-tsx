'use strict'

import React from 'react'

import Scene from '../../components/presentational/scene'
import Widget from '../../components/presentational/widget'

const Profile = () => (
  <Scene title="Profile">
    <Widget>
      <a href="/logout">logout</a>
    </Widget>
  </Scene>
)

export { Profile }
