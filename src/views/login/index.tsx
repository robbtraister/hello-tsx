'use strict'

import React from 'react'
import { Route } from 'react-router'

import Layout from '../app/components/layout'

import styles from './styles.scss'

const Links = ({ location }) => (
  <>
    <a
      className={[styles.link, styles.google].join(' ')}
      href={`/auth/google?redirect=${location.pathname}`}
    >
      Google
    </a>
    <a
      className={[styles.link, styles.facebook].join(' ')}
      href={`/auth/facebook?redirect=${location.pathname}`}
    >
      Facebook
    </a>
  </>
)

const Login = () => (
  <Layout>
    <Route path='/'>{Links}</Route>
  </Layout>
)

export default Login
