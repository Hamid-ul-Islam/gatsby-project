import { useMedia } from 'react-use'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage } from 'gatsby-plugin-image'
import { useLocale } from '@context/localeContext'
import { isPreviewPage, formatPreviewSlug } from '@utils/preview'
import { formattedLinkType, getUrl } from '@utils'
import HeaderMobile from './subcomponents/headerMobile'
import HeaderDesktop from './subcomponents/headerDesktop'
import HeaderPs from './subcomponents/headerPs'
import { isPlayStation } from '@utils'

const Header = () => {
  const { locale } = useLocale()
  const isPs = isPlayStation()

  const headerContentfulData = useStaticQuery(graphql`
    {
      header: allContentfulHeaderNavigation(
        filter: { internalNickname: { ne: "[CMS SCHEMA REQUIRED]" } }
      ) {
        nodes {
          node_locale
          logoLink {
            id: contentful_id
            displayText
            target {
              ... on ContentfulPage {
                __typename
                id: contentful_id
                slug
                displayOnSites
              }
            }
          }
          links {
            id: contentful_id
            displayText
            target {
              ... on ContentfulPage {
                __typename
                id: contentful_id
                slug
                displayOnSites
              }
              ... on ContentfulProductsPage {
                __typename
                id: contentful_id
                slug
                displayOnSites
              }
              ... on ContentfulUrl {
                __typename
                url
              }
            }
          }
        }
      }
      logo: file(relativePath: { eq: "header/rr-logo-3x.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: NONE, quality: 50)
        }
      }
      logoHorizontal: file(
        relativePath: { eq: "header/rr-logo-horizontal-3x.png" }
      ) {
        childImageSharp {
          gatsbyImageData(placeholder: NONE, quality: 50)
        }
      }
    }
  `)

  const isDesktop = useMedia('(min-width: 1280px)')

  const logo = getImage(headerContentfulData?.logo)
  const logoHorizontal = getImage(headerContentfulData?.logoHorizontal)

  const headerLocalized = headerContentfulData?.header?.nodes?.filter(
    (n) => n.node_locale === locale
  )?.[0]

  const links = headerLocalized?.links
  const logoLink = headerLocalized?.logoLink

  const homeUrl = !isPreviewPage()
    ? '/'
    : formatPreviewSlug(logoLink?.target?.[0]?.id, 'page')

  const getFormattedLinks = (links) =>
    links
      ?.map((link) => ({
        ...link,
        target: {
          ...link.target?.[0],
          type: formattedLinkType(link.target?.[0]?.__typename),
        },
      }))
      ?.filter(
        (link) =>
          link.target?.type === 'url' ||
          link.target?.displayOnSites?.includes(locale)
      )
      ?.map((link) => ({
        id: link.id,
        label: link.displayText,
        url: getUrl(link.target?.type, link.target),
        ...(link.target?.category && { category: link.target?.category }),
        type: link.target?.type !== 'url' ? 'internal' : 'external',
      }))

  const linksDesktop = getFormattedLinks(links)
  const linksMobile = getFormattedLinks([logoLink, ...links])

  if (isPs) {
    return (
      <HeaderPs
        links={[]}
        logo={logo}
        logoHorizontal={logoHorizontal}
        homeUrl={homeUrl}
      />
    )
  }

  return isDesktop ? (
    <HeaderDesktop
      links={linksDesktop}
      logo={logo}
      logoHorizontal={logoHorizontal}
      homeUrl={homeUrl}
    />
  ) : (
    <HeaderMobile
      links={linksMobile}
      logo={logo}
      logoHorizontal={logoHorizontal}
      homeUrl={homeUrl}
    />
  )
}

export default Header
