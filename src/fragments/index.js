import { graphql } from 'gatsby'

export const assetBase = graphql`
  fragment assetBase on ContentfulAsset {
    id: contentful_id
    title
    description
    file {
      url
      contentType
    }
  }
`

export const videoEmbed = graphql`
  fragment videoEmbed on ContentfulVideoEmbed {
    id: contentful_id
    __typename
    videoEmbedUrl
  }
`

export const backgroundMedia = graphql`
  fragment backgroundMedia on ContentfulBackgroundMedia {
    id: contentful_id
    __typename
    type
    video {
      file {
        url
      }
    }
    image {
      title
      description
      gatsbyImageData(width: 1920, formats: [JPG, WEBP], placeholder: NONE)
      file {
        url
      }
    }
  }
`

export const link = graphql`
  fragment link on ContentfulLink {
    id: contentful_id
    __typename
    internalNickname
    node_locale
    displayText
    analyticsTagId
    target {
      __typename
      ... on ContentfulPage {
        id: contentful_id
        slug
        locale: node_locale
        node_locale
      }
      ... on ContentfulUrl {
        url
      }
      # ... on ContentfulPost {
      #   id: contentful_id
      # }
      ...baseProductsPage
      ...product
      ...videoEmbed
    }
  }
`

export const product = graphql`
  fragment product on ContentfulProduct {
    id: contentful_id
    __typename
    title
    productSlug
    shopifyStorefrontId
    slug
    parentSlug
  }
`

export const productDetails = graphql`
  fragment productDetails on ContentfulProduct {
    productName
    productVariantName
    productPageTabImage {
      gatsbyImageData(width: 480, placeholder: NONE)
    }
    featuredImage {
      gatsbyImageData(width: 1920, placeholder: NONE)
    }
    description {
      raw
    }
    carousel {
      ...assetBase
      gatsbyImageData(width: 960, placeholder: NONE, formats: [JPG, WEBP])
    }
    whatsIncluded {
      title
      includedItems {
        ...assetBase
        gatsbyImageData(width: 960, placeholder: NONE, formats: [JPG, WEBP])
      }
    }
    faq {
      ...faqSection
    }
    displayOnSites
    displayProductCallOut
    productCallOutText
    productDisclaimerText
    productIcon {
      ...assetBase
      gatsbyImageData(width: 64, placeholder: NONE, formats: [JPG, WEBP])
    }
    bannerLink
    analyticsTagId
    bannerLinkTrackingId
  }
`

export const wallsIoCustomJavascriptEmbed = graphql`
  fragment wallsIoCustomJavascriptEmbed on ContentfulWallsIoEmbed {
    id: contentful_id
    __typename
    node_locale
  }
`

export const featureCalloutSection = graphql`
  fragment featureCalloutSection on ContentfulFeatureCallout {
    id: contentful_id
    __typename
    title
    downArrow
    border
    link {
      ...link
    }
    excerpt {
      excerpt
    }
    backgroundMedia {
      ...backgroundMedia
    }
    calloutPlacementLeft
  }
`

export const heroShortSection = graphql`
  fragment heroShortSection on ContentfulHeroShort {
    id: contentful_id
    __typename
    title
    backgroundMedia {
      ...backgroundMedia
    }
  }
`

export const heroSection = graphql`
  fragment heroSection on ContentfulHero {
    id: contentful_id
    __typename
    title
    titleLine1
    titleLine2
    titleLine3
    subtitle1
    subtitle
    comingSoonLine1
    comingSoonLine2
    ctaLink1 {
      ...link
    }
    ctaLink2 {
      ...link
    }
    backgroundMedia {
      ...backgroundMedia
    }
    downloadLink1 {
      ...link
    }
    downloadLink2 {
      ...link
    }
    downloadLink3 {
      ...link
    }
    downloadLink4 {
      ...link
    }
    deviceListLink {
      ...link
    }
  }
`

export const newsletterSection = graphql`
  fragment newsletterSection on ContentfulNewsletter {
    id: contentful_id
    __typename
    title
    inputText
    ctaButtonText
    emailDisclaimerText
    successText
    errorText
    border
  }
`

export const productBuyNowShowcaseSection = graphql`
  fragment productBuyNowShowcaseSection on ContentfulProductBuyNowShowcase {
    id: contentful_id
    __typename
    title
    border
    downArrow
    addToCartDisplayText
    products {
      ...product
      ...productDetails
    }
    bannerText
    bannerLogo {
      ...assetBase
      gatsbyImageData
    }
    bannerLink
    bannerLinkTrackingId
    productTrackingLink1
    productTrackingLink2
    displayBanner
  }
`

