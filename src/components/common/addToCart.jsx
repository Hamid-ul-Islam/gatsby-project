import { useState, Fragment } from 'react'
import { Helmet } from 'react-helmet'
import { useCart, useAddItem } from '@context/cartContext'
import { Listbox, Transition } from '@headlessui/react'
import { ChevronDown, Minus, Plus } from 'react-feather'
import { useLocale } from '@context/localeContext'

import Button from './button'
import IconShoppingCart from '@images/icon-cart.svg'

const AddToCart = ({ variants, addToCartDisplayText, analyticsTagId }) => {
  const { locale } = useLocale()
  const { cart, cartFr, cartEs, openCart } = useCart()
  const localizedCart =
    locale === 'fr-CA' ? cartFr : locale === 'es-MX' ? cartEs : cart
  const { isAdding } = localizedCart
  const addItem = useAddItem(locale)
  const [quantity, setQuantity] = useState(1)
  const [clickAddToCart, setClickAddToCart] = useState(false)
  const [variant, setVariant] = useState(variants?.[0] || {})

  const handleAddToCart = (event) => {
    if (event) event.preventDefault()

    addItem({ variantId: variant.storefrontId, quantity: parseInt(quantity) })
    openCart()

    setClickAddToCart(true)
  }

  return (
    <div className="mt-6 flex w-full flex-wrap items-center justify-between gap-4">
      <span className="font-tacticSansExt text-2xl">${variant?.price}</span>
      <input
        type="number"
        className="border-1 ml-auto h-16 w-16 rounded-[5px] border border-black text-center"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        aria-label="quantity-input"
      />
      <Button
        className="w-full md:w-fit"
        text={addToCartDisplayText || 'Add to Cart'}
        icon={<IconShoppingCart />}
        onClick={handleAddToCart}
        disabled={isAdding}
        id={analyticsTagId}
      />
    </div>
  )
}

export default AddToCart

const QuantityStepper = ({ quantity, setQuantity }) => {
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1)
  }

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
  }

  return (
    <div className="border-orange-400 flex h-10 grow border">
      <button
        className="border-orange-400 bg-orange-100 hover:bg-orange-200 flex grow items-center justify-center border-r p-2 px-5 duration-200"
        onClick={handleDecrement}
      >
        <Minus size={16} />
      </button>
      <span className="flex grow items-center justify-center px-6 py-2">
        {quantity}
      </span>
      <button
        className="border-orange-400 bg-orange-100 hover:bg-orange-200 flex grow items-center justify-center border-l p-2 px-5 duration-200"
        onClick={handleIncrement}
      >
        <Plus size={16} />
      </button>
    </div>
  )
}

const SizeSelector = ({ variant, variants, setVariant }) => {
  return (
    <div className="w-full max-w-sm">
      <Listbox value={variant} onChange={setVariant}>
        <div className="relative">
          <Listbox.Button className="border-orange-400 bg-orange-50 relative w-full cursor-default border bg-opacity-50 py-2 pl-3  sm:text-sm">
            <div className="flex items-center justify-between pr-10 backdrop-blur-md">
              <div className="block truncate">{variant.title}</div>
              <span>${variant.price}</span>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronDown size={16} aria-hidden="true" />
              </div>
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leaveTo="opacity-0"
            leaveFrom="opacity-100"
            leave="transition ease-in duration-100"
          >
            <Listbox.Options className="border-orange-400 absolute z-20 mt-1 max-h-60 w-full overflow-auto border">
              {variants.map((variant) => {
                return (
                  <Listbox.Option
                    key={variant.id}
                    value={variant}
                    className={({ active }) =>
                      `border-orange-100 flex justify-between border-t px-3 py-2 pr-10 text-sm first-of-type:border-t-0 ${
                        active ? 'bg-orange-100' : 'bg-orange-50'
                      }`
                    }
                  >
                    <div>{variant.title}</div> <span>${variant.price}</span>
                  </Listbox.Option>
                )
              })}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}
