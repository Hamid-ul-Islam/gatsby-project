import React from 'react'
import LeftArrow from '@images/arrows/left-arrow.svg'
import RightArrow from '@images/arrows/right-arrow.svg'

const CarouselButton = ({
  direction = 'left',
  visible = false,
  hideBgOverlay = false,
  className = '',
  ...rest
}) => {
  if (!visible) return null

  const getDirectionStyles = () => {
    switch (direction) {
      case 'left':
        return 'left-0 rounded-tl-2xl'
      case 'right':
        return 'right-0 rounded-tr-2xl'
      default:
        return ''
    }
  }

  return (
    <button
      className={`absolute ${getDirectionStyles()} top-0 h-full ${
        !hideBgOverlay
          ? 'bg-black bg-opacity-50 transition hover:bg-opacity-70'
          : ''
      } ${className}`}
      {...rest}
    >
      {direction === 'left' && <LeftArrow height="32" width="40" />}
      {direction === 'right' && <RightArrow height="32" width="40" />}
    </button>
  )
}

export default CarouselButton
