'use strict'

import React from 'react'

import Transaction from './transaction'
import Loading from '../../components/loading'
import { useStore } from '../../components/store'

const Accounts = props => {
  const txs = useStore().get('txs')

  return txs ? (
    <>
      {txs.map((tx, i) => (
        <Transaction key={i} {...tx} />
      ))}
    </>
  ) : (
    <Loading />
  )
}

export default Accounts
