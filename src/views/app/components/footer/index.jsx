'use strict'

import React from 'react'
// import styled from 'styled-components'

// const Container = styled.div`
//   margin: 20px auto;
//   padding-bottom: 20px;
//   width: 960px;
// `

// const Section = styled.div`
//   border-left: 1px solid #008;
//   text-align: center;
//   width: 33%;
//   float: left;
//   &:first-child {
//     border-left: 0;
//   }
// `

import styles from './styles.scss'

const Section = ({ className, ...props }) => (
  <div className={[styles.section].concat(className).join(' ')} {...props} />
)

function Footer () {
  return (
    <div className={styles.container}>
      <Section>Verified</Section>
      <Section>Contact Us</Section>
      <Section>Support</Section>
    </div>
  )
}

export default Footer
