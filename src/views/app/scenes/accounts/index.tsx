'use strict'

import React from 'react'
import { NavLink, Redirect } from 'react-router-dom'

import styles from './styles.scss'

import Scene from '../../components/scene'
import Widget from '../../components/widget'

const mockData = {
  accounts: [
    {
      id: '1',
      label: 'account 1'
    },
    {
      id: '2',
      label: 'account 2'
    },
    {
      id: '3',
      label: 'account 3'
    }
  ],
  transactions: [
    {
      label: 'tx1',
      account: '1',
      amount: 1.5
    },
    {
      label: 'tx2',
      account: '2',
      amount: 6
    },
    {
      label: 'tx3',
      account: '3',
      amount: 8
    },
    {
      label: 'tx4',
      account: '3',
      amount: 3.5
    },
    {
      label: 'tx5',
      account: '2',
      amount: 7.25
    },
    {
      label: 'tx6',
      account: '1',
      amount: 23
    }
  ]
}

const AccountTab = ({ children, ...props }) => (
  <li>
    <NavLink {...props} exact>
      {children}
    </NavLink>
  </li>
)

const Transaction = ({ amount, label }) => (
  <li>{`${label}: ${amount.toFixed(2)}`}</li>
)

const Transactions = ({ transactions }) => (
  <ul>
    {transactions.map(datum => (
      <Transaction key={datum.label} {...datum} />
    ))}
  </ul>
)

const Accounts = ({ match, history, location }) => {
  const id = match.params.id

  if (!id) {
    const queryId = new URLSearchParams(location.search).get('id')
    if (queryId) {
      return <Redirect to={`/accounts/${queryId}`} />
    }
  }

  if (id && !mockData.accounts.find(account => account.id === id)) {
    return <Redirect to='/accounts' />
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
              {mockData.accounts.map(account => (
                <AccountTab to={`/accounts/${account.id}`} key={account.id}>
                  {account.label}
                </AccountTab>
              ))}
            </ul>
          </div>
          <div className={`${styles.accounts} ${styles.select}`}>
            <form method='GET' action='/accounts'>
              <select name='id' value={id} onChange={change}>
                <option value=''>All Accounts</option>
                {mockData.accounts.map(account => (
                  <option value={account.id} key={account.id}>
                    {account.label}
                  </option>
                ))}
              </select>
              <noscript>
                <input type='submit' value='Go' />
              </noscript>
            </form>
          </div>
          <div>
            <h3 className={styles.title}>
              {id ? `account ${id}` : 'All Accounts'}
            </h3>
            <Transactions
              transactions={mockData.transactions.filter(
                datum => !id || datum.account === id
              )}
            />
          </div>
        </div>
      </Widget>
    </div>
  )
}

export default Scene(Accounts, 'Accounts')
