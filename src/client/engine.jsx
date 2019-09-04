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

const { BrowserRouter } = ReactRouterDOM

let user
window.setUser = function setUser (u) {
  user = u
}

function render (
  Component,
  targetElement = document.getElementById(__DEFAULT_APP_ID__)
) {
  if (Component && targetElement) {
    const originalHTML = targetElement.innerHTML

    try {
      const props = {
        ...(window.__DATA__ || {}),
        user
      }

      ReactDOM.hydrate(
        <BrowserRouter>
          <Component {...props} />
        </BrowserRouter>,
        targetElement
      )
    } catch (e) {
      targetElement.innerHTML = originalHTML
      console.error(e)
    }
  }
}

window.document.addEventListener('DOMContentLoaded', () => render(window.App))
