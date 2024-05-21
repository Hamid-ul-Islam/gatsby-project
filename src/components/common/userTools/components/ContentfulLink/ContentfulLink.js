/* eslint-disable camelcase */
import React from 'react'
import PropTypes from 'prop-types'
import ContentfulLogo from '@images/usertools/contentful_logo.svg'

const ContentfulLink = ({ contentful_id }) => {
  const spaceId = process.env.GATSBY_CONTENTFUL_SPACE_ID
  const env = process.env.GATSBY_CONTENTFUL_ENVIRONMENT
  const contentfulLink = `https://app.contentful.com/spaces/${spaceId}/environments/${env}/entries/${contentful_id}`

  return (
    <div className="min-w-8 flex h-8 items-center justify-center rounded-md bg-violet-800 text-sm font-bold text-white">
      <a
        href={contentfulLink}
        className="mx-1.5 flex items-center justify-center text-white no-underline"
        title="Contentful Link"
      >
        <ContentfulLogo height="20px" width="20px" />
      </a>
    </div>
  )
}

export default ContentfulLink
