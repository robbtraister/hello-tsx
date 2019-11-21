'use strict'

import React from 'react'

import Budget from '../../components/consumers/budget'
import Scene from '../../components/presentational/scene'
import Widget from '../../components/presentational/widget'

const BudgetScene = () => (
  <Widget>
    <div style={{ margin: '0 auto', width: '50%' }}>
      <Budget />
    </div>
  </Widget>
)

export default Scene(BudgetScene, 'Budget')
