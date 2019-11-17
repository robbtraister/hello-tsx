'use strict'

import React from 'react'
import { Redirect, Route, Switch } from 'react-router'

import Accounts from './scenes/accounts'
import Budget from './scenes/budget'
import Guidance from './scenes/guidance'
import Home from './scenes/home'
import Profile from './scenes/profile'
import Score from './scenes/score'

const GoHome = () => <Redirect to="/home" />

const Router = () => (
  <Switch>
    <Route path="/home" component={Home} />
    <Route path="/score" component={Score} />
    <Route path="/guidance" component={Guidance} />
    <Route path="/accounts/:id" component={Accounts} />
    <Route path="/accounts" component={Accounts} />
    <Route path="/budget" component={Budget} />
    <Route path="/profile" component={Profile} />
    <Route path="/" component={GoHome} />
  </Switch>
)

export default Router
