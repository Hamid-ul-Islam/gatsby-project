import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useIsomorphicLayoutEffect, useWindowScroll } from 'react-use'
import { Transition } from '@headlessui/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useLenis } from '@context/lenisContext'
import gsap from 'gsap'
import * as headerStyles from '../../header.module.css'
import Container from '@components/layout/container'
import Cart from '@components/common/cart'
import A from '@components/common/A'
import NavOverlay from './navOverlay'
import ReducedMotionToggle from '../reducedMotionToggle'
import Hamburger from '@images/header/hamburger.svg'

const HeaderMobile = ({ links, logo, logoHorizontal, homeUrl }) => {
  const headerRef = useRef(null)
  const headerTimeline = useRef(null)

  const [scrollView, setScrollView] = useState(false)
  const { y } = useWindowScroll()
  const { lenis } = useLenis()

  const [isOpen, setIsOpen] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const header = headerRef.current

    const ctx = gsap.context(() => {
      gsap.set(header, {
        autoAlpha: 0,
      })

      headerTimeline.current = gsap.timeline().to(header, {
        autoAlpha: 1,
        duration: 0.25,
        ease: 'power2.inOut',
      })
    })

    return () => ctx.revert()
  }, [])

  useIsomorphicLayoutEffect(() => {
    y > 200 ? setScrollView(true) : setScrollView(false)
  }, [y, setScrollView])

  useIsomorphicLayoutEffect(() => {
    isOpen ? lenis?.stop() : lenis?.start()
  }, [isOpen, lenis])

  return (
    <>
      <header ref={headerRef} className="z-50 opacity-0">
        <Transition
          show={!scrollView}
          className="absolute top-16 z-40 w-full"
          enter="transition duration-300"
          enterFrom="opacity-0 -translate-y-8"
          enterTo="opacity-100 translate-y-0"
          leave="transition duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-8"
        >
          <Container>
            <nav className="relative flex h-24 w-full items-center justify-between pl-0 pr-10">
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
              <A to={homeUrl}>
                <div className="relative flex w-[168px] items-center">
                  <GatsbyImage
                    image={logo}
                    alt="Rift Rally logo"
                    loading="eager"
                  />
                </div>
              </A>
              <div className="relative flex items-center gap-5">
                <Cart disabled={scrollView} />
                <Hamburger
                  className="cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            </nav>
          </Container>
        </Transition>
        <Transition
          show={scrollView}
          className="fixed top-0 z-50 w-full"
          enter="transition duration-300"
          enterFrom="opacity-0 -translate-y-8"
          enterTo="opacity-100 translate-y-0"
          leave="transition duration-200"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-8"
        >
          <nav
            className={`${headerStyles.header_glow} relative h-[100px] w-full`}
          >
            <div className="absolute inset-0 h-full w-full">
              <div className={headerStyles.header_scroll_nav_border} />
              <div className={headerStyles.header_scroll_nav_background} />
            </div>
            <div className="flex h-full w-full items-center justify-between px-5 md:px-8">
              <A to={homeUrl}>
                <GatsbyImage
                  image={logoHorizontal}
                  className="w-[206px]"
                  alt="Rift Rally logo"
                  loading="eager"
                />
              </A>
              <div className="relative mb-5 flex items-center gap-5 md:gap-8">
                <Cart disabled={!scrollView} />
                <Hamburger
                  className="cursor-pointer"
                  onClick={() => setIsOpen(!isOpen)}
                />
              </div>
            </div>
          </nav>
        </Transition>
      </header>
      <NavOverlay isOpen={isOpen} setIsOpen={setIsOpen} links={links} />
    </>
  )
}

HeaderMobile.propTypes = {
  links: PropTypes.array,
  logo: PropTypes.object,
  logoHorizontal: PropTypes.object,
  homeUrl: PropTypes.string,
}

export default HeaderMobile
