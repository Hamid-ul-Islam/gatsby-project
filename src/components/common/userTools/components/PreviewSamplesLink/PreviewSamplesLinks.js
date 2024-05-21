import React from 'react'
import { Link } from 'gatsby'

const PreviewSamplesLink = () => {
  return (
    <div className="flex h-8 items-center justify-center rounded-md bg-violet-900 px-2 text-sm font-bold text-white">
      <Link to="/preview">Preview Samples</Link>
    </div>
  )
}

export default PreviewSamplesLink
