import React, { useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'
import gsap from 'gsap'
import useReducedMotion from '@hooks/useReducedMotion'
import Container from '@components/layout/container'
import ProductGrid from '@components/common/productGrid'
import RacingLine from '../common/racingLine'
import AvailableNowBanner from '@components/common/AvailableNowBanner'
import ESRB from '@components/common/ESRB'

const ProductBuyNowShowcase = ({
  products,
  shopifyProducts,
  title,
  addToCartDisplayText,
  bannerText,
  bannerLink,
  displayBanner,
  bannerLogo,
  bannerLinkTrackingId,
  productTrackingLink1,
  productTrackingLink2,
  ...rest
}) => {
  const showcaseRef = useRef(null)
  const showcaseTimeline = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        reducedMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { reducedMotion } = context.conditions
        const noMotion = prefersReducedMotion || reducedMotion

        gsap.set('.showcase__title', {
          autoAlpha: 0,
          scale: noMotion ? 1 : 0.75,
          x: noMotion ? 0 : '-15vw',
        })

        gsap.set('.showcase__item', {
          autoAlpha: 0,
          y: noMotion ? 0 : '2vh',
        })

        showcaseTimeline.current = gsap
          .timeline({
            scrollTrigger: {
              trigger: '.showcase__title',
              start: 'top 80%',
              end: 'bottom 20%',
              once: true,
            },
          })
          .to('.showcase__title', {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power1.in',
          })
          .to(
            '.showcase__title',
            {
              x: 0,
              duration: 0.5,
              ease: 'back.out(1.4)',
            },
            '-=0.5'
          )
          .to('.showcase__item', {
            autoAlpha: 1,
            duration: 0.35,
            ease: 'power2.out',
            y: 0,
            stagger: 0.25,
          })
      },
      showcaseRef
    )

    return () => mm.revert()
  }, [prefersReducedMotion])

  return (
    <div ref={showcaseRef} className="w-full">
      <Container className="product-buy-now-show-case relative w-full scroll-mt-24 flex-col items-center px-7 pt-12 pb-12 md:px-12 lg:pt-16 lg:pb-16">
        <h2 className="showcase__title pb-4 font-tacticSansExt text-[30px] uppercase leading-[48px] opacity-0 md:text-[40px] md:text-5xl">
          {title}
        </h2>
        <RacingLine className="showcase__item mb-[76px] opacity-0 md:mb-16" />
        <ProductGrid
          products={products}
          shopifyProducts={shopifyProducts}
          className="showcase__item opacity-0"
          addToCartDisplayText={addToCartDisplayText}
          productTrackingLink1={productTrackingLink1}
          productTrackingLink2={productTrackingLink2}
        />
        <ESRB className="mt-10 self-start" />
        <AvailableNowBanner
          bannerLink={bannerLink}
          displayBanner={displayBanner}
          bannerLogo={bannerLogo}
          bannerText={bannerText}
          bannerLinkTrackingId={bannerLinkTrackingId}
        />
      </Container>
    </div>
  )
}

export default ProductBuyNowShowcase
