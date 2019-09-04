'use strict'

import React, { PureComponent } from 'react'

import { d3 as importD3 } from '../../imports'

export default class Graph extends PureComponent {
  constructor (props) {
    super(props)

    this.height = this.props.height || 300
    this.width = this.props.width || 400
    this.margin = this.props.margin || 5
    this.padding = this.props.padding || 15

    this.svg = React.createRef()
  }

  render () {
    return (
      <svg
        width={this.width}
        height={this.height}
        viewBox={`0 0 ${this.width} ${this.height}`}
        ref={this.svg}
      >
        <path
          d={`M${this.margin},${this.margin}h${this.width -
            2 * this.margin}v${this.height - 2 * this.margin}h-${this.width -
            2 * this.margin}z`}
          stroke='#000'
          fill='none'
        />
        <path className='area' stroke='none' fill='#bfa' />
        <path
          className='line'
          stroke='#0a0'
          strokeWidth='5'
          fill='none'
          d={`M${this.margin + this.padding},${this.height -
            this.margin -
            this.padding}h${this.width - 2 * (this.margin + this.padding)}`}
        />
      </svg>
    )
  }

  componentDidMount () {
    this.draw()
  }

  async draw () {
    const d3 = await importD3()

    const { data } = this.props
    const count = data.length

    const x = d3
      .scaleLinear()
      .domain([0, count - 1])
      .range([
        this.margin + this.padding,
        this.width - this.margin - this.padding
      ])
    const y = d3
      .scaleLinear()
      .domain([0, Math.max(...data) * 1.1])
      .range([
        this.height - this.margin - this.padding,
        this.margin + this.padding
      ])

    const svg = d3.select(this.svg.current)

    const lineData = d3
      .line()
      .x((d, i) => x(i))
      .y((d, i) => y(d))

    svg
      .select('.line')
      .datum([...new Array(count)].map(() => 0))
      .attr('d', lineData)
      .datum(data)
      .transition()
      .duration(800)
      .attr('d', lineData)

    const areaData = d3
      .area()
      .x((d, i) => x(i))
      .y1((d, i) => y(d))
      .y0(y(0))

    svg
      .select('.area')
      .datum([...new Array(count)].map(() => 0))
      .attr('d', areaData)
      .datum(data)
      .transition()
      .duration(800)
      .attr('d', areaData)
  }
}
