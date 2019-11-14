'use strict'

import path from 'path'

import React from 'react'
import ReactDOM from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { ServerStyleSheet } from 'styled-components'

import { Redirect } from '../errors'
import { readFile } from '../utils/promises'

import App from '~/src/views/app'
import Site from '~/src/views/site'
// import Store from './store'

const Store = ({ user, location }) => ({})

const StyledComponents = 'styled-components'
const STYLED_COMPONENTS_PATTERN = new RegExp(
  `<${StyledComponents}></${StyledComponents}>`,
  'g'
)

const Script = ({ name }) => (
  <script defer type='application/javascript' src={`/dist/${name}.js`} />
)

const polyfills = {
  assign: '(window.Object&&window.Object.assign)',
  fetch: 'window.fetch',
  includes: 'Array.prototype.includes',
  map: 'window.Map',
  promise: 'window.Promise',
  set: 'window.Set'
}

export default async function renderSite ({
  appId,
  appTitle,
  location,
  projectRoot,
  user
}: {
  appId: string
  appTitle?: string
  location: string
  projectRoot: string
  user?: object
}) {
  const context: { url?: string } = {}

  const promises = []

  const store = Store({ user, location })

  const Libs = () => (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html:
            // Object.keys(polyfills)
            //   .map(
            //     polyfill =>
            //       `if(!${
            //         polyfills[polyfill]
            //       })document.write('<script type="application/javascript src="/dist/polyfills/${polyfill}.js" defer=""><\\/script>');`
            //   )
            //   .join('')
            `if(${Object.values(polyfills)
              .map(p => `!${p}`)
              .join(
                '||'
              )})document.write('<script type="application/javascript" src="/dist/polyfills.js" defer=""><\\/script>');`
        }}
      />
      <Script name='runtime' />
      <Script name='app' />
      <script src='/auth/user?jsonp=setUser' defer />
    </>
  )

  const styles = {}
  const Styles = ({ inline, ...props }) => {
    const Style = inline
      ? ({ name }) => {
        if (name in styles) {
          return styles[name]
        }
        promises.push(
          readFile(path.join(projectRoot, 'build', 'dist', `${name}.css`))
            .then(data => {
              styles[name] = (
                <style
                  {...props}
                  dangerouslySetInnerHTML={{ __html: data }}
                />
              )
            })
            .catch(() => {
              styles[name] = null
            })
        )
      }
      : ({ name }) => (
        <link
          {...props}
          rel='stylesheet'
          type='text/css'
          href={`/dist/${name}.css`}
        />
      )

    return (
      <>
        <Style name='site' />
        <Style name='app' />
        <StyledComponents />
      </>
    )
  }

  const AppWrapper = ({ appId: propId, static: isStatic, ...props }) => (
    <>
      {!isStatic && <Libs />}
      <div id={propId || appId}>
        <StaticRouter context={context} location={location}>
          <App {...props} user={user} store={store} />
        </StaticRouter>
      </div>
      {!isStatic && (
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__DATA__=${JSON.stringify({ store })}`
          }}
        />
      )}
    </>
  )

  const props = {
    title: appTitle,
    App: AppWrapper,
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
