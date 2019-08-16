'use strict'

/* global window, __DEFAULT_APP_ID__ */

import PropTypes from 'prop-types'
import React from 'react'
import ReactDOM from 'react-dom'
import * as ReactRouterDOM from 'react-router-dom'

window.PropTypes = PropTypes
window.React = React
window.ReactDOM = ReactDOM
window.ReactRouterDOM = ReactRouterDOM

let user
window.setUser = function setUser (u) {
  user = u
}

function render (Component, appId = __DEFAULT_APP_ID__) {
  function renderComponent () {
    const targetElement = document.getElementById(appId)

    if (targetElement) {
      const originalHTML = targetElement.innerHTML

      try {
        const props = {
          user
        }

        ReactDOM.hydrate(
          <ReactRouterDOM.BrowserRouter>
            <Component {...props} />
          </ReactRouterDOM.BrowserRouter>,
          targetElement
        )
      } catch (e) {
        targetElement.innerHTML = originalHTML
        console.error(e)
      }
    }
  }

  window.document.addEventListener('DOMContentLoaded', renderComponent)
}

export default render
