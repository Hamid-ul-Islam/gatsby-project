/* eslint-disable camelcase */
import { debugFlags, debugWrapper } from '@featureflags'
import { recursivelyGetLinkedReferencesAndSpreadFields } from './preview'

// Reference:
// https://www.contentful.com/developers/docs/references/content-preview-api/#/reference/search-parameters/full-text-search/query-entries/console

const cdnHost = 'cdn.contentful.com'
const previewHost = 'preview.contentful.com'
const spaceID = process.env.GATSBY_CONTENTFUL_SPACE_ID
const environment = process.env.GATSBY_CONTENTFUL_ENVIRONMENT
const accessToken = process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN
const previewAccessToken = process.env.GATSBY_CONTENTFUL_PREVIEW_ACCESS_TOKEN

export const fetchCDAEntries = async (params) => {
  const cdaUri = `https://${cdnHost}/spaces/${spaceID}/environments/${environment}/entries?access_token=${accessToken}`
  return fetchEntries({ ...params, uri: cdaUri })
}

export const fetchCPAEntries = async (params) => {
  const cpaUri = `https://${previewHost}/spaces/${spaceID}/environments/${environment}/entries?access_token=${previewAccessToken}`
  return fetchEntries({ ...params, uri: cpaUri, isPreview: true })
}

export const fetchCPAEntry = async (params) => {
  const cpaUri = `https://${previewHost}/spaces/${spaceID}/environments/${environment}/entries?access_token=${previewAccessToken}`
  return fetchEntries({ ...params, uri: cpaUri, isPreview: true })
}

export const fetchCPAAsset = async (params) => {
  const assetId = params?.id
  const cpaUri = `https://${previewHost}/spaces/${spaceID}/environments/${environment}/assets/${assetId}?access_token=${previewAccessToken}`
  return fetchAsset({ ...params, uri: cpaUri, isPreview: true })
}

export const fetchAsset = async ({ id, uri, locale = 'en-US' }) => {
  try {
    debugWrapper(debugFlags.FETCH, () => {
      console.time(`Fetch Asset for "${id}"`)
    })
    const uriWithParams = `${uri}&locale=${locale}`
    const response = await fetch(uriWithParams)
    const data = await response.json()

    debugWrapper(debugFlags.FETCH, () => {
      console.timeEnd(`Fetch Asset for "${id}"`)
    })

    return {
      id: data?.sys?.id,
      ...data?.fields,
    }
  } catch (error) {
    return Promise.reject(error)
  }
}

const fetchEntries = async ({
  uri,
  id,
  contentType: content_type,
  query,
  limit = 15,
  include = 1,
  skip = 0,
  locale = 'en-US',
  order = '-sys.createdAt',
  customQueryParams = [],
  isPreview = false,
}) => {
  const queryParams = Object.entries({
    content_type,
    query,
    limit,
    include,
    skip,
    locale,
    order,
  })
    .filter(([_, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  const idParamString = id ? `sys.id=${id}&` : ''
  const customQueryParamsJoined = customQueryParams?.join('&')
  const customQueryParamString = customQueryParamsJoined
    ? `&${customQueryParamsJoined}`
    : ''

  const uriWithParams = `${uri}&${idParamString}${queryParams}${customQueryParamString}`

  try {
    console.time(`Fetch Entries for "${id || content_type}"`)
    const response = await fetch(uriWithParams)
    const data = await response.json()

    debugWrapper(debugFlags.FETCH, () => {
      console.group(
        `[Dev Only]: Fetching entries from ${encodeURI(uriWithParams)}`
      )

      console.table({
        uri,
        id,
        content_type,
        query,
        limit,
        include,
        skip,
        locale,
        order,
        customQueryParams,
      })
      console.timeEnd(`Fetch Entries for "${id || content_type}"`)
      console.groupEnd()
      console.time(`Sanitize Entries for "${id || content_type}"`)
    })

    // the larger the callstack, the longer it takes for useQuery from react-query to complete a fetch
    // fetching will block the UI thread (isFetching === true) until it completes
    // loading will render UI but will block interaction (isLoading === true) until it completes
    // keep include as low as possible or optimize recursive sanitizing function

    const sanitizedEntries = sanitizeEntries(data, isPreview, include)

    debugWrapper(debugFlags.FETCH, () => {
      console.group(`[Dev Only]: Sanitized Entries for "${id || content_type}"`)
      console.timeEnd(`Sanitize Entries for "${id || content_type}"`)
      console.groupEnd()
    })

    return sanitizedEntries
  } catch (error) {
    return Promise.reject(error)
  }
}

const sanitizeEntries = (data, isPreview = false, maxCallStack = 1) => {
  if (data?.sys?.type === 'Error') return data
  if (data?.total === 0) return data

  const { items, includes } = data
  // CPA and CDA will not return Entry includes for items that are already in data.items
  // this is most likely due to avoiding circular references
  const mappedIncludes = {
    Entry: [...(includes?.Entry || []), ...items],
    Asset: includes?.Asset || [],
  }

  const mappedItems = items
    ?.map(({ sys, fields }) => ({
      ...fields,
      id: sys?.id,
      __typename: sys?.contentType?.sys?.id,
    }))
    ?.map((item) =>
      recursivelyGetLinkedReferencesAndSpreadFields(
        item,
        mappedIncludes,
        isPreview,
        maxCallStack
      )
    )

  return {
    ...data,
    items: mappedItems,
  }
}
