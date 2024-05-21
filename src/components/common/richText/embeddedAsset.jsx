import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'
import { useLocale } from '@context/localeContext'
import { isPreviewPage } from '@utils/preview'
import { fetchCPAAsset } from '@utils/fetch'
import Image from '@components/common/image'

const EmbeddedAsset = ({ src, alt, contentType }) => {
  return (
    <div className="mb-4">
      {contentType.includes('image') && <Image src={src} alt={alt} />}
      {contentType.includes('video') && (
        <video controls>
          <source src={src} type={contentType} />
        </video>
      )}
    </div>
  )
}

const EmbeddedAssetContainer = ({ node, references, ...rest }) => {
  if (isPreviewPage()) {
    const id = node?.data?.target?.sys?.id
    const { locale } = useLocale()
    const { isLoading, error, data } = useQuery(
      [`Embedded Asset ${id}`, id, locale],
      () => fetchCPAAsset({ id, locale }),
      {
        enabled: !!id && !!locale,
      }
    )

    if (isLoading || error || !data) return <div />

    return (
      <EmbeddedAsset
        src={data?.file?.url}
        alt={data?.description || data?.title}
        contentType={data?.file?.contentType}
      />
    )
  } else {
    const targetId = node?.data?.target?.sys?.id
    const entry = references?.find(({ id }) => id === targetId)

    if (!references?.length || !entry) return <div />
    return (
      <EmbeddedAsset
        src={entry?.file?.url}
        alt={entry?.description || entry?.title}
        contentType={entry?.file?.contentType}
      />
    )
  }
}

export default EmbeddedAssetContainer
