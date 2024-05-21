import React, { useState } from 'react'
import useWindowSize from '@hooks/useWindowSize'
import useBreakpoints from '@hooks/useBreakpoints'

const BreakpointDisplay = () => {
  const breakpoint = useBreakpoints()
  const [showWindowSize, setShowWindowSize] = useState(false)
  const { width, height } = useWindowSize()

  return (
    <div
      className={`m-w-fit flex h-8 w-fit cursor-pointer items-center justify-center rounded-md bg-violet-900 pb-1 text-sm font-bold text-white ${
        showWindowSize ? 'px-2.5' : 'px-1.5'
      }`}
      onClick={() => setShowWindowSize((show) => !show)}
      title="Current Viewport Size"
    >
      {breakpoint} {showWindowSize && `:  ${width} x ${height}`}
    </div>
  )
}

export default BreakpointDisplay
