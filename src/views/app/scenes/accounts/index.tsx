'use strict'

import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './styles.scss'

import Scene from '../../components/scene'
import Widget from '../../components/widget'

const mockData = [
  {
    label: 'tx1',
    account: 1,
    amount: 1.5
  },
  {
    label: 'tx2',
    account: 2,
    amount: 6
  },
  {
    label: 'tx3',
    account: 3,
    amount: 8
  },
  {
    label: 'tx4',
    account: 3,
    amount: 3.5
  },
  {
    label: 'tx5',
    account: 2,
    amount: 7.25
  },
  {
    label: 'tx6',
    account: 1,
    amount: 23
  }
]

const AccountTab = ({ children, ...props }) =>
  <li>
    <NavLink {...props}>{children}</NavLink>
  </li>

const Transactions = ({ account }) =>
  <>
    <h3>{account ? `account ${account}` : 'All Accounts'}</h3>
    <ul>
      {mockData
        .filter(datum => !account || datum.account == account)
        .map(datum => <li key={datum.label}>{datum.label}: {datum.amount.toFixed(2)}</li>)}
    </ul>
  </>

const Accounts = ({ match, history }) => {
  const { id } = match.params

  function change (e) {
    history.push(`/accounts/${e.target.value || ''}`)
  }

  return (
    <div style={{ display: 'grid' }}>
      <Widget>
        <div className={styles.grid}>
          <div className={`${styles.accounts} ${styles.list}`}>
            <ul>
              <AccountTab to='/accounts'>All Accounts</AccountTab>
              <AccountTab to='/accounts/1'>account 1</AccountTab>
              <AccountTab to='/accounts/2'>account 2</AccountTab>
              <AccountTab to='/accounts/3'>account 3</AccountTab>
            </ul>
          </div>
          <div className={`${styles.accounts} ${styles.select}`}>
            <select onChange={change}>
              <option value={null} selected={!id}>All Accounts</option>
              <option value='1' selected={id == 1}>account 1</option>
              <option value='2' selected={id == 2}>account 2</option>
              <option value='3' selected={id == 3}>account 3</option>
            </select>
          </div>
          <div>
            <Transactions account={id} />
          </div>
        </div>
      </Widget>
    </div>
  )
}

export default Scene(Accounts, 'Accounts')
