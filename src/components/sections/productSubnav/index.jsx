import { useState } from 'react'
import PropTypes from 'prop-types'
import { Tab, Transition } from '@headlessui/react'
import { useIsomorphicLayoutEffect, useMedia } from 'react-use'
import { handleFindProductShopifyEntry } from '@utils'
import { isPreviewPage } from '@utils/preview'
import { useLocale } from '@context/localeContext'
import { renderRichText } from '@components/common/richText'
import DownArrow from '@images/product-tabs/product-tab-arrow.svg'
import WhatsIncludedCallout from './subcomponents/whatsIncludedCallout'
import Faq from '@components/sections/faq'
import AddToCart from '@components/common/addToCart'
import Container from '@components/layout/container'
import BackgroundTexture from '@components/common/backgroundTexture'
import Image from '@components/common/image'
import Carousel from './subcomponents/carousel'
import SectionBorderWrapper, {
  borderTypes,
} from '@components/common/sectionBorderWrapper'
import AvailableNowBanner from '@components/common/AvailableNowBanner'
import { GatsbyImage } from 'gatsby-plugin-image'
import ESRB from '@components/common/ESRB'

const Product = ({
  variants,
  title,
  variantTitle,
  description,
  addToCartDisplayText,
  carousel,
  displayProductCallOut,
  productCallOutText,
  productDisclaimerText,
  productIcon,
  locale,
  analyticsTagId,
}) => {
  return (
    <Container className="grid grid-cols-1 gap-y-16 gap-x-16 lg:grid-cols-2 lg:items-center">
      <div className="order-last flex flex-col lg:order-first">
        <h2 className="mb-6 flex flex-col gap-1 font-tacticSansExt uppercase lg:gap-2">
          <span className="block text-[20px] leading-[24px] lg:text-[24px] lg:leading-[28px]">
            {title}
          </span>
          <span className="block break-words text-[32px] leading-[38px] lg:text-5xl lg:leading-[58px] xl:text-[56px] xl:leading-[67px]">
            {variantTitle}
          </span>
        </h2>
        <div className="mb-6">{renderRichText(description)}</div>
        {displayProductCallOut && locale === 'en-US' && (
          <>
            <hr className="border-t-1 w-full border border-dashed border-t-gray-900" />
            <div className="my-5 flex items-center gap-3">
              <GatsbyImage
                image={productIcon?.gatsbyImageData}
                alt={productIcon?.title}
                className="h-auto w-8"
              />
              <div className="mt-1 font-itcGothic font-bold uppercase">
                {productCallOutText}
                {productDisclaimerText && (
                  <>
                    <br />
                    <span className="text-sm font-medium normal-case italic">
                      {productDisclaimerText}
                    </span>
                  </>
                )}
              </div>
            </div>
            <hr className="border-t-1 w-full border border-dashed border-t-gray-900" />
          </>
        )}
        <AddToCart
          variants={variants}
          addToCartDisplayText={addToCartDisplayText}
          analyticsTagId={analyticsTagId}
        />
        <ESRB className="mt-10" />
      </div>
      <Carousel carousel={carousel} />
    </Container>
  )
}

const ProductTabPanel = ({
  title,
  variantTitle,
  description,
  productShopifyEntry,
  addToCartDisplayText,
  carousel,
  bannerLink,
  displayBanner,
  bannerLogo,
  bannerText,
  whatsIncluded,
  faq,
  displayProductCallOut,
  productCallOutText,
  productDisclaimerText,
  productIcon,
  locale,
  bannerLinkTrackingId,
  analyticsTagId,
}) => {
  return (
    <Tab.Panel className="pt-24">
      <Transition
        show={true}
        appear={true}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <SectionBorderWrapper isBelowHero hasBackgroundTexture>
          <Product
            {...productShopifyEntry}
            addToCartDisplayText={addToCartDisplayText}
            title={title}
            variantTitle={variantTitle}
            description={description}
            carousel={carousel}
            productDisclaimerText={productDisclaimerText}
            displayProductCallOut={displayProductCallOut}
            productCallOutText={productCallOutText}
            productIcon={productIcon}
            locale={locale}
            analyticsTagId={analyticsTagId}
          />
          <Container className="mb-24 block">
            <AvailableNowBanner
              bannerLink={bannerLink}
              displayBanner={displayBanner}
              bannerLogo={bannerLogo}
              bannerText={bannerText}
              bannerLinkTrackingId={bannerLinkTrackingId}
            />
          </Container>
          <WhatsIncludedCallout
            title={whatsIncluded?.title}
            includedItems={whatsIncluded?.includedItems}
          />
        </SectionBorderWrapper>
        <SectionBorderWrapper border={borderTypes.RIGHT} hasBackgroundTexture>
          <Faq title={faq?.title} questions={faq?.questions} />
        </SectionBorderWrapper>
      </Transition>
    </Tab.Panel>
  )
}

