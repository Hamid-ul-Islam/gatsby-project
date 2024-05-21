import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { useLocale } from '@context/localeContext'

const InternalLink = ({
  to,
  contentType,
  category,
  subpageId,
  children,
  skipLocalization = false,
  className,
  id,
  ...rest
}) => {
  const { getLocalizedSlug } = useLocale()

  const nonLocalizedSlug = to?.startsWith('/') ? to : `/${to || ''}`

  const localizedSlug = getLocalizedSlug({
    slug: to,
    contentType,
    category,
    subpageId,
  })

  return (
    <Link
      to={skipLocalization ? nonLocalizedSlug : localizedSlug}
      id={id}
      className={`m-0 box-border p-0 ${className}`}
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
    </Link>
  )
}

InternalLink.propTypes = {
  to: PropTypes.string,
}

export default InternalLink
