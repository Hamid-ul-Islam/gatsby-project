import React from 'react'
import A from '@components/common/A'
import { formattedLinkType, getUrl } from '@utils'

const Link = ({
  fakeButton = true,
  displayText,
  target,
  className,
  icon,
  id,
}) => {
  const type = formattedLinkType(target?.[0]?.__typename)

  return (
    <A
      fakeButton={fakeButton}
      alt={displayText}
      className={className}
      to={type !== 'url' && getUrl(type, target?.[0])}
      href={type === 'url' && getUrl(type, target?.[0])}
      id={id}
    >
      {icon && <div className="mr-[14px]">{icon}</div>}
      {displayText}
    </A>
  )
}

export default Link
