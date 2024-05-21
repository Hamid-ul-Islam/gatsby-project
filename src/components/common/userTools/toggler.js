import React from 'react'
import PropTypes from 'prop-types'
import InfoIcon from '@images/usertools/info.svg'
import CompressIcon from '@images/usertools/compress.svg'

const Toggler = ({ expanded, onClick = () => {} }) => {
  return (
    <div
      className="py-5px px-6px bv-violet-900 flex cursor-pointer justify-center rounded-md"
      onClick={onClick}
      title={expanded ? 'Collapse Info Tools' : 'Expand Info Tools'}
    >
      {expanded ? (
        <CompressIcon height="20px" width="20px" />
      ) : (
        <InfoIcon height="20px" width="20px" />
      )}
    </div>
  )
}

export default Toggler
