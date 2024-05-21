import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImageWrapper, VanillaImageWrapper } from './subcomponents'

const Image = ({ src, alt, className, useVanillaImage = false, ...rest }) => {
  const useGatsbyImage = !useVanillaImage && src?.gatsbyImageData
  const defaultAlt = src?.description || src?.title

  return (
    <>
      {useGatsbyImage ? (
        <GatsbyImageWrapper
          src={src}
          alt={alt === '' ? '' : alt || defaultAlt}
          className={className}
        />
      ) : (
        <VanillaImageWrapper
          src={src}
          alt={alt === '' ? '' : alt || defaultAlt}
          {...rest}
          className={className}
        />
      )}
    </>
  )
}

Image.propTypes = {
  src: PropTypes.oneOfType([
    PropTypes.shape({
      file: PropTypes.shape({
        url: PropTypes.string,
      }),
      gatsbyImageData: PropTypes.object,
    }),
    PropTypes.string,
  ]).isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  useVanillaImage: PropTypes.bool,
}

export default Image
