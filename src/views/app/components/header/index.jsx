'use strict'

import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './styles.scss'

import Menu from '../menu'
import TabLink from '../tab-link'
import { useStore } from '../store'

function Header (props) {
  const profile = useStore().get('profile')

  const { tabs = [] } = props

  return (
    <div className={styles.container}>
      <NavLink className={styles.logo} to='/home'>
        <span className={styles.hello}>Hello</span>
        <span className={styles.wallet}>Wallet</span>
      </NavLink>
      {tabs.map(tab => (
        <TabLink key={tab} tab={tab} />
      ))}
      {profile && <Menu profile={profile} />}
    </div>
  )
}

export default Header
