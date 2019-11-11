'use strict'

import React from 'react'

import Header from '../../components/header'
import Widget from '../../components/widget'

const Home = (Component, name) => () =>
  <>
    <Widget>
      <Header>{name || Component.name}</Header>
    </Widget>
    <Component />
  </>

export default Home
