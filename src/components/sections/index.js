import React from 'react'
import SectionBorderWrapper from '@components/common/sectionBorderWrapper'
import Hero from '@components/sections/hero'
import FeaturedProducts from '@components/sections/featureCallout/featureCallout'
import Newsletter from '@components/sections/newsletter'
import ProductBuyNowShowcase from '@components/sections/productBuyNowShowcase'
import CreatedByVelan from '@components/sections/createdByVelan'
import HeroShort from '@components/sections/heroShort'
import RichTextBlock from '@components/sections/richTextBlock'
import Carousel from '@components/sections/carousel'
import Faq from '@components/sections/faq'
import WallsIoEmbed from '@components/sections/wallsIoEmbed'

const Section = ({ section, isBelowHero, border, downArrow, ...rest }) => {
  switch (section.__typename) {
    case 'heroShort':
    case 'ContentfulHeroShort':
      return <HeroShort {...section} {...rest} />
    case 'hero':
    case 'ContentfulHero':
      return <Hero {...section} {...rest} />
    case 'customJsScriptEmbed':
    case 'ContentfulWallsIoEmbed':
      return (
        <SectionBorderWrapper
          isBelowHero={isBelowHero}
          border={border}
          hasBackgroundTexture
        >
          <WallsIoEmbed {...section} {...rest} />
        </SectionBorderWrapper>
      )
    case 'createdByVelanStudios':
    case 'ContentfulCreatedByVelanStudios':
      return (
        <SectionBorderWrapper isBelowHero={isBelowHero} border={border}>
          <CreatedByVelan {...section} {...rest} />
        </SectionBorderWrapper>
      )
    case 'carCarousel':
    case 'ContentfulCarousel':
      return (
        <SectionBorderWrapper
          isBelowHero={isBelowHero}
          border={border}
          hasBackgroundTexture
        >
          <Carousel {...section} {...rest} />
        </SectionBorderWrapper>
      )
    case 'faq':
    case 'ContentfulFaq':
      return (
        <SectionBorderWrapper
          isBelowHero={isBelowHero}
          border={border}
          hasBackgroundTexture
        >
          <Faq {...section} {...rest} />
        </SectionBorderWrapper>
      )
    case 'featuredCallout':
    case 'featureCallout':
    case 'ContentfulFeatureCallout':
      return (
        <SectionBorderWrapper
          isBelowHero={isBelowHero}
          border={border}
          downArrow={downArrow}
        >
          <FeaturedProducts {...section} {...rest} />
        </SectionBorderWrapper>
      )
    case 'neutralTextBlock':
    case 'ContentfulNeutralTextBlock':
      return (
        <SectionBorderWrapper
          isBelowHero={isBelowHero}
          border={border}
          hasBackgroundTexture
        >
          <RichTextBlock {...section} {...rest} />
        </SectionBorderWrapper>
      )
    case 'newsletter':
    case 'ContentfulNewsletter':
      return (
        <SectionBorderWrapper isBelowHero={isBelowHero} border={border}>
          <Newsletter {...section} {...rest} />
        </SectionBorderWrapper>
      )
    case 'product2UpShowcase':
    case 'ContentfulProductBuyNowShowcase':
      return (
        <SectionBorderWrapper
          isBelowHero={isBelowHero}
          border={border}
          downArrow={downArrow}
          hasBackgroundTexture
        >
          <ProductBuyNowShowcase {...section} {...rest} />
        </SectionBorderWrapper>
      )
    default:
      return null
  }
}

const Sections = ({ sections, products }) => {
  return sections
    ?.filter((s) => s?.__typename)
    ?.map((section, index) => (
      <Section
        section={section}
        isBelowHero={index === 1}
        border={section?.border}
        downArrow={section?.downArrow}
        key={section?.id + index}
        shopifyProducts={products}
      />
    ))
}

export default Sections
