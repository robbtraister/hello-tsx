'use strict'

import React from 'react'
// import styled from 'styled-components'

import Section from './section'
import Loading from '../../components/loading'
import Meter from '../../components/meter'
import { useStore } from '../../components/store'

// const Left = styled.div`
//   display: inline-block;
//   width: 220px;
// `

// const Main = styled.div`
//   display: inline-block;
// `

import styles from './styles.scss'
// import styled from '../../utils/styled'

const Score = props => {
  const score = useStore().get('score')

  return score ? (
    <>
      <div>
        <div className={styles.left}>
          <Meter
            value={score.value}
            total='100'
            banner={{ color: '#a0f', tails: true, text: 'Wellness Score' }}
          />
        </div>
        <div className={styles.main}>
          {score &&
            score.sections &&
            score.sections.map(section => (
              <Section key={section.title} {...section} />
            ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  )
}

export default Score
