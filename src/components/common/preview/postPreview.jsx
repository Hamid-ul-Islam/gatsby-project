import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchCPAEntries } from '@utils/preview'
import { handleRedirect } from '@utils'
import Loader from './loader.jsx'
import SEO from '@components/common/seo'
import HeroShort from '@components/sections/heroShort'
import SectionBorderWrapper from '@components/common/sectionBorderWrapper'
import RichTextBlock from '@components/sections/richTextBlock'
import NewsHeader from '@components/sections/newsHeader'

const PostCPAContainer = ({ entryData, locale, ...rest }) => {
  const forwardProps = { entryData, ...rest }

  const { excerpt, author, category, published, image, richText, title } =
    entryData

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
          <HeroShort
            title={category}
            backgroundMedia={{ image, type: 'Image' }}
          />
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
              {...forwardProps}
              renderBottomBorder
            />
          </SectionBorderWrapper>
        </React.Fragment>
      )
  }
}

export default PostCPAContainer
