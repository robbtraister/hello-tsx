'use strict'

import path from 'path'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { ServerStyleSheet } from 'styled-components'

import { readFile } from '../utils/promises'

import { Redirect } from '../errors'

import App from '../../views/app'
import Login from '../../views/login'
import Site from '../../views/site'

const Components = {
  app: App,
  login: Login
}

const STYLED_COMPONENTS_PLACEHOLDER = 'styled-components'
const STYLED_COMPONENTS_PATTERN = new RegExp(
  `<${STYLED_COMPONENTS_PLACEHOLDER}></${STYLED_COMPONENTS_PLACEHOLDER}>`,
  'g'
)

const getScriptTag = key => (
  <script
    defer
    key={key}
    type='application/javascript'
    src={`/dist/${key}.js`}
  />
)

export default async function renderSite ({
  appId,
  appTitle,
  location,
  projectRoot,
  store,
  user
}: {
  appId: string
  appTitle?: string
  location: string
  projectRoot: string
  store?: object
  user?: object
}) {
  const name: string = user ? 'app' : 'login'
  const Component = Components[name]

  const context: { url?: string } = {}

  const promises = []

  const Libs = () =>
    ['runtime', 'common', name]
      .map(getScriptTag)
      .concat(<script defer key='user' src='/auth/user?jsonp=setUser' />)

  const styles = {}
  const Styles = ({ inline, ...props }) => {
    const getStyleTag = inline
      ? key => {
        if (key in styles) {
          return styles[key]
        }
        promises.push(
          readFile(path.join(projectRoot, 'dist', `${key}.css`))
            .then(data => {
              styles[key] = (
                <style
                  {...props}
                  dangerouslySetInnerHTML={{ __html: data }}
                />
              )
            })
            .catch(() => {
              styles[key] = null
            })
        )
      }
      : key => (
        <link
          {...props}
          key={key}
          rel='stylesheet'
          type='text/css'
          href={`/dist/${key}.css`}
        />
      )

    return ['site', 'common', name]
      .map(getStyleTag)
      .concat(React.createElement(STYLED_COMPONENTS_PLACEHOLDER))
  }

  const App = ({ appId: propId, static: isStatic, ...props }) => (
    <>
      {!isStatic && <Libs key='libs' />}
      <div id={propId || appId} key='app'>
        <StaticRouter context={context} location={location}>
          <Component {...props} user={user} store={store} />
        </StaticRouter>
      </div>
      {!isStatic && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__STORE__=${JSON.stringify({ store })}`
          }}
        />
      )}
    </>
  )

  const props = {
    title: appTitle,
    App,
    Styles
  }

  const sheet = new ServerStyleSheet()
  function renderHTML () {
    return ReactDOM.renderToStaticMarkup(
      sheet.collectStyles(<Site {...props} />)
    )
  }

  async function renderAsync () {
    let html = renderHTML()

    if (promises.length) {
      await Promise.all(promises)
      html = renderHTML()
    }

    return html
  }

  try {
    const html: string = await renderAsync()

    if (context.url) {
      throw new Redirect(context.url)
    }

    return `<!DOCTYPE html>${html.replace(
      STYLED_COMPONENTS_PATTERN,
      sheet.getStyleTags()
    )}`
  } finally {
    sheet.seal()
  }
}
