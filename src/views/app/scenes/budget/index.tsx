'use strict'

import React from 'react'

import Pie from '../../components/pie'
import Scene from '../../components/scene'
import Widget from '../../components/widget'

const Budget = () => (
  <Widget>
    <div style={{ margin: '0 auto', width: '50%' }}>
      <Pie />
    </div>
  </Widget>
)

export default Scene(Budget, 'Budget')
