'use strict'

import React from 'react'

import Loading from '../../components/loading'
import { useStore } from '../../components/store'

import Graph from './graph'
// const Graph = 'div'

const Guidance = props => {
  const guidance = useStore().get('guidance')

  return guidance ? <Graph data={guidance.retirementSavings} /> : <Loading />
}

export default Guidance
