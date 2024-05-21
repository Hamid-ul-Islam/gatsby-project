import React from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import AddToCart from '../common/addToCart'
import { handleFindProductShopifyEntry } from '@utils'
import Link from '@components/common/link'
import { featureFlags, isFeatureEnabled } from '@featureflags'
import IconShoppingCart from '@images/icon-cart.svg'
import { renderRichText } from '@components/common/richText'
import Image from '@components/common/image'

const Product = ({
  variants,
  titleShopify,
  featuredImageShopify,
  title,
  featuredImage,
  variantTitle,
  description,
  descriptionHtml,
  addToCartDisplayText,
  slug,
  parentSlug,
  contentfulId,
  analyticsTagId,
}) => {
  const productTarget = [
    {
      slug,
      parentSlug,
      __typename: 'ContentfulProduct',
      id: contentfulId,
    },
  ]
  return isFeatureEnabled(featureFlags.PREORDER_SITE) ? (
    <>
      <GatsbyImage
        alt={title || 'product'}
        className="mb-6 rounded-lg shadow-lg shadow-gray-300 md:mb-8"
        image={
          featuredImageShopify?.localFile?.childImageSharp?.gatsbyImageData
        }
      />
      <h2 className="mb-6 font-tacticSansExt text-lg uppercase md:text-xl">
        {titleShopify}
      </h2>
      <div
        className="mb-6 font-itcGothic"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
      <AddToCart
        variants={variants}
        addToCartDisplayText={addToCartDisplayText}
        analyticsTagId={analyticsTagId}
      />
    </>
  ) : (
    <>
      <Image
        src={featuredImage}
        alt={title || 'product'}
        className="mb-6 rounded-lg shadow-lg shadow-gray-300 md:mb-8"
      />
      <h2 className="mb-6 flex flex-col gap-1 font-tacticSansExt uppercase lg:gap-2">
        <span className="block text-[20px] leading-[24px]">{title}</span>
        <span className="block text-[32px] leading-[38px]">{variantTitle}</span>
      </h2>
      <div className="mb-6">{renderRichText(description)}</div>
      <Link
        target={productTarget}
        icon={<IconShoppingCart />}
        displayText={addToCartDisplayText}
        className="min-w-[300px] sm:min-w-[324px]"
        id={analyticsTagId}
      />
    </>
  )
}

const ProductGrid = ({
  products,
  shopifyProducts,
  className,
  addToCartDisplayText,
  productTrackingLink1,
  productTrackingLink2,
}) => {
  return (
    <div
      className={`grid w-full grid-cols-1 gap-[72px] lg:grid-cols-2 ${className}`}
    >
      {products.map((product, index) => {
        const productShopifyEntry = handleFindProductShopifyEntry({
          shopifyProducts,
          id: product.productSlug,
        })
        return (
          <div
            key={productShopifyEntry?.id + index || index}
            className={`flex flex-col items-start justify-between`}
          >
            <Product
              contentfulId={product?.id}
              slug={product?.slug}
              parentSlug={product?.parentSlug}
              title={product?.productName}
              variantTitle={product?.productVariantName}
              description={product?.description}
              featuredImage={product?.featuredImage}
              analyticsTagId={
                (index = 0 ? productTrackingLink1 : productTrackingLink2)
              }
              variants={productShopifyEntry?.variants}
              addToCartDisplayText={addToCartDisplayText}
              // TODO: remove these once we have all the data in contentful and full site is enabled
              titleShopify={productShopifyEntry?.title}
              featuredImageShopify={productShopifyEntry?.featuredImage}
              descriptionHtml={productShopifyEntry?.descriptionHtml}
              // end TODO
            />
          </div>
        )
      })}
    </div>
  )
}

export default ProductGrid
