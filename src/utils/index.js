import { isPreviewPage, formatPreviewSlug } from '@utils/preview'

export const handleFindProductShopifyEntry = ({ shopifyProducts, id }) => {
  return shopifyProducts?.find(
    (product) =>
      product.storefrontId === 'gid://shopify/Product/' + id ||
      product.storefrontId === id
  )
}

export const handleShopifyProductTranslations = (
  shopifyProducts,
  shopifyProductTranslations
) => {
  const translations = shopifyProductTranslations?.reduce((acc, { node }) => {
    acc[node?.storefrontId] = node
    return acc
  }, {})

  return shopifyProducts?.map((product) => {
    const translation = translations[product?.storefrontId]
    return {
      ...product,
      ...translation,
    }
  })
}
export const isSSR = () => typeof window === 'undefined'

export const getUrlQueryParams = () => {
  if (isSSR()) return {}
  const params = new URLSearchParams(window.location.search)
  return Object.fromEntries(params.entries())
}
export const nodeLocaleToEnglishLanguage = {
  'en-US': 'American English',
  'fr-CA': 'French',
  'es-MX': 'Spanish',
}

export const shouldDisplayOnSites = (entry, locale) =>
  entry?.displayOnSites.includes(nodeLocaleToEnglishLanguage[locale])

export const trunc = (str, len = 100) => {
  if (typeof str !== 'string') {
    return ''
  }
  if (str.length <= len) {
    return str
  }
  return str.substr(0, len - 1) + '...'
}

export const handleRedirect = ({ entryData, redirects = [] }) => {
  const redirect = redirects?.find(
    ({ fromPath }) => fromPath === `/${entryData?.originalSlug}`
  )
  const slugsToBypassRedirect = ['home']
  const bypassRedirect = slugsToBypassRedirect?.includes(
    entryData?.originalSlug
  )

  if (redirect && !bypassRedirect && !isSSR()) {
    window.location.replace(redirect?.toUrl)
  }
}

export const isEmailValid = (email) => {
  var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
  return emailRegex.test(email)
}

export const parseUrlToSlugAndHref = (url) => {
  const href = url?.match(/^(http|https|mailto|tel):\/\//) ? url : null
  const formattedSlug = url?.match(/^\/.+/) ? url.slice(1) : url
  const slug = href ? null : formattedSlug

  return [slug, href]
}

export const handleScrollToFirstPreorderSection = (event) => {
  if (event) event.preventDefault()
  const preOrderSection = document.querySelector('.product-buy-now-show-case')

  preOrderSection?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })

  // pre-order event
  typeof window !== 'undefined' &&
    window.gtag &&
    window.gtag('event', 'pre_order_button_click', {
      event_category: 'Button',
      event_label: 'Preorder button',
    })
}

export const isExternalURL = (url) => {
  const domain = (url) =>
    url?.replace('http://', '')?.replace('https://', '')?.split('/')[0]
  return (
    typeof window !== 'undefined' &&
    domain(window?.location.href) !== domain(url)
  )
}

export const parseQueryString = (query, queryVariable) => {
  const variables = query.split('&')
  for (let i = 0; i < variables.length; i++) {
    let pair = variables[i].split('=')

    if (decodeURIComponent(pair[0]) === queryVariable) {
      return decodeURIComponent(pair[1])
    }
  }
}

export const sanitizeAndAddYoutubeThumbnailUrls = (youtubeVideoUrls) =>
  youtubeVideoUrls?.map((url) => {
    const queryParams = url?.split('?')[1]
    const videoId = parseQueryString(queryParams, 'v')

    return {
      id: videoId,
      url: 'https://www.youtube.com/embed/' + videoId,
      thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    }
  })

export const formattedLinkType = (type) => {
  if (type === 'ContentfulPage' || type === 'page') {
    return 'page'
  } else if (type === 'ContentfulPost' || type === 'post') {
    return 'post'
  } else if (type === 'ContentfulProductsPage' || type === 'productsPage') {
    return 'productsPage'
  } else if (type === 'ContentfulProduct' || type === 'product') {
    return 'product'
  } else {
    return 'url'
  }
}

export const getUrl = (type, target) => {
  if (type === 'page' || type === 'post' || type === 'productsPage') {
    return !isPreviewPage()
      ? target?.slug === 'home'
        ? '/'
        : target?.slug
      : formatPreviewSlug(target?.id, type)
  } else if (type === 'url') {
    return target?.url
  } else if (type === 'product') {
    return !isPreviewPage()
      ? target?.parentSlug + '/' + target?.slug
      : formatPreviewSlug(target?.id, type)
  }
}

export const renderText = (text) => {
  return text
    .split('\n')
    .reduce(
      (children, textSegment, index) => [
        ...children,
        index > 0 && <br key={index} />,
        textSegment,
      ],
      []
    )
}

// convert json to url param string

const isObj = function (a) {
  if (!!a && a.constructor === Object) {
    return true
  }
  return false
}
const _st = function (z, g) {
  return '' + (g != '' ? '[' : '') + z + (g != '' ? ']' : '')
}
export const fromObject = function (params, skipobjects, prefix) {
  if (skipobjects === void 0) {
    skipobjects = false
  }
  if (prefix === void 0) {
    prefix = ''
  }
  var result = ''
  if (typeof params != 'object') {
    return prefix + '=' + encodeURIComponent(params) + '&'
  }
  for (var param in params) {
    var c = '' + prefix + _st(param, prefix)
    if (isObj(params[param]) && !skipobjects) {
      result += fromObject(params[param], false, '' + c)
    } else if (Array.isArray(params[param]) && !skipobjects) {
      params[param].forEach(function (item, ind) {
        result += fromObject(item, false, c + '[' + ind + ']')
      })
    } else {
      result += c + '=' + encodeURIComponent(params[param]) + '&'
    }
  }
  return result
}

// conver json to Pinterest url params
export const JsonToPinterestUrlParams = (data) => {
  const urlParams = fromObject(data)
  return urlParams
    ?.slice(0, -1)
    ?.replaceAll('line_items', 'ed')
    ?.replaceAll('%20', '+')
}

export const isPlayStation = () => {
  if (typeof navigator === 'undefined') return false
  const userAgent = navigator.userAgent.toLowerCase()
  if (userAgent.indexOf('playstation') !== -1) {
    if (
      userAgent.indexOf('playstation 4') !== -1 ||
      userAgent.indexOf('playstation 5') !== -1
    ) {
      return true
    }
  }
  return false
}
export const isPlayStationRedirect = () => {
  if (typeof navigator === 'undefined') return false
  const userAgent = navigator.userAgent.toLowerCase()
  const isPlayStationSlug = window.location.pathname === '/playstation'

  if (isPlayStationSlug) return false
  if (userAgent.indexOf('playstation') !== -1) {
    if (
      userAgent.indexOf('playstation 4') !== -1 ||
      userAgent.indexOf('playstation 5') !== -1
    ) {
      return true
    }
  }
  return false
}
