import React, { useRef, useState } from 'react'
import { Link } from 'gatsby'
import { default as HWRRLink } from '@components/common/link'
import { useIsomorphicLayoutEffect } from 'react-use'
import {
  handleFindProductShopifyEntry,
  handleScrollToFirstPreorderSection,
} from '@utils'
import gsap from 'gsap'
import useReducedMotion from '@hooks/useReducedMotion'
import A from '@components/common/A'
import Container from '@components/layout/container'
import Button from '@components/common/button'
import Playstation from '@images/hero/playstation.svg'
import PS4 from '@images/hero/ps4.svg'
import PS5 from '@images/hero/ps5.svg'
import Apple from '@images/hero/apple.svg'
import BackgroundTexture from '@components/common/backgroundTexture'
import BackgroundMedia from '@components/common/backgroundMedia'
import VideoEmbedModal from '@components/common/modals/videoEmbedModal'
import IconPlay from '@images/icon-play-circle.svg'
import IconShoppingCart from '@images/icon-cart.svg'
import ButtonLink from '@components/common/link'
import { featureFlags, isFeatureEnabled } from '@featureflags'

const VideoEmbedLink = ({ url, displayText, id }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        className="min-w-[300px] sm:min-w-[324px]"
        icon={<IconPlay />}
        text={displayText}
        onClick={() => setIsOpen(true)}
        id={id}
      />
      <VideoEmbedModal url={url} isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  )
}

const ExternalInternalorModalLink = ({
  displayText,
  link,
  children,
  target,
  shopifyProducts,
  analyticsTagId,
  ...rest
}) => {
  if (
    target?.[0]?.__typename === 'ContentfulVideoEmbed' ||
    target?.[0]?.__typename === 'videoEmbed'
  ) {
    // video should open in a modal
    return (
      <VideoEmbedLink
        url={target?.[0]?.videoEmbedUrl}
        displayText={displayText}
        id={analyticsTagId}
      />
    )
  }
  if (
    (target?.[0]?.__typename === 'ContentfulProduct' ||
      target?.[0]?.__typename === 'product') &&
    isFeatureEnabled(featureFlags.PREORDER_SITE)
  ) {
    // should be a scroll link for landing page

    return (
      <Button
        className="min-w-[300px] sm:min-w-[324px]"
        icon={<IconShoppingCart />}
        text={displayText}
        onClick={handleScrollToFirstPreorderSection}
      />
    )
  }
  if (
    target?.[0]?.__typename === 'ContentfulProduct' ||
    target?.[0]?.__typename === 'product' ||
    target?.[0]?.__typename === 'productsPage' ||
    target?.[0]?.__typename === 'ContentfulProductsPage'
  ) {
    return (
      <ButtonLink
        target={target}
        icon={<IconShoppingCart />}
        displayText={displayText}
        className="min-w-[300px] sm:min-w-[324px]"
        id={analyticsTagId}
      />
    )
  }

  return (
    <Link to={target?.slug} id={analyticsTagId}>
      <Button text={displayText} />
    </Link>
  )
}

const IconLink = ({ downloadLink, children }) => {
  if (downloadLink) {
    return (
      <A
        to={downloadLink?.target?.[0]?.slug}
        href={downloadLink?.target?.[0]?.url}
        alt={downloadLink?.displayText}
        id={downloadLink?.analyticsTagId}
      >
        {children}
      </A>
    )
  }
  return children
}

