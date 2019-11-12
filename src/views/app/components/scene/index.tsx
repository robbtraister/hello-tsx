'use strict'

import React from 'react'

import Header from '../../components/header'
import Widget from '../../components/widget'

const Home = (Component, name) => (props) =>
  <>
    <Widget>
      <Header>{name || Component.name}</Header>
    </Widget>
    <Component {...props} />
  </>

export default Home
