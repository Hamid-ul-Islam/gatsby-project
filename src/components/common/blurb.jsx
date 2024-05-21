import React from 'react'
import PropTypes from 'prop-types'
import TabbedRule from '@images/tabbed-rule.svg'
import { renderRichText } from '@components/common/richText'

const Blurb = ({ children, richText, textAlignment, ...rest }) => {
  const alignmentOptions = {
    'Left Align': 'text-left',
    'Center Align': 'text-center',
    'Right Align': 'text-right',
  }
  textAlignment = alignmentOptions[textAlignment] || 'text-left'

  return (
    <div
      className={`relative mx-auto mb-[66px] flex w-full max-w-[923px] px-6 ${textAlignment} md:mb-[104px]`}
    >
      <div className="relative left-[1px]">
        <TabbedRule />
      </div>
      <div className="border-l-2 border-yellow pl-8 text-left font-itcGothic text-2xl font-medium leading-10">
        {richText ? renderRichText(richText) : children}
      </div>
    </div>
  )
}

Blurb.propTypes = {}

export default Blurb
