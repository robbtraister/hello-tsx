'use strict'

import React from 'react'

import styles from './styles'

import TabLink from '../tab-link'

export default class Menu extends React.Component {
  render () {
    const { profile } = this.props

    return (
      <>
        <TabLink to='/profile' className={styles.profile}>
          {profile.name ? `Hello, ${profile.name}` : 'Profile'}
        </TabLink>
      </>
    )
  }
}
