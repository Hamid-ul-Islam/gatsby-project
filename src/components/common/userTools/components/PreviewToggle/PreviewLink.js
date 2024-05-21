/* eslint-disable camelcase */
import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import { formatPreviewSlug } from '@utils/preview'

const PreviewLink = ({ contentful_id, contentType }) => {
  const formattedSlug = formatPreviewSlug(contentful_id, contentType)

  return (
    <Link to={formattedSlug} style={{ textDecoration: 'none', color: 'white' }}>
      View Preview
    </Link>
  )
}

export default PreviewLink
