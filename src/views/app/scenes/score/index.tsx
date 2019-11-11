'use strict'

import React from 'react'

import styles from './styles.scss'

import Meter from '../../components/meter'
import Scene from '../../components/scene'
import Widget from '../../components/widget'

const mockData = {
  value: 85,
  peer: 92,
  entries: [
    {
      value: 5,
      total: 7,
      title: 'Spend Less Than You Earn',
      description: 'some description here'
    },
    {
      value: 6,
      total: 13,
      title: 'Emergency Savings',
      description: 'some description here'
    },
    {
      value: 11,
      total: 12,
      title: 'Credit Card Balance',
      description: 'some description here'
    },
    {
      value: 38,
      total: 40,
      title: 'Retirement',
      description: 'some description here'
    }
  ]
}

const Entry = ({ value, total, title, description }) =>
  <Widget className={styles.entry}>
    <div className={styles.meter}>
      <Meter value={value} total={total} />
    </div>
    <div className={styles.title}>{title}</div>
    <div className={styles.description}>{description}</div>
  </Widget>

const Score = ({ data = mockData }) =>
  <div className={styles.grid}>
    <Widget className={styles.total}>
      <div className={styles.title}>Your Score</div>
      <Meter value={data.value} title='Wellness Score' />
      <div className={styles.description}>
      <div className={styles.title}>Get the Complete Picture</div>
      <div>
        Add your savings, checking, credit card, loan, investment, 401(k), IRA, and other bank accounts so we can score you accurately
      </div>
      <div className={styles.peer}>
        <div className={styles.title}>Your Peers</div>
        <Meter value={data.peer} title='Wellness Score' color='#808' />
      </div>
      </div>
    </Widget>
    {data.entries.map((entry) => <Entry {...entry} key={entry.title} />)}
  </div>

export default Scene(Score, 'Score')
