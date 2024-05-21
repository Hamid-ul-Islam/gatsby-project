import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'
import { useLocale } from '@context/localeContext'
import { isPreviewPage } from '@utils/preview'
import { fetchCPAAsset, fetchCPAEntry } from '@utils/fetch'
import A from '@components/common/A'
import Button from '@components/common/button'
import { isExternalURL, getUrl, formattedLinkType } from '@utils'

const HYPERLINK = 'hyperlink'
const ENTRY_HYPERLINK = 'entry-hyperlink'
const ASSET_HYPERLINK = 'asset-hyperlink'

const EntryHyperLink = (props) => {
  const { __typename, category, children, fakeButton = true } = props

  const type = formattedLinkType(__typename)

  return (
    <A
      to={getUrl(type, props)}
      contentType={__typename}
      category={category?.toLowerCase()}
      fakeButton={fakeButton}
      className={fakeButton ? '' : 'underline'}
    >
      {children}
    </A>
  )
}

const AssetHyperLink = ({
  file,
  title,
  description,
  children,
  fakeButton = true,
}) => {
  return (
    <A
      href={file?.url}
      fakeButton={fakeButton}
      className={fakeButton ? '' : 'underline'}
    >
      {children}
    </A>
  )
}

const Hyperlink = ({ uri, children }) => {
  // check if uri is internal or external link
  const href = isExternalURL(uri) ? uri : ''
  const to = isExternalURL(uri) ? '' : uri

  return (
    <A href={href} to={to} className="underline">
      {children}
    </A>
  )
}

const Hyperlinks = ({ linkType, ...rest }) => {
  switch (linkType) {
    case ENTRY_HYPERLINK:
      return <EntryHyperLink {...rest} />
    case ASSET_HYPERLINK:
      return <AssetHyperLink {...rest} />
    case HYPERLINK:
      return <Hyperlink {...rest} />
    default: {
      return <div />
    }
  }
}

const HyperlinkContainer = ({ node, references, ...rest }) => {
  const { locale } = useLocale()
  const linkType = node?.nodeType
  const id = node?.data?.target?.sys?.id

  if (node?.data?.uri && linkType === HYPERLINK)
    return <Hyperlinks {...rest} uri={node?.data?.uri} linkType={linkType} />

  if (isPreviewPage()) {
    const { isLoading, error, data } = useQuery(
      [`Embedded Entry ${id}`, id, locale],
      () =>
        linkType === ENTRY_HYPERLINK
          ? fetchCPAEntry({ id, locale, include: 2 })
          : fetchCPAAsset({ id, locale }),
      {
        enabled: !!id && !!locale,
      }
    )

    if (isLoading || error) return <div />
    const entryOrAsset = linkType === ENTRY_HYPERLINK ? data?.items?.[0] : data
    if (!entryOrAsset) return <div />
    return <Hyperlinks {...rest} {...entryOrAsset} linkType={linkType} />
  } else {
    const entryOrAsset = references?.find(({ id: targetId }) => targetId === id)

    if (!references?.length || !entryOrAsset) return <div />

    return <Hyperlinks {...rest} {...entryOrAsset} linkType={linkType} />
  }
}

export default HyperlinkContainer
