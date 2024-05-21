import Client from 'shopify-buy'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocale } from '@context/localeContext'

const STORE_URL = process.env.GATSBY_SHOPIFY_STORE_URL_ALIAS
const ACCESS_TOKEN = process.env.GATSBY_STOREFRONT_ACCESS_TOKEN

const createShopifyClient = () => {
  if (!STORE_URL || !ACCESS_TOKEN) {
    throw new Error('Missing Shopify Store URL or Access Token')
  }

  const client = Client.buildClient({
    domain: STORE_URL,
    storefrontAccessToken: ACCESS_TOKEN,
  })

  return client
}

const createShopifyClientFrance = () => {
  if (!STORE_URL || !ACCESS_TOKEN) {
    throw new Error('Missing Shopify Store URL or Access Token')
  }
  const clientFrench = Client.buildClient({
    domain: STORE_URL,
    storefrontAccessToken: ACCESS_TOKEN,
    language: 'fr',
  })

  return clientFrench
}

const createShopifyClientSpanish = () => {
  if (!STORE_URL || !ACCESS_TOKEN) {
    throw new Error('Missing Shopify Store URL or Access Token')
  }

  const clientSpanish = Client.buildClient({
    domain: STORE_URL,
    storefrontAccessToken: ACCESS_TOKEN,
    language: 'es',
  })

  return clientSpanish
}

const shopifyClientEnglish = createShopifyClient()
const shopifyClientFrench = createShopifyClientFrance()
const shopifyClientSpanish = createShopifyClientSpanish()

const initialCartState = {
  id: '',
  webUrl: '',
  completedAt: '',
  checkoutUrl: '',
  subtotalPrice: '',
  lineItems: [],
  lineItemCount: 0,
  isAdding: false,
  isUpdating: false,
  isRemoving: false,
  shopifyClient: shopifyClientEnglish,
  locale: 'en-US',
}
const initialCartStateFr = {
  id: '',
  webUrl: '',
  completedAt: '',
  checkoutUrl: '',
  subtotalPrice: '',
  lineItems: [],
  lineItemCount: 0,
  isAdding: false,
  isUpdating: false,
  isRemoving: false,
  shopifyClient: shopifyClientFrench,
  locale: 'fr-CA',
}
const initialCartStateEs = {
  id: '',
  webUrl: '',
  completedAt: '',
  checkoutUrl: '',
  subtotalPrice: '',
  lineItems: [],
  lineItemCount: 0,
  isAdding: false,
  isUpdating: false,
  isRemoving: false,
  shopifyClient: shopifyClientSpanish,
  locale: 'es-MX',
}

const CartContext = createContext(null)

const shopifyCheckoutId = 'shopify_checkout_id'
const shopifyCheckoutIdEn = shopifyCheckoutId + '_' + 'en-US'
const shopifyCheckoutIdEs = shopifyCheckoutId + '_' + 'es-MX'
const shopifyCheckoutIdFr = shopifyCheckoutId + '_' + 'fr-CA'

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCartState)
  const [cartFr, setCartFr] = useState(initialCartStateFr)
  const [cartEs, setCartEs] = useState(initialCartStateEs)
  const [initializedCarts, setinitializedCarts] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const closeCart = () => setIsOpen(false)

  const openCart = () => {
    if (isOpen) {
      return
    }

    setIsOpen(true)
  }

  useEffect(() => {
    if (initializedCarts) return

    const initializeCarts = async () => {
      const checkoutIDEn =
        typeof window !== 'undefined'
          ? localStorage.getItem(shopifyCheckoutIdEn)
          : false
      const checkoutIDEs =
        typeof window !== 'undefined'
          ? localStorage.getItem(shopifyCheckoutIdEs)
          : false
      const checkoutIDFr =
        typeof window !== 'undefined'
          ? localStorage.getItem(shopifyCheckoutIdFr)
          : false

      const setCheckoutId = (checkoutId, locale) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem(shopifyCheckoutId + '_' + locale, checkoutId)
        }
      }

      if (!checkoutIDEn || !checkoutIDEs || !checkoutIDFr) {
        const newCheckoutEn = await cart.shopifyClient.checkout.create()
        const newCheckoutEs = await cartEs.shopifyClient.checkout.create()
        const newCheckoutFr = await cartFr.shopifyClient.checkout.create()

        setCheckoutId(newCheckoutEn.id.toString(), 'en-US')
        setCheckoutId(newCheckoutEs.id.toString(), 'es-MX')
        setCheckoutId(newCheckoutFr.id.toString(), 'fr-CA')

        setCart({ ...cart, ...newCheckoutEn })
        setCartEs({ ...cartEs, ...newCheckoutEs })
        setCartFr({ ...cartFr, ...newCheckoutFr })
        return
      }

      try {
        const existingCheckoutEn = await cart.shopifyClient.checkout.fetch(
          checkoutIDEn
        )
        const existingCheckoutEs = await cartEs.shopifyClient.checkout.fetch(
          checkoutIDEs
        )
        const existingCheckoutFr = await cartFr.shopifyClient.checkout.fetch(
          checkoutIDFr
        )

        if (
          existingCheckoutEn.completedAt ||
          existingCheckoutEs.completedAt ||
          existingCheckoutFr.completedAt
        ) {
          setCheckoutId('', 'en-US')
          setCheckoutId('', 'es-MX')
          setCheckoutId('', 'fr-CA')

          setCart(initialCartState)
          setCartEs(initialCartStateEs)
          setCartFr(initialCartStateFr)
          return
        }

        setCart({ ...cart, ...existingCheckoutEn })
        setCartEs({ ...cartEs, ...existingCheckoutEs })
        setCartFr({ ...cartFr, ...existingCheckoutFr })
        return
      } catch (error) {
        localStorage.setItem(shopifyCheckoutIdEn, '')
        localStorage.setItem(shopifyCheckoutIdEs, '')
        localStorage.setItem(shopifyCheckoutIdFr, '')
      }
    }

    initializeCarts()
    setinitializedCarts(true)
  }, [initializedCarts, cart, setCart, cartEs, setCartEs, cartFr, setCartFr])

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartFr,
        setCartFr,
        cartEs,
        setCartEs,
        isOpen,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (context === undefined || context === null) {
    throw new Error('useCart must be used within a CartProvider')
  }

  return context
}

