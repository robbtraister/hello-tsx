'use strict'

import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import { Accounts } from './scenes/accounts'
import { Budget } from './scenes/budget'
import { Dashboard } from './scenes/dashboard'
import { Guidance } from './scenes/guidance'
import { Login } from './scenes/login'
import { Profile } from './scenes/profile'
import { Score } from './scenes/score'
import { Welcome } from './scenes/welcome'

import { useUser } from './contexts/user'

const Router = () => {
  const user = useUser()

  const GoHome = () => <Redirect to={user ? '/dashboard' : '/welcome'} />

  return (
    <Switch>
      <Route path="/dashboard" component={user ? Dashboard : Login} />
      <Route path="/score" component={user ? Score : Login} />
      <Route path="/guidance" component={user ? Guidance : Login} />
      <Route path="/accounts/:id?" component={user ? Accounts : Login} />
      <Route path="/budget" component={user ? Budget : Login} />
      <Route path="/profile" component={user ? Profile : Login} />
      <Route path="/login" component={user ? GoHome : Login} />
      <Route path="/welcome" component={Welcome} />
      <Route path="/" component={GoHome} />
    </Switch>
  )
}

export default Router
