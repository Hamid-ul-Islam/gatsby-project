import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import { getUrlQueryParams } from '@utils'
import { usePreviewContext } from '@context/previewContext'
import PreviewError from '@components/common/preview/previewError'
import PreviewContainer from '@components/common/preview/previewContainer'
import { handleShopifyProductTranslations } from '@utils'

/**
 *
 * Example Preview Links can be found by going to
 * Preview > Preview Links
 * full-site
 * Page
 *  http://localhost:8000/preview?contentType=page&id=5GMQr5CErSKhqStFsxfWgK
 * home
 * http://localhost:8000/preview?contentType=page&id=5cmJWet0gTbbkjsUD1uAnN

 * Post
 *  http://localhost:8000/preview?contentType=post&id=4L9tDWNObTRGNyoZFUonKY
 *
 * TODO
 * Product Page, Product
 *  http://localhost:8000/preview?contentType=productsPage&id=65LgFtBbrkp7q6aWhSdwwG
 *  http://localhost:8000/preview?contentType=product&id=5l71VpwuBfpddQsPZjkkLq
 *
 */

const Preview = ({ data, pageContext, location }) => {
  const { previewState, setPreviewState } = usePreviewContext()
  const products = handleShopifyProductTranslations(
    data?.shopifyProducts?.products,
    data?.shopifyProductTranslations?.edges
  )

  useEffect(() => {
    const urlQueryParams = getUrlQueryParams()
    const { id, contentType } = urlQueryParams
    setPreviewState({ id, contentType, preview: true })
  }, [location])

  if (!previewState?.id || !previewState?.contentType) {
    return (
      <>
        <PreviewError message={`Missing "id" or "contentType"`} />
      </>
    )
  }

  return (
    <>
      <PreviewContainer
        {...pageContext}
        {...previewState}
        id={previewState?.id}
        contentType={previewState?.contentType}
        preview={previewState?.preview}
        products={products}
      />
    </>
  )
}

export default Preview

export const query = graphql`
  query preview($baseLocale: String!, $shopifyCollectionHandle: String!) {
    shopifyProductTranslations: allShopifyTranslatedProduct(
      filter: { locale: { eq: $baseLocale } }
    ) {
      edges {
        node {
          title
          handle
          productType
          id
          description
          descriptionHtml
          storefrontId
        }
      }
    }
    shopifyProducts: shopifyCollection(
      handle: { eq: $shopifyCollectionHandle }
    ) {
      products {
        storefrontId
        featuredImage {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
          altText
        }
        variants {
          id
          price
          title
          storefrontId
        }
      }
    }
  }
`