const TWO_SECONDS = 2000

export const useAddItem = (locale) => {
  const { cart, setCart, cartFr, setCartFr, cartEs, setCartEs } = useCart()

  const localizedCart =
    locale === 'fr-CA' ? cartFr : locale === 'es-MX' ? cartEs : cart
  const localizedSetCart =
    locale === 'fr-CA' ? setCartFr : locale === 'es-MX' ? setCartEs : setCart

  const addItem = async ({ variantId, quantity }) => {
    if (quantity <= 0) return
    try {
      localizedSetCart((prevState) => ({ ...prevState, isAdding: true }))
      const { shopifyClient, id } = localizedCart
      const newCart = await shopifyClient.checkout.addLineItems(id, [
        { variantId, quantity },
      ])
      localizedSetCart((prevState) => ({
        ...prevState,
        ...newCart,
        isAdding: false,
      }))
    } catch (error) {
      setTimeout(() => {
        localizedSetCart((prevState) => ({ ...prevState, isAdding: false }))
      }, TWO_SECONDS)
    }
  }

  return addItem
}

export const useRemoveItem = (locale) => {
  const { cart, setCart, cartFr, setCartFr, cartEs, setCartEs } = useCart()

  const localizedCart =
    locale === 'fr-CA' ? cartFr : locale === 'es-MX' ? cartEs : cart
  const localizedSetCart =
    locale === 'fr-CA' ? setCartFr : locale === 'es-MX' ? setCartEs : setCart

  const removeItem = async ({ lineItemId }) => {
    try {
      localizedSetCart((prevState) => ({ ...prevState, isRemoving: true }))
      const { shopifyClient, id } = localizedCart
      const newCart = await shopifyClient.checkout.removeLineItems(id, [
        lineItemId,
      ])
      localizedSetCart((prevState) => ({
        ...prevState,
        ...newCart,
        isRemoving: false,
      }))
    } catch (error) {
      console.error(error)
      setTimeout(() => {
        localizedSetCart((prevState) => ({ ...prevState, isRemoving: false }))
      }, TWO_SECONDS)
    }
  }

  return removeItem
}

export const useUpdateItem = (locale) => {
  const { cart, setCart, cartFr, setCartFr, cartEs, setCartEs } = useCart()

  const localizedCart =
    locale === 'fr-CA' ? cartFr : locale === 'es-MX' ? cartEs : cart
  const localizedSetCart =
    locale === 'fr-CA' ? setCartFr : locale === 'es-MX' ? setCartEs : setCart

  const updateItem = async ({ variantId, quantity }) => {
    if (quantity <= 0) return
    try {
      localizedSetCart((prevState) => ({ ...prevState, isUpdating: true }))
      const { shopifyClient, id } = localizedCart
      const newCart = await shopifyClient.checkout.updateLineItems(id, [
        { id: variantId, quantity },
      ])
      localizedSetCart((prevState) => ({
        ...prevState,
        ...newCart,
        isUpdating: false,
      }))
    } catch (error) {
      console.error(error)
      setTimeout(() => {
        localizedSetCart((prevState) => ({ ...prevState, isUpdating: false }))
      }, TWO_SECONDS)
    }
  }

  return updateItem
}
