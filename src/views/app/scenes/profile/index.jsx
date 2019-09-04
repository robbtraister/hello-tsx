'use strict'

import React from 'react'

import Loading from '../../components/loading'
import { useStore } from '../../components/store'

const Profile = props => {
  const profile = useStore().get('profile')

  return profile ? (
    <>
      <div>{profile.name}</div>
      <div>{profile.address}</div>
      <p>
        <a href='/logout'>Logout</a>
      </p>
    </>
  ) : (
    <Loading />
  )
}

export default Profile
