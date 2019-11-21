'use strict'

import React from 'react'

import Graph from '../../presentational/graph'

import { useStore } from '../../../contexts/store'

const Retirement = () => {
  const { retirement } = useStore()

  return <Graph data={retirement} />
}

export default Retirement