export const xlItemShowcaseSection = graphql`
  fragment xlItemShowcaseSection on ContentfulXlItemShowcase {
    id: contentful_id
    __typename
    title
    subtitle
  }
`

export const createdByVelanSection = graphql`
  fragment createdByVelanSection on ContentfulCreatedByVelanStudios {
    id: contentful_id
    __typename
    title
    excerpt {
      excerpt
    }
    logo {
      ...assetBase
      gatsbyImageData
    }
    border
  }
`

export const blurb = graphql`
  fragment blurb on ContentfulBlurb {
    id: contentful_id
    __typename
    textAlignment
    richText {
      raw
      references {
        ...link
        ...assetBase
      }
    }
  }
`

export const cardBlock = graphql`
  fragment cardBlock on ContentfulCardBlock {
    id: contentful_id
    __typename
    node_locale
    cards {
      ... on ContentfulPost {
        node_locale
        slug
        category
        excerpt {
          excerpt
        }
        title
        image {
          ...assetBase
        }
      }
    }
  }
`

export const neutralTextBlockSection = graphql`
  fragment neutralTextBlockSection on ContentfulNeutralTextBlock {
    id: contentful_id
    __typename
    textAlignment
    richText {
      raw
      references {
        ...assetBase
        __typename
        ...cardBlock
        ...wallsIoCustomJavascriptEmbed
        ...basePage
        ...faqSection
        ...blurb
        ...carouselSection
      }
    }
    border
  }
`

export const carouselSection = graphql`
  fragment carouselSection on ContentfulCarousel {
    id: contentful_id
    __typename
    videoUrls
    border
  }
`

export const question = graphql`
  fragment question on ContentfulQuestionAndAnswer {
    id: contentful_id
    __typename
    question {
      question
    }
    richText {
      raw
      references {
        __typename
        ...basePage
        ... on ContentfulPost {
          node_locale
          slug
          id: contentful_id
          category
          title
        }
        ...product
        ... on ContentfulProductsPage {
          id: contentful_id
          title
          node_locale
          displayOnSites
          title
          slug
        }
      }
    }
  }
`

export const faqSection = graphql`
  fragment faqSection on ContentfulFaq {
    id: contentful_id
    __typename
    title
    questions {
      ...question
    }
    border
  }
`

export const productTabsSection = graphql`
  fragment productTabsSection on ContentfulProductTabs {
    id: contentful_id
    __typename
    products {
      ...product
      ...productDetails
    }
    addToCartDisplayText
  }
`

export const whatsIncludedCalloutSection = graphql`
  fragment whatsIncludedCalloutSection on ContentfulWhatsIncludedCallout {
    id: contentful_id
    __typename
    title
    includedItems {
      ...assetBase
    }
  }
`

export const sections = graphql`
  fragment sections on ContentfulPage {
    sections {
      ...carouselSection
      ...faqSection
      # ...productTabsSection
      # ...whatsIncludedCalloutSection
      ...neutralTextBlockSection
      ...heroSection
      ...heroShortSection
      ...featureCalloutSection
      ...newsletterSection
      ...productBuyNowShowcaseSection
      ...createdByVelanSection
    }
  }
`

export const basePost = graphql`
  fragment basePost on ContentfulPost {
    id: contentful_id
    title
    category
    author
    node_locale
    displayOnSites
    createdAt
    published(formatString: "MM.DD.YY")
    slug
    textAlignment
    richText {
      raw
      references {
        # ...assetBase
        __typename
        ...faqSection
        ...carouselSection
        ...cardBlock
        ...wallsIoCustomJavascriptEmbed
        ...assetBase
        # ...basePage
        ...blurb
      }
    }
    image {
      title
      description
      gatsbyImageData(width: 1920, formats: [JPG, WEBP], placeholder: NONE)
      file {
        url
      }
    }
    excerpt {
      excerpt
    }
  }
`

export const basePage = graphql`
  fragment basePage on ContentfulPage {
    id: contentful_id
    title
    node_locale
    displayOnSites
    title
    slug
    ogImage {
      file {
        url
      }
      description
    }
    excerpt {
      excerpt
    }
  }
`

export const baseProductsPage = graphql`
  fragment baseProductsPage on ContentfulProductsPage {
    id: contentful_id
    title
    node_locale
    displayOnSites
    title
    slug
    ogImage {
      file {
        url
      }
      description
    }
    hero {
      ...heroShortSection
    }
    productTabs {
      ...productTabsSection
    }
    bannerText
    bannerLogo {
      ...assetBase
      gatsbyImageData
    }
    displayBanner
  }
`
