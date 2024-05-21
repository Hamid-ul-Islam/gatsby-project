import React from 'react'
import PropTypes from 'prop-types'
import ExternalLink from './ExternalLink'
import InternalLink from './InternalLink'

const bgClassnames = {
  orange:
    'bg-gradient-orange border border-[#F4B285] border-2 hover:bg-gradient-orangeDark hover:border-[#F7C6A5] hover:shadow-[0_0_16px_rgba(251,86,0,0.6)]',
  darkBlue:
    'bg-dark-blue border-[#8FD7FF] border border-2 hover:border-transparent hover:shadow-[0_0_16px_rgba(251,86,0,0.6)]',
}

const A = ({
  className,
  href,
  to,
  fakeButton = false,
  bgColor = 'orange',
  children,
  id,
  ...rest
}) => {
  if (fakeButton) {
    if (href) {
      return (
        <ExternalLink
          href={href}
          id={id}
          {...rest}
          className={`${className} whitespace-wrap my-4 flex min-h-[56px] w-fit items-center justify-center rounded-[12px] px-[26px] py-2 font-tacticSansExt text-sm uppercase tracking-[.08em] text-white md:whitespace-nowrap md:text-lg ${bgClassnames[bgColor]} `}
        >
          {children}
        </ExternalLink>
      )
    }

    if (to) {
      return (
        <InternalLink
          to={to}
          id={id}
          {...rest}
          className={`${className} whitespace-wrap my-4 flex min-h-[56px] w-fit items-center justify-center rounded-[12px] px-[26px] py-2 font-tacticSansExt text-sm uppercase tracking-[.08em] text-white md:whitespace-nowrap md:text-lg ${bgClassnames[bgColor]} `}
        >
          {children}
        </InternalLink>
      )
    }
  }

  if (href)
    return (
      <ExternalLink href={href} {...rest} className={className} id={id}>
        {children}
      </ExternalLink>
    )

  if (to)
    return (
      <InternalLink to={to} {...rest} className={className} id={id}>
        {children}
      </InternalLink>
    )

  return (
    <div className={className} {...rest} id={id}>
      {' '}
      {children}{' '}
    </div>
  )
}

A.propTypes = {
  url: PropTypes.string,
  slug: PropTypes.string,
}

export default A
