import React from 'react'
import PropTypes from 'prop-types'
import { renderRichText } from '@components/common/richText'
import Container from '@components/layout/container'

const RichTextBlock = ({
  richText,
  renderBottomBorder,
  textAlignment,
  ...rest
}) => {
  const alignmentOptions = {
    'Left Align': 'text-left',
    'Center Align': 'text-center',
    'Right Align': 'text-right',
  }
  textAlignment = alignmentOptions[textAlignment] || 'text-center'

  return (
    <div className="w-100 py-24">
      <Container
        className={`color-black flex flex-col items-center justify-center ${textAlignment} font-itcGothic`}
      >
        {renderRichText(richText)}
        {renderBottomBorder && (
          <hr className="my-4 mt-24 w-[75vw] border-4 border-black" />
        )}
      </Container>
    </div>
  )
}

RichTextBlock.propTypes = {}

export default RichTextBlock
