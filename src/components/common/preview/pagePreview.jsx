import React from 'react'
import SEO from '@components/common/seo'
import Sections from '@components/sections'

const PageCPAContainer = ({ entryData, locale, products }) => {
  const { excerpt, title } = entryData

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
          <Sections sections={entryData?.sections} products={products} />
        </React.Fragment>
      )
  }
}

export default PageCPAContainer
