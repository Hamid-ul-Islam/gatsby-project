import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCPAEntries } from '@utils/preview'
import { handleRedirect } from '@utils'
import SEO from '@components/common/seo'
import HeroShort from '@components/sections/heroShort/index.jsx'
import ProductSubnav from '@components/sections/productSubnav/index.jsx'
import Loader from './loader.jsx'

const ProductCPAContainer = ({ entryData, locale, products, ...rest }) => {
  const forwardProps = { entryData, ...rest }

  const { excerpt, title, hero, productTabs, slug } = entryData

  switch (entryData?.id) {
    default:
      return (
        <React.Fragment>
          <SEO
            title={title || 'Hot Wheels Rift Rally'}
            description={excerpt}
            locale={locale?.slice(0, 2)}
            node_locale={locale}
          />
          <HeroShort title={title} backgroundMedia={hero?.backgroundMedia} />
          <ProductSubnav
            products={productTabs?.products}
            shopifyProducts={products}
            addToCartDisplayText={productTabs?.addToCartDisplayText}
            pageSlug={slug}
            // activeProduct={pageContext?.activeProduct}
          />
        </React.Fragment>
      )
  }
}

export default ProductCPAContainer
