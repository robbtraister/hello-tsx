'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import Body from './components/body'
import Footer from './components/footer'
import Header from './components/header'
import Router from './router'

import uniqueIdContext from './contexts/ids'
import userContext from './contexts/user'

const App = () => (
  <uniqueIdContext.Provider value={{ id: 0 }}>
    <userContext.Provider value={null}>
      <Header />
      <Body>
        <Router />
      </Body>
      <Footer />
    </userContext.Provider>
  </uniqueIdContext.Provider>
)

App.propTypes = {
  user: PropTypes.any,
  store: PropTypes.any
}

export default App
