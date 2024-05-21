import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'

const GatsbyImageWrapper = ({ src, alt, className }) => {
  const gatsbySrcData = getImage(src)

  return (
    <GatsbyImage
      imgStyle={{ zIndex: 1 }}
      image={gatsbySrcData}
      alt={alt || ''}
      className={className}
    />
  )
}

GatsbyImageWrapper.propTypes = {
  src: PropTypes.shape({
    gatsbyImageData: PropTypes.object,
  }).isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
}

export default GatsbyImageWrapper
