'use strict'

import { guidance, profile, score, txs } from '../api'

export default ({ user, location }) => ({
  guidance: guidance(user),
  profile: profile(user),
  score: score(user),
  txs: txs(user)
})
