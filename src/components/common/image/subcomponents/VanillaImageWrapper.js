import React from 'react'
import PropTypes from 'prop-types'

const VanillaImageWrapper = ({ src, alt, className = '', ...rest }) => {
  const defaultClassName = 'z-0 h-auto w-full pb-0'
  const url = src?.file?.url || src

  if (!url) return null

  return (
    <img
      className={className || defaultClassName}
      src={`${url}?w=1920&fm=webp&q=50`}
      alt={alt || ''}
      {...rest}
    />
  )
}

VanillaImageWrapper.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.shape({
      file: PropTypes.shape({
        url: PropTypes.string,
      }),
    }),
    PropTypes.string,
  ]).isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
}

export default VanillaImageWrapper
