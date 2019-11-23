'use strict'

import React from 'react'

import styles from './styles.scss'

import Goals from '../../components/consumers/goals'
import Retirement from '../../components/consumers/retirement'
import Scene from '../../components/presentational/scene'
import Widget from '../../components/presentational/widget'

const Guidance = () => {
  return (
    <Scene title="Guidance">
      <div className={styles.grid}>
        <Widget>
          <Retirement />
        </Widget>
        <Widget>
          <Goals />
        </Widget>
        <Widget>
          <Goals />
        </Widget>
      </div>
    </Scene>
  )
}

export { Guidance }
