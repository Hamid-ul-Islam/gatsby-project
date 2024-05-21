import React from 'react'
import PropTypes from 'prop-types'

const ExternalLink = ({ href, children, className, id, ...rest }) => {
  return (
    <a
      href={href}
      target="__blank"
      rel="noopener noreferrer"
      className={`m-0 box-border p-0 ${className}`}
      id={id}
      //   gap: true,
      //   filter: true,
      //   transform: true,
      //   cursor: true,
      //   textTransform: true,
      //   transition: true,
      //   pointerEvents: true,
      //   visibility: true,
      //   wordBreak: true,
      //   whiteSpace: true,
      //   textDecoration: true,
      //   textUnderlinePosition: true,
      {...rest}
    >
      {children}
    </a>
  )
}

ExternalLink.propTypes = {
  url: PropTypes.string,
}

export default ExternalLink
