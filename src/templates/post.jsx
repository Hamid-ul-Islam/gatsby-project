import { Fragment } from 'react'
import { graphql, navigate } from 'gatsby'
import SEO from '@components/common/seo'
import RichTextBlock from '@components/sections/richTextBlock'
import NewsHeader from '@components/sections/newsHeader'
import HeroShort from '@components/sections/heroShort'
import { handleShopifyProductTranslations } from '@utils'
import SectionBorderWrapper from '@components/common/sectionBorderWrapper'
import { isPlayStationRedirect } from '@utils'

const Post = ({ data, pageContext }) => {
  const isPs = isPlayStationRedirect()
  if (isPs) return navigate('/playstation')

  const products = handleShopifyProductTranslations(
    data?.shopifyProducts?.products,
    data?.shopifyProductTranslations?.edges
  )
  const { author, category, published, image, richText, title, textAlignment } =
    data?.postUi

  return (
    <Fragment>
      <SEO
        title={data?.postUi?.title || 'Hot Wheels Rift Rally'}
        description={data?.postUi?.excerpt?.excerpt}
        image={data?.postUi?.image?.file?.url}
        locale={pageContext?.baseLocale}
        node_locale={pageContext?.locale}
      />
      <HeroShort title={category} backgroundMedia={{ image, type: 'Image' }} />
      <SectionBorderWrapper isBelowHero hasBackgroundTexture>
        <NewsHeader
          author={author}
          title={title}
          publishedDate={published}
          category={category}
          categoryImage={image}
        />
        <RichTextBlock
          richText={richText}
          products={products}
          renderBottomBorder
          textAlignment={textAlignment}
        />
      </SectionBorderWrapper>
    </Fragment>
  )
}

export default Post

export const query = graphql`
  query postHome(
    $locale: String!
    $baseLocale: String!
    $querySlug: String!
    $shopifyCollectionHandle: String!
  ) {
    postUi: contentfulPost(
      slug: { eq: $querySlug }
      node_locale: { eq: $locale }
    ) {
      ...basePost
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
