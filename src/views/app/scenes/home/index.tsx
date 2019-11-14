'use strict'

import React from 'react'

import styles from './styles.scss'

import Counter from '../../components/counter'
import Graph from '../../components/graph'
import Meter from '../../components/meter'
import Pie from '../../components/pie'
import Retirement from '../../components/retirement'
import Scene from '../../components/scene'
import Widget from '../../components/widget'

const Home = () => (
  <div className={styles.grid}>
    <Widget>
      <div className={styles.score}>
        <div className={styles.title}>Your Score</div>
        <Meter value={85} title='Wellness Score' />
      </div>
      <div className={styles.score}>
        <div className={`${styles.title} ${styles.peer}`}>Your Peers</div>
        <Meter value={92} title='Wellness Score' color='#808' />
      </div>
    </Widget>
    <Widget>
      <Graph />
    </Widget>
    <Widget>
      <Pie />
    </Widget>
    <Widget>
      <Retirement />
    </Widget>
    <Widget>
      <Counter right />
      <div style={{ height: '200px' }} />
    </Widget>
    <Widget>
      accounts
      <div style={{ height: '200px' }} />
    </Widget>
    <Widget>
      data
      <div style={{ height: '200px' }} />
    </Widget>
    <Widget>
      scroll
      <div style={{ height: '400px' }} />
    </Widget>
  </div>
)

export default Scene(Home, 'Home')
