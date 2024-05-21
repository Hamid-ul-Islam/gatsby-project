const { isEnabledForDevelopersOnly } = require('./featureflags')

const debugFlags = {
  FETCH: 'FETCH',
  REACT_SELECT_SEARCH: 'REACT_SELECT_SEARCH',
  PREVIEW: 'PREVIEW',
  NAVIGATION: 'NAVIGATION',
}

/**
 * By default, all configs will be set to false to prevent bloating the console
 * Developers can enable these configs by setting the value to true in the
 * debugConfig object below
 */
const debugConfig = {
  FETCH: false,
  REACT_SELECT_SEARCH: false,
  PREVIEW: false,
  NAVIGATION: false,
}

const isDebugEnabled = (feature) => {
  if (
    !isEnabledForDevelopersOnly &&
    process.env.GATSBY_ENABLE_DEBUG !== 'true'
  ) {
    return false
  }

  return debugConfig[feature]
}

const debugWrapper = (feature, cb = () => {}) => {
  if (typeof window === 'undefined') return
  if (isDebugEnabled(feature)) {
    cb()
  }
}

module.exports = {
  debugWrapper,
  debugFlags,
}
