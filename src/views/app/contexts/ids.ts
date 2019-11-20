'use strict'

import { createContext, useContext, useState } from 'react'

const uniqueIdContext = createContext({ id: 0 })

function useUniqueId(prefix = '') {
  const idContext = useContext(uniqueIdContext)
  const [id] = useState(idContext.id++)
  return `${prefix}${id}`
}

export default uniqueIdContext

export { useUniqueId }
