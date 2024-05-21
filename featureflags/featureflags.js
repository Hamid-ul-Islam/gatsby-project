/**
 * Feature flags for both build time and run time
 * Remove flags when they are released as official features
 * or move them to nonExperimental flags if they are meant to be used as tools for non-prod envs
 *
 * General Rules for checking functions:
 *  - If feature is only for developers, enable only on dev
 *  - If feature is ready for client review, disable only on master
 *  - By default, enable if flag is set to true
 *
 */

const experimentalFlags = {
  ALGOLIA_SEARCH: 'ALGOLIA_SEARCH',
}

const nonExperimentalFlags = {
  USER_TOOLS: 'USER_TOOLS',
  GTAG: 'GTAG',
  SAMPLE_PAGES: 'SAMPLE_PAGES',
  DEBUG: 'DEBUG',
  PREORDER_SITE: 'PREORDER_SITE',
}

const featureFlags = {
  ...experimentalFlags,
  ...nonExperimentalFlags,
}

const variants = {}

const isEnvironment = (env) => {
  return process.env.GATSBY_CONTENTFUL_ENVIRONMENT === env
}

// Process Flags
const isEnabledForDevelopersOnly = isEnvironment('dev')
const isEnabledForClientReview = !isEnvironment('master')
const isEnabledForQA = isEnvironment('qa')
const isEnabledForProdPreview = process.env.GATSBY_PROD_PREVIEW === 'true'

// Helper functions
const isUserToolsEnabled = () => {
  return process.env.GATSBY_ENABLE_USER_TOOLS === 'true'
}

const isAlgoliaSearchEnabled = () => {
  return process.env.GATSBY_ENABLE_ALGOLIA_SEARCH === 'true'
}

const isGtagEnabled = () => {
  return process.env.GATSBY_ENABLE_GTAG === 'true'
}

const isSamplePagesEnabled = () => {
  return process.env.GATSBY_ENABLE_SAMPLE_PAGES === 'true'
}

const isDebugEnabled = () => {
  return (
    process.env.GATSBY_ENABLE_DEBUG === 'true' || isEnabledForDevelopersOnly
  )
}

const isFullSiteEnabled = () => {
  return (
    process.env.GATSBY_ENABLE_FULL_SITE === 'true' ||
    process.env.FULL_SITE === 'true'
  )
}

const isPreorderEnabled = () => {
  return (
    process.env.GATSBY_ENABLE_PREORDER_SITE === 'true' ||
    process.env.PREORDER_SITE === 'true'
  )
}

// Feature Selector
const isFeatureEnabled = (feature, variant) => {
  switch (feature) {
    case featureFlags.USER_TOOLS:
      return isUserToolsEnabled()
    case featureFlags.ALGOLIA_SEARCH:
      return isAlgoliaSearchEnabled()
    case featureFlags.GTAG:
      return isGtagEnabled()
    case featureFlags.SAMPLE_PAGES:
      return isSamplePagesEnabled()
    case featureFlags.DEBUG:
      return isDebugEnabled()
    case featureFlags.PREORDER_SITE:
      return isFullSiteEnabled()
    default:
      return false
  }
}

// Need to use this form for node (gatsby createPages)
module.exports = {
  isFeatureEnabled,
  isEnvironment,
  featureFlags,
  variants,
  isEnabledForDevelopersOnly,
  isEnabledForClientReview,
  isEnabledForProdPreview,
  isUserToolsEnabled,
}
