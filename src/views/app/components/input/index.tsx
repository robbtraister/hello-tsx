'use strict'

import PropTypes from 'prop-types'
import React from 'react'

import { useUniqueId } from '../../contexts/ids'

const Input = ({ label, ...props }) => {
  const id = useUniqueId()
  return (
    <>
      <input {...props} id={id} />
      <label htmlFor={id}>{label}</label>
    </>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired
}

export default Input
