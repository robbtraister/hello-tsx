'use strict'

import React from 'react'

import Pie from '../../presentational/pie'
import { useStore } from '../../../contexts/store'

const Budget = () => {
  const { budget } = useStore()

  return <Pie data={budget} />
}

export default Budget
