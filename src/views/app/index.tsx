'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import Body from './components/presentational/body'
import Footer from './components/presentational/footer'
import Header from './components/presentational/header'
import Router from './router'

import uniqueIdContext from './contexts/ids'
import storeContext from './contexts/store'
import userContext from './contexts/user'

import mockData from './data.json'

const App = ({ user }) => (
  <uniqueIdContext.Provider value={{ id: 0 }}>
    <userContext.Provider value={user}>
      <storeContext.Provider value={mockData}>
        <Header />
        <Body>
          <Router />
        </Body>
        <Footer />
      </storeContext.Provider>
    </userContext.Provider>
  </uniqueIdContext.Provider>
)

App.propTypes = {
  user: PropTypes.any,
  store: PropTypes.any
}

export default App
