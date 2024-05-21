const path = require('path')
require('dotenv').config({
  path: `.env`,
})

exports.onCreateWebpackConfig = ({ actions, stage, loaders }) => {
  const config = {
    node: {
      fs: 'empty',
    },
    resolve: {
      alias: {
        '@images': path.resolve(__dirname, 'src/images'),
        '@videos': path.resolve(__dirname, 'src/videos'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@context': path.resolve(__dirname, 'src/context'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@containers': path.resolve(__dirname, 'src/containers'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@templates': path.resolve(__dirname, 'src/templates'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        '@themes': path.resolve(__dirname, 'src/themes'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@constants': path.resolve(__dirname, 'src/constants'),
        '@config': path.resolve(__dirname, 'config/index'),
        '@featureflags': path.resolve(__dirname, 'featureflags/index.js'),
      },
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    },
  }
  actions.setWebpackConfig(config)
}

const createContentfulPages = async ({ graphql, createPage }) => {
  const contentfulRes = await graphql(`
    {
      allContentfulPage {
        edges {
          node {
            id
            slug
            node_locale
            title
          }
        }
      }
    }
  `)

  try {
    for (page of contentfulRes.data.allContentfulPage.edges) {
      let { slug, title, node_locale } = page.node
      if (title.substring(0, 4) === '[CMS') {
        continue
      } else {
        slug = slug === 'home' ? '' : slug
        createPage({
          path: node_locale != 'en-US' ? `/${node_locale}/${slug}` : `/${slug}`,
          component: path.resolve('./src/templates', 'page.jsx'),
          context: {
            locale: node_locale,
            baseLocale: node_locale.substring(0, node_locale.length - 3),
            slug,
            querySlug: slug === '' ? 'home' : slug,
            shopifyCollectionHandle:
              process.env.SHOPIFY_PRODUCT_COLLECTION_HANDLE,
          },
        })
      }
    }
    return Promise.resolve('Success')
  } catch (e) {
    console.error(e)
    return Promise.reject(Error(e))
  }
}

const createContentfulPosts = async ({ graphql, createPage }) => {
  const contentfulRes = await graphql(`
    {
      allContentfulPost {
        edges {
          node {
            id
            slug
            node_locale
            title
            category
          }
        }
      }
    }
  `)

  try {
    for (post of contentfulRes.data.allContentfulPost.edges) {
      let { slug, title, node_locale, category } = post.node
      if (title.substring(0, 4) === '[CMS') {
        continue
      } else {
        category = category.toLowerCase()
        createPage({
          path:
            node_locale != 'en-US'
              ? `/${node_locale}/${category}/${slug}`
              : `/${category}/${slug}`,
          component: path.resolve('./src/templates', 'post.jsx'),
          context: {
            locale: node_locale,
            baseLocale: node_locale.substring(0, node_locale.length - 3),
            slug,
            querySlug: slug,
            shopifyCollectionHandle:
              process.env.SHOPIFY_PRODUCT_COLLECTION_HANDLE,
          },
        })
      }
    }
    return Promise.resolve('Success')
  } catch (e) {
    console.error(e)
    return Promise.reject(Error(e))
  }
}

const createContentfulProductsPages = async ({ graphql, createPage }) => {
  const contentfulRes = await graphql(`
    {
      allContentfulProductsPage {
        edges {
          node {
            id
            slug
            node_locale
            title
            productTabs {
              products {
                slug
              }
            }
          }
        }
      }
    }
  `)

  try {
    for (productsPage of contentfulRes.data.allContentfulProductsPage.edges) {
      let { slug: pageSlug, title, node_locale } = productsPage.node

      if (title.substring(0, 4) === '[CMS') {
        continue
      } else {
        createPage({
          path:
            node_locale != 'en-US'
              ? `/${node_locale}/${pageSlug}`
              : `/${pageSlug}`,
          component: path.resolve('./src/templates', 'pageProducts.jsx'),
          context: {
            locale: node_locale,
            baseLocale: node_locale.substring(0, node_locale.length - 3),
            slug: pageSlug,
            querySlug: pageSlug,
            shopifyCollectionHandle:
              process.env.SHOPIFY_PRODUCT_COLLECTION_HANDLE,
          },
        })
      }

      for (product of productsPage.node.productTabs.products) {
        createPage({
          path:
            node_locale != 'en-US'
              ? `/${node_locale}/${pageSlug}/${product.slug}`
              : `/${pageSlug}/${product.slug}`,
          component: path.resolve('./src/templates', 'pageProducts.jsx'),
          context: {
            locale: node_locale,
            baseLocale: node_locale.substring(0, node_locale.length - 3),
            slug: pageSlug,
            querySlug: pageSlug,
            activeProduct: product.slug,
            shopifyCollectionHandle:
              process.env.SHOPIFY_PRODUCT_COLLECTION_HANDLE,
          },
        })
      }
    }

    return Promise.resolve('Success')
  } catch (e) {
    console.error(e)
    return Promise.reject(Error(e))
  }
}

const createPreview = async ({ graphql, createPage }) => {
  const locales = ['en-US', 'es-MX', 'fr-CA']
  try {
    for (locale of locales) {
      const previewSlug = 'preview'

      createPage({
        path:
          locale != 'en-US' ? `/${locale}/${previewSlug}` : `/${previewSlug}`,
        component: path.resolve('./src/templates', 'preview.jsx'),
        context: {
          locale,
          baseLocale: locale.substring(0, locale.length - 3),
          slug: previewSlug,
          shopifyCollectionHandle:
            process.env.SHOPIFY_PRODUCT_COLLECTION_HANDLE,
        },
      })
    }
    return Promise.resolve('Success')
  } catch (e) {
    console.error(e)
    return Promise.reject(Error(e))
  }
}
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  await createContentfulPages({ graphql, createPage })
  await createContentfulPosts({ graphql, createPage })
  await createContentfulProductsPages({ graphql, createPage })

  if (process.env.PREVIEW === 'true') {
    await createPreview({ graphql, createPage })
  }

  return Promise.resolve('Success')
}
