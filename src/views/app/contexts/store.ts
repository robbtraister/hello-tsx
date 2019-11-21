'use strict'

import { createContext, useContext } from 'react'

const storeContext = createContext({
  accounts: [],
  budget: [],
  goals: {
    debt: [],
    savings: []
  },
  retirement: [],
  score: {
    value: null,
    peer: null,
    entries: []
  },
  transactions: []
})

function useStore() {
  return useContext(storeContext)
}

export default storeContext

export { useStore }
