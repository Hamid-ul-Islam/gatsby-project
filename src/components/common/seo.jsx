import { graphql, useStaticQuery } from 'gatsby'
import { Helmet } from 'react-helmet'

const SEO = ({ title, description, image, locale, node_locale }) => {
  const seoDefaultData = useStaticQuery(graphql`
    query {
      contentfulDefaults: allContentfulSite(
        filter: { name: { ne: "[CMS SCHEMA REQUIRED]" } }
      ) {
        nodes {
          siteTitle: name
          siteDescription: description
          node_locale
        }
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
      ogImageDefault: file(relativePath: { eq: "og-image.png" }) {
        childImageSharp {
          fixed(height: 630, width: 1200) {
            src
          }
        }
      }
    }
  `)
  const localizedContentfulData =
    seoDefaultData.contentfulDefaults.nodes.filter(
      (item) => item.node_locale === node_locale
    )[0]
  const { siteUrl } = seoDefaultData.site.siteMetadata
  const { siteTitle, siteDescription } = localizedContentfulData

  const defaulOgImagePath = constructUrl(
    siteUrl,
    seoDefaultData.ogImageDefault.childImageSharp.fixed.src
  )
  const metaImage = image || defaulOgImagePath
  const metaTitle = title || siteTitle
  const metaDescription = description || siteDescription

  return (
    <Helmet
      titleTemplate={`%s - ${siteTitle}`}
      defaultTitle={siteTitle}
      title={metaTitle}
    >
      <html lang={locale || 'en'} />
      <meta charSet="utf-8" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content={metaTitle} />
      <meta name="description" content={metaDescription} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta name="twitter:card" content="summary_large_image" />
      <link rel="stylesheet" href="https://use.typekit.net/srb2ukn.css"></link>
    </Helmet>
  )
}

export default SEO

function constructUrl(baseUrl, path) {
  if (baseUrl === '' || path === '') return ''
  return `${baseUrl}${path}`
}
