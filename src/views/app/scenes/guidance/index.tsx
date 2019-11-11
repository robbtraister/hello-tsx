'use strict'

import React from 'react'

import styles from './styles.scss'

import Graph from '../../components/graph'
import Scene from '../../components/scene'
import Widget from '../../components/widget'

const Guidance = () =>
  <div className={styles.grid}>
    <Widget>
      <Graph />
    </Widget>
  </div>

export default Scene(Guidance, 'Guidance')
