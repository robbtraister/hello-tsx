'use strict'

import React from 'react'

import Loading from '../../components/loading'
import Meter from '../../components/meter'
import { useStore } from '../../components/store'

const Home = () => {
  const score = useStore().get('score')

  return score ? (
    <>
      <div>
        <Meter
          value={score.value}
          total='100'
          banner={{ color: '#a0f', tails: true, text: 'Wellness Score' }}
        />
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default Home