const ProductTab = ({ title, isDesktop, index, image, imageAlt }) => {
  const clipPlaths = {
    even: '[clip-path:polygon(0_0,_calc(100%_-_132px)_0,_100%_100%,_0_100%)]',
    odd: '[clip-path:polygon(0_100%,_132px_0,_100%_0,_100%_100%)]',
  }

  return (
    <Tab className="relative outline-none">
      {isDesktop ? (
        <>
          <span className="absolute bottom-0 left-[-66px] h-24 w-[calc(100%_+_132px)] overflow-y-hidden">
            <span
              className={`${
                index % 2 === 0 ? clipPlaths.even : clipPlaths.odd
              } absolute inset-0 transition duration-300 ease-in-out ui-selected:translate-y-0 ui-selected:opacity-100 ui-not-selected:translate-y-[100%] ui-not-selected:opacity-0`}
            >
              <BackgroundTexture />
            </span>
          </span>
          <div
            className={`${
              index % 2 === 0
                ? 'ml-auto pl-6 sm:pl-8 md:pl-10 lg:pl-16 xl:pl-24'
                : 'mr-auto pr-6 sm:pr-8 md:pr-10 lg:pr-16 xl:pr-24'
            } flex h-full w-full max-w-screen-md flex-col justify-end`}
          >
            <Image
              src={image}
              alt={imageAlt}
              className="mx-auto mt-6 mb-8 max-w-[240px]"
            />
            <div className="relative mx-16 flex h-24 items-center justify-center">
              <h2 className="font-tacticSansExt text-[26px] uppercase">
                {title}
              </h2>
              <span className="absolute inset-0 bottom-[-45px] flex items-end justify-center drop-shadow-[0px_0px_12px_rgba(251,_86,_0,_0.75)] transition duration-300 ease-in-out ui-selected:translate-y-0 ui-selected:opacity-100 ui-not-selected:-translate-y-4 ui-not-selected:opacity-0">
                <DownArrow />
              </span>
            </div>
          </div>
        </>
      ) : (
        <div
          className={`relative flex h-full flex-col items-center justify-end border-[#F99300] ${
            index % 2 === 0 ? 'border-r-2' : 'border-l-2'
          }`}
        >
          <span className="absolute inset-0 bg-[image:linear-gradient(0deg,rgba(0,0,0,0.3)_0%,rgba(0,0,0,0)_83%)] transition-opacity duration-300 ease-in-out ui-selected:opacity-0 ui-not-selected:opacity-100" />
          <Image src={image} alt={imageAlt} className="mt-2 max-w-[72px]" />
          <div className="relative flex w-full items-center justify-center pb-2">
            <span className="inline-block w-full">
              <h2 className="mx-auto max-w-[230px] break-words font-tacticSansExt text-base uppercase">
                {title}
              </h2>
            </span>
            <span className="absolute inset-0 bottom-[-45px] flex items-end justify-center drop-shadow-[0px_0px_6px_rgba(251,_86,_0,_0.75)] transition duration-300 ease-in-out ui-selected:translate-y-0 ui-selected:opacity-100 ui-not-selected:-translate-y-2 ui-not-selected:opacity-0">
              <DownArrow width="23px" />
            </span>
          </div>
        </div>
      )}
    </Tab>
  )
}

const ProductSubnav = ({
  products,
  shopifyProducts,
  addToCartDisplayText,
  pageSlug,
  activeProduct,
  bannerText,
  bannerLogo,
  displayBanner,
}) => {
  const [opacity, setOpacity] = useState('opacity-0')
  const isDesktop = useMedia('(min-width: 1024px)')
  const { locale } = useLocale()

  const productSlugs = products?.map((product) => product?.slug)
  const [selectedIndex, setSelectedIndex] = useState(
    productSlugs?.indexOf(activeProduct)
  )

  const handleOnChange = (index) => {
    setSelectedIndex(index)

    if (isPreviewPage()) return

    const origin = window.location.origin
    const localeSlug = locale !== 'en-US' ? `/${locale}` : ''
    const productSlug = productSlugs[index]

    window.history.replaceState(
      {},
      '',
      `${origin}${localeSlug}/${pageSlug}/${productSlug}`
    )
  }

  useIsomorphicLayoutEffect(() => {
    setOpacity('opacity-100')
  }, [])

  return (
    <Tab.Group
      as="div"
      selectedIndex={selectedIndex}
      onChange={(index) => handleOnChange(index)}
      className={`${opacity}`}
    >
      <BackgroundTexture
        gradient={`${
          isDesktop
            ? 'linear-gradient(360deg, #E7E7E7 15%, rgba(244, 244, 244, 0) 90%)'
            : ''
        }`}
      >
        <Tab.List className="grid w-full auto-cols-fr grid-flow-col">
          {products?.map((product, i) => (
            <ProductTab
              key={product?.id}
              isDesktop={isDesktop}
              title={product?.productVariantName}
              image={product?.productPageTabImage}
              imageAlt={`${product?.productName} ${product?.productVariantName}`}
              index={i}
              displayProductCallOut={product?.displayProductCallOut}
              productCallOutText={product?.productCallOutText}
              productIcon={product?.productIcon}
            />
          ))}
        </Tab.List>
      </BackgroundTexture>
      <Tab.Panels>
        <BackgroundTexture>
          {products?.map((product) => {
            const productShopifyEntry = handleFindProductShopifyEntry({
              shopifyProducts,
              id: product.productSlug,
            })
            return (
              <ProductTabPanel
                key={product?.id}
                title={product?.productName}
                variantTitle={product?.productVariantName}
                description={product?.description}
                productShopifyEntry={productShopifyEntry}
                addToCartDisplayText={addToCartDisplayText}
                carousel={product?.carousel}
                bannerText={bannerText}
                bannerLink={product?.bannerLink}
                bannerLinkTrackingId={product?.bannerLinkTrackingId}
                analyticsTagId={product?.analyticsTagId}
                bannerLogo={bannerLogo}
                displayBanner={displayBanner}
                whatsIncluded={product?.whatsIncluded}
                faq={product?.faq}
                displayProductCallOut={product?.displayProductCallOut}
                productCallOutText={product?.productCallOutText}
                productDisclaimerText={product?.productDisclaimerText}
                productIcon={product?.productIcon}
                locale={locale}
              />
            )
          })}
        </BackgroundTexture>
      </Tab.Panels>
    </Tab.Group>
  )
}

ProductSubnav.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
    })
  ),
}

export default ProductSubnav
