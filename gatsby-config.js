require('dotenv').config({
  path: `.env`,
})

module.exports = {
  flags: {
    DEV_SSR: process.env.GATSBY_ENABLE_DEV_SSR === 'true',
  },
  siteMetadata: {
    title: 'Hot Wheels® Rift Rally',
    description:
      'Drive the Chameleon RC car and watch it transform virtually into legendary Hot Wheels®. Drift, stunt and race to the finish line on a mixed reality track that YOU create.',
    siteUrl: `https://www.riftrally.com/`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: process.env.GATSBY_GOOGLE_TAG_MANAGER,
        includeInDevelopment: false,
      },
    },

    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Hot Wheels® Rift Rally',
        short_name: 'Hot Wheels® Rift Rally',
        start_url: '/',
        background_color: '#FFA500',
        theme_color: '#f7c6a5',
        display: 'minimal-ui',
        icon: 'src/images/favicon-blue.png',
        crossOrigin: `use-credentials`,
      },
    },
    {
      resolve: 'gatsby-source-shopify',
      options: {
        downloadImages: true,
        storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
        password: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        shopifyConnections: ['collections'],
      },
    },
    {
      resolve: `gatsby-source-shopify-translations`,
      options: {
        shopName: process.env.GATSBY_SHOPIFY_STORE_URL,
        shopifyPassword: process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN,
        accessToken: process.env.GATSBY_STOREFRONT_ACCESS_TOKEN,
        sourceOnlyMode: true,
        locales: ['en', 'es', 'fr'],
      },
    },
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN,
        environment: process.env.GATSBY_CONTENTFUL_ENVIRONMENT,
      },
    },
    'gatsby-plugin-image',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-transition-link',
    'gatsby-plugin-postcss',
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: process.env.AWS_TARGET_BUCKET_NAME || 'qa-1',
        acl: null,
        generateRedirectObjectsForPermanentRedirects: true,
      },
    },
  ],
  jsxRuntime: 'automatic',
}
