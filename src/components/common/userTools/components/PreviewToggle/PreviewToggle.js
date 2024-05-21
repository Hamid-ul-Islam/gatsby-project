/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import { isProdPreview } from '@featureflags'
import NonPreviewLink from './NonPreviewLink'
import PreviewLink from './PreviewLink'

const PreviewToggle = ({ originalSlug, contentful_id, ...rest }) => {
  if (isProdPreview) return null
  if (!originalSlug && !contentful_id) return null
  if (originalSlug && typeof originalSlug !== 'string') return null

  return (
    <div className="flex h-8 items-center justify-center rounded-md bg-violet-800 px-2.5 text-sm font-bold text-white">
      {originalSlug ? (
        <NonPreviewLink originalSlug={originalSlug} {...rest} />
      ) : (
        <PreviewLink contentful_id={contentful_id} {...rest} />
      )}
    </div>
  )
}

export default PreviewToggle
