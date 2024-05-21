import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocale } from '@context/localeContext'
import { isPreviewPage } from '@utils/preview'
import { fetchCPAEntry } from '@utils/fetch'
import Carousel from '@components/sections/carousel'
import Faq from '@components/sections/faq'
import Blurb from '@components/common/blurb'
import WallsIoEmbed from '@components/sections/wallsIoEmbed'
import CardBlock from '@components/sections/cardBlock'
import Link from '@components/common/link'

const EmbeddedEntry = ({ __typename, children, ...rest }) => {
  const forwardProps = { __typename, ...rest }
  switch (__typename) {
    case 'customJsScriptEmbed':
    case 'ContentfulWallsIoEmbed':
      return <WallsIoEmbed />
    case 'blurb':
    case 'ContentfulBlurb':
      return <Blurb {...forwardProps} />
    case 'carCarousel':
    case 'ContentfulCarousel':
      return <Carousel {...forwardProps} />
    case 'faq':
    case 'ContentfulFaq':
      return <Faq {...forwardProps} />
    case 'link':
    case 'ContentfulLink':
      return <Link {...forwardProps} />
    case 'cardBlock':
    case 'ContentfulCardBlock':
      return <CardBlock {...forwardProps} />
    default: {
      return <div />
    }
  }
}

const EmbeddedEntryContainer = ({ node, references, ...rest }) => {
  if (isPreviewPage()) {
    const id = node?.data?.target?.sys?.id
    const { locale } = useLocale()
    const { isLoading, error, data } = useQuery(
      [`Embedded Entry ${id}`, id, locale],
      () => fetchCPAEntry({ id, locale, include: 2 }),
      {
        enabled: !!id && !!locale,
      }
    )

    if (isLoading || error) return <div />
    const entryData = data?.items?.[0]
    if (!entryData) return <div />

    return <EmbeddedEntry {...entryData} {...rest} />
  } else {
    const targetId = node?.data?.target?.sys?.id
    const linkType = node?.data?.target?.sys?.linkType
    const entry = references?.find(({ id }) => id === targetId)

    if (!references?.length || !entry) return <div />
    return <EmbeddedEntry {...rest} {...entry} linkType={linkType} />
  }
}

export default EmbeddedEntryContainer
