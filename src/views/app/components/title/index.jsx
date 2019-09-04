'use strict'

import React from 'react'
// import styled from 'styled-components'

// const Title = styled.div`
//   color: #444;
//   font-size: 20px;
//   font-weight: bold;
//   text-align: center;
//   text-transform: uppercase;
//   width: 100%;
// `

import styles from './styles.scss'

const Title = ({ children }) => <div className={styles.title}>{children}</div>

export default Title
