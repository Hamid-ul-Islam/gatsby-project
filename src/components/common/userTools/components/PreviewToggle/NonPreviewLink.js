import React from 'react'
import { Link } from 'gatsby'
import PropTypes from 'prop-types'

const NonPreviewLink = ({ originalSlug, contentType, category }) => {
  return (
    <Link
      to={originalSlug}
      contentType={contentType}
      category={category?.originalSlug}
      style={{ textDecoration: 'none', color: 'white' }}
    >
      View Built Page
    </Link>
  )
}

export default NonPreviewLink
