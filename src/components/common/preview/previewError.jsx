import React from 'react'

const PreviewError = ({ message, ...rest }) => {
  return (
    <>
      <div>Preview Error</div>
      <div>{message}</div>
    </>
  )
}

export default PreviewError
