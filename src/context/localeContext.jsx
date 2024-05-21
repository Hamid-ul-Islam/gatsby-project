import React, { createContext, useContext, useEffect, useState } from 'react'
export const LocaleContext = createContext()
const isPreviewSlug = (slug) => slug?.includes('preview?contentType=')

export const useLocale = () => {
  return useContext(LocaleContext)
}
export const LocaleProvider = ({ children, locale }) => {
  const removeTrailingSlash = (slug) => slug?.replace(/\/$/, '')
  const removeLeadingSlash = (slug) => slug?.replace(/^\//, '')

  const getLocalizedSlug = ({ slug, category }) => {
    const localeSlug = locale === 'en-US' ? '' : `${locale}/`

    const categorySlug = category ? `${category}/` : ''

    const rawSlug = removeLeadingSlash(removeTrailingSlash(slug))
    const sanitizedSlug = rawSlug === 'home' ? '' : rawSlug

    return isPreviewSlug(slug)
      ? `/${localeSlug}${slug}`
      : `/${localeSlug}${categorySlug}${sanitizedSlug}`
  }

  // const displayLocale = nodeLocaleToEnglishLanguage?.[locale]
  const localeSlug = locale === 'en-US' ? '' : `${locale}`

  return (
    <LocaleContext.Provider
      value={{
        locale,
        getLocalizedSlug,
        // displayLocale,
        localeSlug,
      }}
    >
      {children}
    </LocaleContext.Provider>
  )
}