const Hero = ({
  ctaLink1,
  ctaLink2,
  subtitle,
  titleLine1,
  titleLine2,
  titleLine3,
  subtitle1,
  shopifyProducts,
  backgroundMedia,
  comingSoonLine1,
  comingSoonLine2,
  downloadLink1,
  downloadLink2,
  downloadLink3,
  downloadLink4,
  deviceListLink,
  ...rest
}) => {
  const heroRef = useRef(null)
  const heroTimeline = useRef(null)
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

        gsap.set('.hero__title', {
          autoAlpha: 0,
          scale: noMotion ? 1 : 0.75,
          x: noMotion ? 0 : '-15vw',
        })

        gsap.set('.hero__overlay', {
          autoAlpha: 1,
        })

        gsap.set('.hero__copy', {
          autoAlpha: 0,
          y: noMotion ? 0 : '2vh',
        })

        heroTimeline.current = gsap.timeline()

        heroTimeline.current
          .to('.hero__title', {
            autoAlpha: 1,
            scale: 1,
            delay: 0.5,
            duration: 0.5,
            ease: 'power1.in',
          })
          .to(
            '.hero__title',
            {
              x: 0,
              duration: 0.5,
              ease: 'back.out(1.4)',
            },
            '-=0.5'
          )

        heroTimeline.current.to('.hero__overlay', {
          autoAlpha: 0.4,
          duration: 0.35,
          ease: 'power1.out',
        })

        heroTimeline.current.to('.hero__copy', {
          autoAlpha: 1,
          duration: 0.35,
          ease: 'power2.out',
          y: 0,
          stagger: 0.25,
        })
      },
      heroRef
    )

    return () => mm.revert()
  }, [prefersReducedMotion])

  return (
    <section ref={heroRef} className="relative">
      <BackgroundMedia backgroundMedia={backgroundMedia} />
      <div className="hero__overlay opacity-1 absolute inset-0 h-full w-full bg-black" />
      <Container className="min-h-[50vh] w-full items-center justify-center pb-20 text-center xl:pb-14 2xl:pb-12">
        <div>
          <h1 className="hero__title whitespace-wrap mx-auto mt-[224px] flex w-fit max-w-[354px] flex-col font-tacticSansExt text-[48px] font-extrabold uppercase leading-[56px] tracking-wider text-white opacity-0 drop-shadow-4xl sm:max-w-full lg:mt-[256px] lg:text-5xl lg:leading-[56px] xl:text-[64px] xl:leading-[64px]">
            {titleLine1} <br className="hidden sm:block" />
            {titleLine2} <br className="hidden sm:block" />
            {titleLine3} <br className="hidden sm:block" />
          </h1>
          {subtitle1 && (
            <h2 className="hero__title whitespace-wrap mx-auto mt-4 flex w-fit max-w-[354px] flex-col font-tacticSansExt text-[32px] font-extrabold uppercase leading-[48px] tracking-wider text-white opacity-0 drop-shadow-4xl sm:max-w-full md:text-[40px]">
              {subtitle1}
            </h2>
          )}
          <p className="hero__copy mx-auto mt-8 max-w-[763px] rounded-2xl bg-black/30 py-2 px-4 font-itcGothic text-base leading-8 text-white opacity-0 backdrop-blur-md">
            {subtitle}
          </p>
          <div className="hero__copy mt-8 flex flex-col flex-wrap items-center justify-center gap-6 opacity-0 md:flex-row lg:mt-12">
            <ExternalInternalorModalLink
              {...ctaLink1}
              shopifyProducts={shopifyProducts}
            />
            <ExternalInternalorModalLink
              {...ctaLink2}
              shopifyProducts={shopifyProducts}
            />
          </div>
          <div className="hero__copy mt-8 opacity-0 lg:mt-12">
            <h2 className="font-tacticSansExt text-base font-extrabold uppercase tracking-wider text-white drop-shadow-xl">
              {comingSoonLine1}
              <br className="sm:hidden" /> {comingSoonLine2}
            </h2>
            <div className="mx-auto mt-8 flex w-fit flex-col items-center justify-center justify-items-center gap-8 md:grid md:grid-cols-2 lg:flex lg:flex-row">
              <IconLink downloadLink={downloadLink1}>
                <Playstation />
              </IconLink>
              <IconLink downloadLink={downloadLink2}>
                <PS5 />
              </IconLink>
              <IconLink downloadLink={downloadLink3}>
                <PS4 />
              </IconLink>
              <IconLink downloadLink={downloadLink4}>
                <Apple />
              </IconLink>
            </div>
            <span className="mt-7 block lg:mt-4">
              <HWRRLink
                fakeButton={false}
                target={deviceListLink?.target}
                displayText={deviceListLink?.displayText}
                className="font-itcGothic text-sm font-medium tracking-wider text-white [text-shadow:_0px_4px_16px_#031E28]"
              />
            </span>
          </div>
        </div>
      </Container>
      <div
        className="absolute bottom-0 right-0 h-[100px] w-full md:w-1/2 xl:w-1/3"
        style={{
          clipPath:
            'polygon(0 100%, 56px calc(100% - 40px), calc(100% - 84px) calc(100% - 40px), 100% calc(100% - 100px), 100% 100%)',
        }}
      >
        <BackgroundTexture />
      </div>
    </section>
  )
}

export default Hero
