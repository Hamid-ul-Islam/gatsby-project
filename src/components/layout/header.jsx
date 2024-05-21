import { useRef, useState, useEffect } from 'react'
import { useIsomorphicLayoutEffect, useMedia, useWindowScroll } from 'react-use'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useLocale } from '@context/localeContext'
import { handleScrollToFirstPreorderSection } from '@utils'
import * as headerStyles from './header.module.css'
import Container from '@components/layout/container'
import Cart from '@components/common/cart'
import Button from '@components/common/button'
import IconPlay from '@images/icon-play-circle.svg'
import ReducedMotionToggle from './reducedMotionToggle'
import LocalePicker from './localePicker'
import IconShoppingCart from '@images/icon-cart.svg'

const clipPaths = {
  desktopBackground:
    'lg:[clip-path:polygon(0_0,_100%_0,_100%_100%,_calc(100%_-_117px)_calc(100%_-_64px),_0_calc(100%_-_64px))]',
  desktopBorder:
    'lg:[clip-path:polygon(0_0,_100%_0,_100%_100%,_calc(100%_-_118px)_calc(100%_-_64px),_0_calc(100%_-_64px))]',
  mobileBackground:
    '[clip-path:polygon(0_0,_100%_0,_100%_100%,_calc(100%_-_96px)_100%,_calc(100%_-_119px)_calc(100%_-_16px),_0_calc(100%_-_16px))]',
  mobileBorder:
    '[clip-path:polygon(0_0,_100%_0,_100%_100%,_calc(100%_-_100px)_100%,_calc(100%_-_123px)_calc(100%_-_16px),_0_calc(100%_-_16px))]',
}

const Header = ({ displayScrollToPreorderButtonNav }) => {
  const { getLocalizedSlug, locale } = useLocale()
  const [scrollView, setScrollView] = useState(false)
  const { y } = useWindowScroll()

  const headerContentfulData = useStaticQuery(graphql`
    {
      header: allContentfulHeaderNavigation(
        filter: { internalNickname: { ne: "[CMS SCHEMA REQUIRED]" } }
      ) {
        nodes {
          preOrderCta
          node_locale
        }
      }
      logo: file(relativePath: { eq: "header/rr-logo-3x.png" }) {
        childImageSharp {
          gatsbyImageData(placeholder: NONE, quality: 50)
        }
      }
    }
  `)

  const preOrderCta = headerContentfulData?.header?.nodes?.filter(
    (node) => node.node_locale === locale
  )[0]?.preOrderCta

  const navRef = useRef(null)

  useIsomorphicLayoutEffect(() => {
    if (y > 200) {
      setScrollView(true)
    } else {
      setScrollView(false)
    }
  }, [y, setScrollView])

  const isMobile = useMedia('(max-width: 1023px)', true)

  return (
    <header
      className={`${
        scrollView ? 'fixed top-0 ' : `absolute top-16`
      } z-40 flex h-12 w-full`}
    >
      {!scrollView && (
        <Container>
          <nav
            ref={navRef}
            className={`mr relative flex h-24 w-full items-center justify-between pl-0 pr-12 md:pr-16`}
          >
            <div
              id="reduced-motion"
              className="absolute right-6 -top-10 flex h-full w-full items-start justify-end"
            >
              <ReducedMotionToggle />
            </div>
            <div
              className={`absolute h-full w-full ${headerStyles.header_glow}`}
            >
              <div className={headerStyles.header_background_border} />
              <div className={headerStyles.header_background} />
            </div>
            <Link to={getLocalizedSlug({ slug: '/home' })}>
              <div className="relative mb-6 flex w-[168px] items-center lg:ml-9 lg:mb-0 lg:w-[220px]">
                <GatsbyImage
                  image={getImage(headerContentfulData?.logo)}
                  alt="Rift Rally logo"
                  loading="eager"
                />
              </div>
            </Link>
            <div className="flex items-center gap-3 lg:gap-8">
              <button
                className={`hidden items-center font-itcGothic text-xl font-bold uppercase tracking-wide text-white drop-shadow-md lg:flex`}
                onClick={handleScrollToFirstPreorderSection}
              >
                {preOrderCta}
              </button>
              <LocalePicker />
              <Cart />
            </div>
          </nav>
        </Container>
      )}
      {scrollView && displayScrollToPreorderButtonNav && (
        <div
          className={`${headerStyles.header_glow} relative flex h-32 w-full items-center sm:pr-8 lg:h-[104px] lg:items-end lg:pb-5`}
        >
          <div className="absolute top-0 left-0 flex h-full w-full">
            <div className="relative flex-1">
              <div
                className={`absolute h-full w-full bg-[#f7c6a5] ${clipPaths.mobileBorder} ${clipPaths.desktopBorder}`}
              />
              <div
                className={`absolute top-[3px] left-[3px] h-[calc(100%_-_6px)] w-[calc(100%_-_6px)] bg-[linear-gradient(270deg,_#fb5600_0%,_#f99300_73%)] lg:w-[calc(100%_-_3px)] ${clipPaths.mobileBackground} ${clipPaths.desktopBackground}`}
              />
              <div className="flex h-full w-full items-center justify-center gap-4 px-5 sm:justify-end lg:hidden">
                <Button
                  bgColor="darkBlue"
                  className="relative border-white"
                  text={preOrderCta}
                  onClick={handleScrollToFirstPreorderSection}
                  icon={<IconShoppingCart />}
                />
                <Cart />
              </div>
            </div>
            <div className="hidden h-full w-fit bg-[#f7c6a5] lg:block">
              <div className="relative left-[-1px] h-full w-fit bg-[#f7c6a5] py-[3px] pr-[2px]">
                <div className="flex h-full w-full items-center justify-center gap-4 bg-[#fb5600] px-5 sm:justify-end">
                  <Button
                    bgColor="darkBlue"
                    className="border-white"
                    text={preOrderCta}
                    onClick={handleScrollToFirstPreorderSection}
                    icon={<IconShoppingCart />}
                  />
                  <Cart disabled={isMobile} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
