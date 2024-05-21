import React, { useState, useEffect, useRef, Fragment } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Dialog, Transition } from '@headlessui/react'
import { useCart, useRemoveItem, useUpdateItem } from '@context/cartContext'
import { Base64 } from 'base64-string'
import { useLocale } from '@context/localeContext'
import { Link } from 'gatsby'
import { LineItem as ILineItem } from 'shopify-buy'
import { Minus, Plus } from 'react-feather'
import { GatsbyImage } from 'gatsby-plugin-image'
import { getShopifyImage } from 'gatsby-source-shopify'
import { useLenis } from '@context/lenisContext'
import gsap from 'gsap'
import ShoppingCartIcon from '@images/shoppingCart.svg'
import BackgroundTexture from '@components/common/backgroundTexture'
import Button from './button'
import CloseIcon from '@images/usertools/icon-close.svg'
import TrashIcon from '@images/usertools/icon-trash.svg'
import { JsonToPinterestUrlParams } from '@utils'

const formatUsd = (price) => {
  if (typeof price === 'string') {
    price = +price
  }
  return price.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}

const LineItemImage = ({ item }) => {
  if (item?.attrs?.variant?.image) {
    const variantImage = {
      ...item?.attrs?.variant?.image,
      originalSrc: item?.attrs.variant?.image.src,
    }
    const lineItemImage = getShopifyImage({
      width: 64,
      height: 64,
      layout: 'fixed',
      image: variantImage,
    })

    return (
      <GatsbyImage
        image={lineItemImage}
        alt={
          item?.attrs?.variant?.image.altText ||
          item?.attrs?.variant?.title ||
          'product'
        }
        style={{ borderRadius: '5px' }}
      />
    )
  }
  return <div />
}

const Cart = ({ disabled = false }) => {
  const cartContentfulData = useStaticQuery(graphql`
    {
      cartUi: allContentfulSite(
        filter: { name: { ne: "[CMS SCHEMA REQUIRED]" } }
      ) {
        nodes {
          node_locale
          cartContinueShopping
          cartYourCart
          cartNowShopping
          cartSubtotal
          cartShipping
          cartCalculatedAtNextStep
          cartTaxes
          cartTotal
          cartRegionName
          currency
          cartProceedToCheckoutButton
          cartDisclaimer
          cartEmptyNotification
        }
      }
    }
  `)
  const { locale } = useLocale()
  const { cart, cartFr, cartEs, openCart, isOpen, closeCart } = useCart()
  const localizedCart =
    locale === 'fr-CA' ? cartFr : locale === 'es-MX' ? cartEs : cart
  const { lenis } = useLenis()
  const contentfulData = cartContentfulData.cartUi.nodes.find(
    (_node) => _node.node_locale === locale
  )

  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
    }

    if (!isOpen) {
      lenis?.start()
    }
  }, [isOpen, lenis])

  const totalLineItems = localizedCart.lineItems.reduce((accumulator, item) => {
    return accumulator + item.quantity
  }, 0)

  if (disabled)
    return (
      <div className="relative h-fit w-fit">
        <ShoppingCartIcon />
        {totalLineItems > 0 && (
          <span className="absolute top-[-2px] left-[28px] flex h-6 w-6 items-center justify-center rounded-full bg-black font-itcGothic text-xs font-bold text-white">
            {totalLineItems}
          </span>
        )}
      </div>
    )

  return (
    <Fragment>
      <button
        className={`relative h-fit w-fit ${
          isOpen ? 'pointer-events-none' : ''
        }`}
        type="button"
        id="view-cart"
        onClick={openCart}
        aria-label="cart"
      >
        <ShoppingCartIcon />
        {totalLineItems > 0 && (
          <span className="absolute top-[-2px] left-[28px] flex h-6 w-6 items-center justify-center rounded-full bg-black font-itcGothic text-xs font-bold text-white">
            {totalLineItems}
          </span>
        )}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[900]" onClose={closeCart}>
          <Transition.Child
            as={Fragment}
            enterFrom="opacity-0"
            enterTo="opacity-100"
            enter="ease-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            leave="ease-in duration-300"
          >
            <div className="fixed inset-0 " />
          </Transition.Child>

          <div className="fixed inset-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 translate-x-full"
              enterTo="opacity-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0 translate-x-full"
            >
              <Dialog.Panel className="border-orange-300 bg-orange-50 ml-auto flex h-screen w-full max-w-[506px] transform items-center justify-center overflow-y-auto border border-l text-left align-middle shadow-xl transition-all">
                <CartSummary {...contentfulData} closeCart={closeCart} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </Fragment>
  )
}

export default Cart

