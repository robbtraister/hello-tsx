'use strict'

import React from 'react'

import styles from './styles.scss'

import Graph from '../../components/graph'
import Retirement from '../../components/retirement'
import Scene from '../../components/scene'
import Widget from '../../components/widget'

const Guidance = () => {
  return (
    <div className={styles.grid}>
      <Widget>
        <Graph />
      </Widget>
      <Widget>
        <Retirement />
      </Widget>
    </div>
  )
}

export default Scene(Guidance, 'Guidance')
