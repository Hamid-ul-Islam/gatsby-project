import React from 'react'
import {
  isSSR,
  nodeLocaleToEnglishLanguage,
  shouldDisplayOnSites,
} from '@utils'

export const formatPreviewSlug = (id, contentType = 'page') =>
  `preview?contentType=${contentType}&id=${id}`

export const getLinkedEntry = (linkedReferences = [], targetId) => {
  return linkedReferences?.find(
    (linkedReference) => linkedReference?.sys?.id === targetId
  )
}

export const getLinkedReferenceAndSpreadFields = (
  linkedReferences = [],
  targetId
) => {
  if (!targetId || !linkedReferences?.length) return null

  const linkedEntry = getLinkedEntry(linkedReferences, targetId)
  if (!linkedEntry) return null

  return {
    id: linkedEntry?.sys.id,
    __typename: linkedEntry?.sys?.contentType?.sys?.id || 'asset',
    ...linkedEntry?.fields,
  }
}

export const recursivelyGetLinkedReferencesAndSpreadFields = (
  item,
  includes,
  isPreview = false,
  maxCallStack = 4
) => {
  if (!item) return undefined
  if (item?.slug && isPreview) {
    item.originalSlug = item?.slug
    item.slug = formatPreviewSlug(item?.id, item?.__typename)
  }
  if (maxCallStack === 0) return item

  const getNewVal = (val) => {
    const targetId = val?.sys?.id
    if (targetId) {
      const arr =
        val?.sys?.linkType === 'Entry' ? includes?.Entry : includes?.Asset
      const linkedEntry = getLinkedReferenceAndSpreadFields(arr, targetId)
      return recursivelyGetLinkedReferencesAndSpreadFields(
        linkedEntry,
        includes,
        isPreview,
        maxCallStack - 1
      )
    }

    return val
  }

  const fields = Object.entries(item)
  fields.forEach(([key, val]) => {
    if (typeof val === 'object') {
      if (Array.isArray(val)) {
        item[key] = val.map((innerVal) => getNewVal(innerVal))
      } else {
        item[key] = getNewVal(val)
      }
    }
  })

  return item
}

// ======== Clean up below ======= //

const getMappedCPADataForSingleEntry = (data, locale) => {
  if (!data) return null

  const { includes, items } = data?.entry

  if (!items?.length) return null

  const Entry = includes?.Entry || []
  const Asset = includes?.Asset || []
  const { sys, fields } = items?.[0]
  let mappedData = {
    ...fields,
    id: sys?.id,
    __typename: sys?.contentType?.sys?.id,
  }

  mappedData = recursivelyGetLinkedReferencesAndSpreadFields(
    mappedData,
    Entry,
    Asset
  )

  if (locale && mappedData?.displayOnSites) {
    return shouldDisplayOnSites(mappedData, locale) ? mappedData : null
  }

  return mappedData
}

export const getMappedCPAData = ({ asset, entry, entries }, locale) => {
  if (asset)
    return {
      id: asset?.sys?.id,
      __typename: asset?.__typename,
      ...asset?.fields,
    }

  if (entry) return getMappedCPADataForSingleEntry({ entry }, locale)

  if (entries) {
    return entries?.items
      ?.map((item) =>
        getMappedCPADataForSingleEntry(
          {
            entry: { items: [item], includes: entries?.includes },
          },
          locale
        )
      )
      ?.filter((entry) => entry)
  }

  return null
}

export const getDisplayOnSitesMessage = ({ data, locale }) => {
  const displayOnSites = data?.entry?.items?.[0]?.fields?.displayOnSites
  if (!displayOnSites) return null

  const shouldDisplay = displayOnSites?.includes(
    nodeLocaleToEnglishLanguage[locale]
  )
  if (shouldDisplay) return null

  const localeList = displayOnSites?.join(', ')
  return `This entry has been marked by 'displayOnSites' to be hidden for this locale. 
      It will only show for ${localeList}.`
}

export const getErrorMessage = ({ id, contentTypeId, data, error, locale }) => {
  if (!id) return `Missing 'id' query param.`
  if (!contentTypeId) return `Missing 'contentTypeId' query param.`

  const networkError = error?.networkError?.result?.message
  if (networkError) return networkError

  if (!data?.entry?.items?.length)
    return `Data could not be fetched. Query params may be invalid for the current environment.`
  if (data?.entry?.items?.[0]?.sys?.contentType?.sys?.id !== contentTypeId)
    return `Invalid contentType '${contentTypeId}' for id '${id}'.`

  return error || getDisplayOnSitesMessage({ data, locale })
}

export const formatNetworkErrorMessage = (error, title) => {
  const networkError = error?.networkError?.result || error
  const errorMessage = JSON.stringify({ title, ...networkError }, null, 2)
  return <pre>{errorMessage}</pre>
}

export const isPreviewPage = () => {
  return (
    !isSSR() &&
    window?.location?.pathname?.split('/')?.find((path) => path === 'preview')
  )
}
