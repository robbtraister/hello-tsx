'use strict'

import React, { PureComponent } from 'react'

import styles from './styles.scss'

import { d3 as importD3 } from '../../imports'

function getRotation (value) {
  return value * 260 - 130
}

export default class Meter extends PureComponent {
  constructor (props) {
    super(props)

    this.svg = React.createRef()
  }

  render () {
    const { loaded } = this.state || {}

    return (
      <svg
        width={this.props.size || '200'}
        height={this.props.size || '200'}
        viewBox='-125 -125 250 250'
        ref={this.svg}
      >
        <g className={styles.gauge}>
          <path d='M-100,0A100,100 0,0,1 0,-100' className={styles.bad} />
          <path d='M0,-100A100,100 0,0,1 100,0' className={styles.ok} />
          <path d='M100,0A100,100 0,0,1 0,100' className={styles.good} />
          <g stroke={this.props.backgroundColor || '#fff'} strokeWidth='5'>
            <path d='M-125,0L125,0' />
            <path d='M0,-125L0,125' />
          </g>
        </g>
        {!loaded && (
          <g className={styles.spinner}>
            <path d='M-30,0A30,30 0,0,1 0,-30' />
          </g>
        )}
        {loaded && (
          <g className={styles.text} alignmentBaseline='middle'>
            <text x='0' y='-20' fontSize='50' className='value'>
              0
            </text>
            <text x='0' y='5' fontSize='20'>
              out of
            </text>
            <text x='0' y='30' fontSize='40'>
              {this.props.total}
            </text>
          </g>
        )}
        {this.props.banner && (
          <>
            <g
              className={styles.banner}
              fill={this.props.banner.color || '#a0f'}
            >
              {this.props.banner.tails && (
                <>
                  <path d='M-105,50h40v40h-40l15,-20z' />
                  <path d='M105,50h-40v40h40l-15,-20z' />
                </>
              )}
              <path d='M-90,60v40h180v-40z' />
            </g>
            <text
              className={styles.banner}
              x='0'
              y='82'
              alignmentBaseline='middle'
            >
              {this.props.banner.text}
            </text>
          </>
        )}
        {loaded && (
          <g className={styles.tick} transform='rotate(-130)'>
            <path d='M0,-80l-16,-40h32z' />
          </g>
        )}
      </svg>
    )
  }

  componentDidMount () {
    this.animate()
  }

  async animate () {
    const d3 = await importD3()
    this.setState({ loaded: true })

    const svg = d3.select(this.svg.current)

    const { value } = this.props
    const percent = value / this.props.total

    svg
      .select('.value')
      .transition()
      .duration(1500)
      .tween('text', function () {
        return function (t) {
          this.textContent = Math.round(value * t)
        }
      })

    svg
      .select(`.${styles.tick}`)
      .transition()
      .duration(1500)
      .ease(d3.easeBounce)
      .attrTween('transform', () => t => `rotate(${getRotation(percent * t)})`)
  }
}
