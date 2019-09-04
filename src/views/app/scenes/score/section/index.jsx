'use strict'

import React from 'react'

import Meter from '../../../components/meter'
// import styled from 'styled-components'

// const Container = styled.section`
//   background-color: #eec;
// `

import styles from './styles.scss'

function Section (props) {
  return (
    <section className={styles.section}>
      <Meter {...props} backgroundColor='#eec' size='160' />
      <h3 className={styles.title}>{props.title}</h3>
    </section>
  )
}

export default Section