const CartSummary = ({
  cartContinueShopping,
  cartYourCart,
  cartNowShopping,
  cartSubtotal,
  cartShipping,
  cartCalculatedAtNextStep,
  cartTaxes,
  cartTotal,
  cartRegionName,
  currency,
  cartProceedToCheckoutButton,
  closeCart,
  cartDisclaimer,
  cartEmptyNotification,
}) => {
  const { locale } = useLocale()
  const { cart, cartFr, cartEs } = useCart()
  const localizedCart =
    locale === 'fr-CA' ? cartFr : locale === 'es-MX' ? cartEs : cart
  const [clickCheckout, setClickCheckout] = useState(false)

  const handleCheckout = (event) => {
    if (event) event.preventDefault()

    //process to checkout event
    const items = localizedCart?.lineItems.map((item) => {
      return {
        id: item?.id,
        name: item?.title,
        price: +item?.variant?.price,
        quantity: item?.quantity,
      }
    })

    typeof window !== 'undefined' &&
      window.gtag &&
      window.gtag('event', 'begin_checkout', {
        currency: 'USD',
        value: +localizedCart.totalPrice,
        items: items,
      })

    setClickCheckout(true)
    window.open(localizedCart.webUrl, '_self')
  }

  return (
    <BackgroundTexture gradient="linear-gradient(to top, #E7E7E7 10%, rgba(244, 244, 244, 0) 90%)">
      <div className="flex h-5/6 w-full flex-col justify-between p-6 uppercase sm:h-full md:p-8">
        <div
          className="mb-5 ml-auto flex cursor-pointer items-center gap-2 font-itcGothic"
          onClick={closeCart}
        >
          <span className="mt-1">{cartContinueShopping}</span>
          <CloseIcon />
        </div>
        <div className="hidden gap-x-2 sm:flex">
          <div className="flex h-11 w-11 items-center justify-center bg-black">
            <ShoppingCartIcon />
          </div>
          <div className="flex items-center justify-center ">
            <div className="font-itcGothic font-bold">
              {cartYourCart} ({localizedCart?.lineItems.length})
            </div>
          </div>
        </div>
        <div className="w-full sm:my-[15px]" />
        {localizedCart.lineItems.length === 0 ? (
          <div className="mt-auto flex flex-1 items-center justify-center font-itcGothic font-bold">
            {cartEmptyNotification}
          </div>
        ) : (
          <>
            <div className="h-[1px] w-full bg-light-gray" />
            {cartDisclaimer && (
              <>
                <div className="my-4 flex items-center justify-between text-center font-itcGothic">
                  <div className="text-sm font-medium italic tracking-wide">
                    {cartDisclaimer}
                  </div>
                </div>
                <div className="h-[1px] w-full bg-light-gray" />
              </>
            )}
            <div className="flex flex-col gap-6 pt-8 pb-5 md:gap-8">
              {localizedCart?.lineItems.map((item) => {
                return <LineItem item={item} key={item.id} />
              })}
            </div>
            <div className="h-[1px] w-full bg-light-gray" />
            <div className="mt-auto pt-[4px] pb-5 sm:pt-[43px]">
              <div className="mb-2 flex items-center justify-between font-itcGothic font-medium">
                <div>{cartSubtotal}</div>
                <div>{formatUsd(localizedCart.subtotalPrice)}</div>
              </div>
              <div className="mb-2 flex items-center justify-between font-itcGothic font-medium">
                <div>{cartShipping}</div>
                <div>{cartCalculatedAtNextStep}</div>
              </div>
              {localizedCart.taxesIncluded && (
                <div className="mb-2 flex items-center justify-between font-itcGothic font-medium">
                  <div>{cartTaxes}</div>
                  <div>{formatUsd(localizedCart.totalTax)}</div>
                </div>
              )}
            </div>
            <div className="mb-4 h-[1px] w-full bg-light-gray sm:mb-6" />
            <div className="flex items-center justify-between font-itcGothic font-bold">
              <div>{cartTotal}</div>
              <div>{formatUsd(localizedCart.totalPrice)}</div>
            </div>
            <Button
              className="mt-4 w-full px-2 text-sm sm:mt-8 md:text-lg"
              id={`cart-proceed-to-checkout`}
              text={cartProceedToCheckoutButton}
              onClick={handleCheckout}
            />
          </>
        )}
      </div>
    </BackgroundTexture>
  )
}

const LineItem = ({ item }) => {
  const { locale } = useLocale()
  const { cart, cartFr, cartEs } = useCart()
  const localizedCart =
    locale === 'fr-CA' ? cartFr : locale === 'es-MX' ? cartEs : cart

  const { isUpdating } = localizedCart
  const encode = new Base64()
  const quantity = item.quantity
  const removeItem = useRemoveItem(locale)
  const updateItem = useUpdateItem(locale)
  const variantId = encode.encode(item.id.toString())
  const lineItemRef = useRef(null)

  const size = (() => {
    if (item?.attrs?.variant?.title) {
      return item.attrs.variant.title
    }
    return 'Black'
  })()

  const handleRemove = () => {
    gsap.to(lineItemRef.current, {
      autoAlpha: 0,
      duration: 0.3,
      height: 0,
      display: 'none',
      ease: 'sine.in',
      onComplete: () => {
        removeItem({ lineItemId: item.id.toString() })
      },
    })
  }

  const handleIncrement = () => {
    updateItem({
      variantId,
      quantity: item.quantity + 1,
    })
  }

  const handleDecrement = () => {
    if (quantity === 1) {
      handleRemove()
    } else {
      updateItem({
        variantId,
        quantity: item.quantity - 1,
      })
    }
  }

  return (
    <div className="flex items-center justify-between gap-3" ref={lineItemRef}>
      <div className="flex flex-1 items-center gap-4">
        <div className="relative rounded-md border border-light-gray">
          <LineItemImage item={item} />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-start justify-between">
            <div className="mr-4 font-itcGothic font-bold leading-none leading-6 md:mr-8">
              {item.title}
            </div>
            <div className="font-itcGothic text-sm font-medium">
              {formatUsd(item?.attrs?.variant?.price * quantity)}
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div className="flex h-[28px] w-fit w-[90px] justify-center rounded-lg border border-black bg-white">
              <button
                className={`border-none p-1 duration-200 ${
                  isUpdating && 'cursor-wait'
                }`}
                onClick={handleDecrement}
                disabled={isUpdating}
              >
                <Minus size={16} />
              </button>
              <div className="flex w-3 items-center justify-center text-xs">
                {item.quantity}
              </div>
              <button
                className={`border-none p-1 duration-200 ${
                  isUpdating && 'cursor-wait'
                }`}
                onClick={handleIncrement}
                disabled={isUpdating}
              >
                <Plus size={16} />
              </button>
            </div>
            <button className="cursor-pointer" onClick={handleRemove}>
              <TrashIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
