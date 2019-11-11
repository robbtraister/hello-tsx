'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import Body from './components/body'
import Footer from './components/footer'
import Nav from './components/nav'
import Router from './router'

import userContext from './contexts/user'

const App = () =>
  <userContext.Provider value={null}>
    <Nav />
    <Body>
      <Router />
    </Body>
    <Footer />
  </userContext.Provider>

App.propTypes = {
  user: PropTypes.any,
  store: PropTypes.any
}

export default App
