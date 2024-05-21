import { useRef, useState } from 'react'
import { useIsomorphicLayoutEffect, useWindowScroll } from 'react-use'
import { Transition } from '@headlessui/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import gsap from 'gsap'
import * as headerStyles from '../../header.module.css'
import Container from '@components/layout/container'
import A from '@components/common/A'

const NavLinks = ({ links }) => (
  <ul className="flex list-none items-center justify-center gap-10">
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
          <nav className="relative flex h-24 w-full items-center justify-between pl-0 pr-16">
            <div
              className={`absolute h-full w-full ${headerStyles.header_glow}`}
            >
              <div className={headerStyles.header_background_border} />
              <div className={headerStyles.header_background} />
            </div>
            <div className="relative ml-9 flex w-[220px] items-center">
              <GatsbyImage image={logo} alt="Rift Rally logo" loading="eager" />
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
          <div className="flex h-full w-full items-center justify-between pl-8 pr-12">
            <GatsbyImage
              image={logoHorizontal}
              className="w-[206px]"
              alt="Rift Rally logo"
              loading="eager"
            />
            <div className="relative mb-5 flex flex-1 justify-center">
              <NavLinks links={links} />
            </div>
          </div>
        </nav>
      </Transition>
    </header>
  )
}

export default HeaderDesktop
