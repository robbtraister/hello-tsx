'use strict'

import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import Layout from './components/layout'
import Loading from './components/loading'
import Title from './components/title'

import Accounts from './scenes/accounts'
import Budget from './scenes/budget'
import Guidance from './scenes/guidance'
import Home from './scenes/home'
import Profile from './scenes/profile'
import Score from './scenes/score'

const titles = {
  home: 'Home',
  score: 'Wellness Score',
  guidance: 'Guidance',
  accounts: 'Accounts',
  budget: 'Budget'
}

const GoHome = () => <Redirect to='/home' />

const blocked = [
  // 'guidance'
]

const scenes = {
  accounts: Accounts,
  budget: Budget,
  guidance: Guidance,
  home: Home,
  profile: Profile,
  score: Score
}

const App = props => {
  const { store = {} } = props

  const allowed = Object.keys(titles).filter(title => !blocked.includes(title))

  const getScene = name => {
    const Component =
      scenes[name] ||
      // lazyScenes[name] ||
      Loading
    return () => (
      <>
        <Title>{titles[name]}</Title>
        <Component />
      </>
    )
  }

  return (
    <Layout store={store} tabs={allowed}>
      <Switch>
        {allowed.map(name => {
          return <Route path={`/${name}`} key={name} render={getScene(name)} />
        })}
        <Route path={`/profile`} render={getScene('profile')} />
        <Route path='/' component={GoHome} />
      </Switch>
    </Layout>
  )
}

export default App
