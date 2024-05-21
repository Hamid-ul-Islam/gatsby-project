import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useIsomorphicLayoutEffect, useWindowScroll } from 'react-use'
import { Transition } from '@headlessui/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import gsap from 'gsap'
import * as headerStyles from '../../header.module.css'
import ReducedMotionToggle from '@components/layout/reducedMotionToggle'
import Container from '@components/layout/container'
import Cart from '@components/common/cart'
import LocalePicker from './localePicker'
import A from '@components/common/A'

const NavLinks = ({ links }) => (
  <ul className="flex list-none items-center justify-center gap-6 min-[1440px]:gap-10">
    {links?.map(({ id, label, category, url, type }) => (
      <li
        key={id}
        className="m-0 flex-1 text-center font-itcGothic text-xl font-bold uppercase tracking-wide text-white 2xl:flex-auto"
      >
        <A
          to={type === 'internal' ? url : null}
          href={type === 'external' ? url : null}
          category={category}
          className={`
            underline-offset-4 
            drop-shadow-[0px_2px_16px_#DB4B00] 
            transition 
            hover:underline 
            hover:drop-shadow-[0_0_16px_#F7C6A5] hover:[-webkit-text-stroke:1px_#F7C6A5] 
            aria-[current=page]:pointer-events-none
            aria-[current=page]:underline
            aria-[current=page]:drop-shadow-[0_0_16px_#F7C6A5]
            aria-[current=page]:[-webkit-text-stroke:1px_#F7C6A5]
          `}
        >
          {label}
        </A>
      </li>
    ))}
  </ul>
)

const HeaderDesktop = ({ links, logo, logoHorizontal, homeUrl }) => {
  const headerRef = useRef(null)
  const headerTimeline = useRef(null)
  const [scrollView, setScrollView] = useState(false)
  const { y } = useWindowScroll()

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

  return (
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
          <nav className="relative flex h-24 w-full items-center justify-between pl-0 pr-12 min-[1440px]:pr-16">
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
              <div className="relative ml-0 flex w-[168px] items-center min-[1440px]:ml-9 min-[1440px]:w-[220px]">
                <GatsbyImage
                  image={logo}
                  alt="Rift Rally logo"
                  loading="eager"
                />
              </div>
            </A>
            <div className="relative ml-4 flex items-center gap-6 min-[1440px]:ml-8 min-[1440px]:gap-10">
              <NavLinks links={links} />
              <LocalePicker />
              <Cart disabled={scrollView} />
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
        <nav className="relative h-[100px] w-full">
          <div
            className={`${headerStyles.header_glow} absolute inset-0 h-full w-full`}
          >
            <div className={headerStyles.header_scroll_nav_border} />
            <div className={headerStyles.header_scroll_nav_background} />
          </div>
          <div className="flex h-full w-full items-center justify-between pl-8 pr-8 min-[1440px]:pr-12">
            <A to={homeUrl}>
              <GatsbyImage
                image={logoHorizontal}
                className="mr-2 w-[206px]"
                alt="Rift Rally logo"
                loading="eager"
              />
            </A>
            <div className="relative mb-5 flex flex-1 justify-center">
              <NavLinks links={links} />
            </div>
            <div className="relative mb-5 flex items-center gap-6 min-[1440px]:gap-8">
              <LocalePicker scrollView />
              <Cart disabled={!scrollView} />
            </div>
          </div>
        </nav>
      </Transition>
    </header>
  )
}

HeaderDesktop.propTypes = {
  links: PropTypes.array,
  logo: PropTypes.object,
  logoHorizontal: PropTypes.object,
  homeUrl: PropTypes.string,
}

export default HeaderDesktop
