'use strict'

import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './styles.scss'

import Scene from '../../components/scene'
import Widget from '../../components/widget'

const mockData = {
  accounts: {
    1: {
      label: 'account 1'
    },
    2: {
      label: 'account 2'
    },
    3: {
      label: 'account 3'
    }
  },
  transactions: [
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
}

const AccountTab = ({ children, ...props }) =>
  <li>
    <NavLink {...props}>{children}</NavLink>
  </li>

const Transaction = ({ amount, label }) =>
  <li>{`${label}: ${amount.toFixed(2)}`}</li>

const Transactions = ({ account }) =>
  <>
    <h3>{account ? `account ${account}` : 'All Accounts'}</h3>
    <ul>
      {mockData.transactions
        .filter(datum => !account || datum.account == account)
        .map(datum => <Transaction key={datum.label} {...datum} />)}
    </ul>
  </>

const Accounts = ({ match, history }) => {
  const id = match.params.id

  if (id && !mockData.accounts.hasOwnProperty(id)) {
    history.replace('/accounts')
  }

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
              {Object.keys(mockData.accounts)
                .map(accountId =>
                  <AccountTab to={`/accounts/${accountId}`} key={accountId}>{mockData.accounts[accountId].label}</AccountTab>
                )
              }
            </ul>
          </div>
          <div className={`${styles.accounts} ${styles.select}`}>
            <select value={id} onChange={change}>
              <option value=''>All Accounts</option>
              {Object.keys(mockData.accounts)
                .map(accountId =>
                  <option value={accountId} key={accountId}>{mockData.accounts[accountId].label}</option>
                )
              }
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
