import { Fragment } from 'react'
import { graphql, navigate } from 'gatsby'
import SEO from '@components/common/seo'
import Sections from '@components/sections'
import { handleShopifyProductTranslations } from '@utils'
import { isPlayStationRedirect } from '@utils'

const Page = ({ data, pageContext }) => {
  const isPs = isPlayStationRedirect()
  if (isPs) return navigate('/playstation')

  const products = handleShopifyProductTranslations(
    data?.shopifyProducts?.products,
    data?.shopifyProductTranslations?.edges
  )

  return (
    <Fragment>
      <SEO
        title={data?.pageUi?.title || 'Hot Wheels Rift Rally'}
        description={data?.pageUi?.excerpt?.excerpt}
        locale={pageContext?.baseLocale}
        node_locale={pageContext?.locale}
      />
      <Sections sections={data?.pageUi?.sections} products={products} />
    </Fragment>
  )
}

export default Page

export const query = graphql`
  query pageHome(
    $locale: String!
    $baseLocale: String!
    $querySlug: String!
    $shopifyCollectionHandle: String!
  ) {
    pageUi: contentfulPage(
      slug: { eq: $querySlug }
      node_locale: { eq: $locale }
    ) {
      ...basePage
      ...sections
    }
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
