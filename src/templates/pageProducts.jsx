import { Fragment } from 'react'
import { graphql, navigate } from 'gatsby'
import SEO from '@components/common/seo'
import { handleShopifyProductTranslations } from '@utils'
import HeroShort from '@components/sections/heroShort'
import ProductSubnav from '@components/sections/productSubnav'
import { isPlayStationRedirect } from '@utils'

const PageProducts = ({ data, pageContext }) => {
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
      <HeroShort
        title={data?.pageUi?.hero?.title}
        backgroundMedia={data?.pageUi?.hero?.backgroundMedia}
      />
      <ProductSubnav
        products={data?.pageUi?.productTabs?.products}
        shopifyProducts={products}
        bannerText={data?.pageUi?.bannerText}
        bannerLogo={data?.pageUi?.bannerLogo}
        displayBanner={data?.pageUi?.displayBanner}
        addToCartDisplayText={data?.pageUi?.productTabs?.addToCartDisplayText}
        pageSlug={data?.pageUi?.slug}
        activeProduct={pageContext?.activeProduct}
      />
    </Fragment>
  )
}

export default PageProducts

export const query = graphql`
  query pageProducts(
    $locale: String!
    $baseLocale: String!
    $querySlug: String!
    $shopifyCollectionHandle: String!
  ) {
    pageUi: contentfulProductsPage(
      slug: { eq: $querySlug }
      node_locale: { eq: $locale }
    ) {
      ...baseProductsPage
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
