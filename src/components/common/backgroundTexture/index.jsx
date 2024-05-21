import React from 'react'
import PropTypes from 'prop-types'
import * as styles from './backgroundTexture.module.css'

const BackgroundTexture = ({ gradient = '', className = '', children }) => {
  return (
    <div className="relative h-full w-full">
      <span
        className={`absolute top-0 left-0 -z-10 h-full w-full bg-white ${className}`}
      />
      {gradient && (
        <span
          className={`absolute top-0 left-0 -z-10 h-full w-full`}
          style={{ backgroundImage: gradient }}
        />
      )}
      <span
        className={`absolute top-0 left-0 -z-10 h-full w-full ${styles.texture__container}`}
      />
      {children}
    </div>
  )
}

BackgroundTexture.propTypes = {
  gradient: PropTypes.string,
}

export default BackgroundTexture
