'use strict'

import React from 'react'

import BudgetComponent from '../../components/consumers/budget'
import Scene from '../../components/presentational/scene'
import Widget from '../../components/presentational/widget'

const Budget = () => (
  <Scene title="Budget">
    <Widget>
      <div style={{ margin: '0 auto', width: '50%' }}>
        <BudgetComponent />
      </div>
    </Widget>
  </Scene>
)

export { Budget }
