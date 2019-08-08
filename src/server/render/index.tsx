'use strict'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { ServerStyleSheet } from 'styled-components'

import { Redirect } from '../errors'

import App from '../../views/app'
import Login from '../../views/login'
import Site from '../../views/site'

const Components = {
  app: App,
  login: Login
}

const STYLED_COMPONENTS_PLACEHOLDER = 'styled-components'

export default async function renderSite ({
  appId,
  appTitle,
  location,
  user
}: {
  appId: string
  appTitle?: string
  location: string
  user?: object
}) {
  const name: string = user ? 'app' : 'login'
  const Component = Components[name]

  const context: { url?: string } = {}

  const App = ({ appId: propId, ...props }) => (
    <div id={propId || appId}>
      <StaticRouter context={context} location={location}>
        <Component {...props} user={user} />
      </StaticRouter>
    </div>
  )

  const Libs = () =>
    ['runtime', 'common', name]
      .map(key => (
        <script
          defer
          key={key}
          type='application/javascript'
          src={`/dist/${key}.js`}
        />
      ))
      .concat(<script defer key='user' src='/auth/user?jsonp=setUser' />)

  const Styles = () =>
    ['site', 'common', name]
      .map(key => (
        <link
          key={key}
          rel='stylesheet'
          type='text/css'
          href={`/dist/${key}.css`}
        />
      ))
      .concat(React.createElement(STYLED_COMPONENTS_PLACEHOLDER))

  const props = {
    title: appTitle,
    App,
    Libs,
    Styles
  }

  const sheet = new ServerStyleSheet()
  try {
    const html: string = ReactDOM.renderToStaticMarkup(
      sheet.collectStyles(<Site {...props} />)
    )

    if (context.url) {
      throw new Redirect(context.url)
    }

    return `<!DOCTYPE html>${html.replace(
      new RegExp(
        `<${STYLED_COMPONENTS_PLACEHOLDER}></${STYLED_COMPONENTS_PLACEHOLDER}>`,
        'g'
      ),
      sheet.getStyleTags()
    )}`
  } finally {
    sheet.seal()
  }
}
