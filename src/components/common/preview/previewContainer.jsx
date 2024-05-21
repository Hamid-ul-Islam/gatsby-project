import React from 'react'
import PropTypes from 'prop-types'
import { useQuery } from '@tanstack/react-query'
import { useLocale } from '@context/localeContext'
import PreviewError from './previewError'
import UserTools from '@components/common/userTools'
import Loader from './loader.jsx'
import { fetchCPAEntry } from '@utils/fetch'
import PageCPAContainer from './pagePreview'
import PostCPAContainer from './postPreview'
import ProductCPAContainer from './productPreview'

const PreviewContainer = ({ id, preview, contentType, products }) => {
  const { getLocalizedSlug, locale } = useLocale()
  const { isLoading, error, data } = useQuery(
    ['Preview Entry Point', id, contentType, locale],
    () => fetchCPAEntry({ id, contentType, locale, include: 4 }),
    {
      enabled: !!id && !!contentType && !!locale,
    }
  )

  if (isLoading) return <Loader />

  if (error) {
    return (
      <>
        <PreviewError message="Network Error" />
      </>
    )
  }

  const dataError = data?.message
  if (dataError) {
    return (
      <>
        <PreviewError message="Data Network Error" />
      </>
    )
  }

  const entryData = data?.items?.[0]
  if (!entryData) {
    return <PreviewError message={`Data could not be fetched for id "${id}"`} />
  }

  const forwardProps = { entryData, locale, products }
  const SubContainer = () => {
    switch (contentType) {
      case 'productsPage':
        return <ProductCPAContainer {...forwardProps} />
      case 'post':
        return <PostCPAContainer {...forwardProps} />
      case 'page':
        return <PageCPAContainer {...forwardProps} />
      default: {
        return (
          <PreviewError
            message={`Preview for contentType ${contentType} not yet handled`}
          />
        )
      }
    }
  }
  return (
    <>
      <SubContainer />
      <UserTools
        contentful_id={id}
        originalSlug={entryData?.originalSlug}
        category={entryData?.category}
        contentType={contentType}
        locale={locale}
      />
    </>
  )
}

export default PreviewContainer
