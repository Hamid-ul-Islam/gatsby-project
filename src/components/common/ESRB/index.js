import React from 'react'
import PropTypes from 'prop-types'
import { StaticImage } from 'gatsby-plugin-image'

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
}

const ESRB = ({ theme = THEMES.DARK, className = '' }) => {
  return (
    <div
      className={`flex items-center gap-4 ${className} ${
        theme === THEMES.DARK ? 'text-black' : 'text-white'
      }`}
    >
      <StaticImage
        src="../../../images/esrb/esbr.png"
        alt="ESRB Rating Icon"
        width={56}
        quality={80}
      />
      <div className="font-itcGothic text-lg leading-6">
        Mild Fantasy Violence
        <br />
        Comic Mischief
        <hr className="my-2 h-[2px] border-none bg-[#434343]" />
        In-Game Purchases
      </div>
    </div>
  )
}

ESRB.propTypes = {
  theme: PropTypes.oneOf(Object.values(THEMES)),
  className: PropTypes.string,
}

export default ESRB
