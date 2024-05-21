import './src/styles/fonts.css'
import './src/styles/global.css'
import './src/styles/tailwind.css'
import React from 'react'
import Layout from './src/components/layout/layout'
import { CartProvider } from './src/context/cartContext'
import { LenisProvider } from './src/context/lenisContext'
import { StateProvider } from './src/context/stateContext'
import { LocaleProvider } from './src/context/localeContext'
import { PreviewProvider } from './src/context/previewContext'

export const wrapPageElement = ({ element }) => {
  let locale = 'en-US'

  if (typeof window !== 'undefined') {
    if (window.location) {
      // '/'
      // '/es-MX'
      // '/fr-CA'
      // '/product'
      // '/es-MX/product'
      // '/fr-CA/product'
      locale =
        window.location.pathname.split('/')[1] === 'es-MX' ||
        window.location.pathname.split('/')[1] === 'es-MX'
          ? 'es-MX'
          : window.location.pathname.split('/')[1] === 'fr-CA'
          ? 'fr-CA'
          : 'en-US'
    }
  }

  return (
    <LenisProvider>
      <LocaleProvider locale={locale}>
        <PreviewProvider>
          <CartProvider locale={locale}>
            <StateProvider>
              <Layout>{element}</Layout>
            </StateProvider>
          </CartProvider>
        </PreviewProvider>
      </LocaleProvider>
    </LenisProvider>
  )
}
