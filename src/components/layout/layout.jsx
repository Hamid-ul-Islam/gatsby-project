import React, { Fragment, useEffect } from 'react'
import { useLocation } from '@reach/router'
// import { Toaster } from 'react-hot-toast'
import { useIsomorphicLayoutEffect } from 'react-use'
import Lenis from '@studio-freight/lenis'
import Header from '@components/layout/header'
import HeaderFullSite from '@components/layout/headerFullSite'
import Footer from '@components/layout/footer'
import { useLenis } from '@context/lenisContext'
import { featureFlags, isFeatureEnabled } from '@featureflags'
// import ScrollBar from '@components/layout/scrollBar'
// import { useIsTouchDevice } from '@hooks/useIsTouchDevice'
// import { isSSR } from '@utils'
// import { isPreviewPage } from '@utils/preview'
// import { isUserToolsEnabled } from '../../../featureflags'
// import UserTools from '@components/common/userTools'

// preloader represents a loading screen that is displayed when the page is loading
// not in designs currently, but keeping here for future use
// in case we want to add a loading screen
// please note, the animation delay on hero will
// need to be adjusted in order to account for the preloader
// if added
// import Preloader from '@components/layout/preloader';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const Layout = ({ children, ...rest }) => {
  const location = useLocation()
  const { pathname } = location
  const displayScrollToPreorderButtonNav =
    pathname === '/' ||
    pathname === '/fr-CA/' ||
    pathname === '/fr-CA' ||
    pathname === '/es-MX/' ||
    pathname === '/es-MX'
  const { setLenis, lenis } = useLenis()
  // const isTouchDevice = useIsTouchDevice()

  useIsomorphicLayoutEffect(() => {
    const lenis = new Lenis({
      duration: 0.6,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical', // vertical, horizontal
      gestureDirection: 'vertical', // vertical, horizontal, both
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    })

    setLenis(lenis)

    const lenisRaf = (time) => {
      lenis?.raf(time)
      requestAnimationFrame(lenisRaf)
    }
    requestAnimationFrame(lenisRaf)

    return () => {
      lenis.destroy()
    }
  }, [])

  useIsomorphicLayoutEffect(() => {
    if (lenis) ScrollTrigger.refresh()
  }, [])

  // useIsomorphicLayoutEffect(() => {
  //   const setViewHeight = () => {
  //     document.documentElement.style.setProperty(
  //       '--vh',
  //       window.innerHeight * 0.01 + 'px'
  //     )
  //   }

  //   window.addEventListener('resize', setViewHeight)
  //   setViewHeight()

  //   return () => {
  //     window.removeEventListener('resize', setViewHeight)
  //   }
  // }, [])

  return (
    <Fragment>
      {/* {isTouchDevice === false && <ScrollBar />} */}
      {/* <Preloader /> */}
      {/* <Toaster position="bottom-right" /> */}
      <div className="flex h-full flex-col">
        {isFeatureEnabled(featureFlags.PREORDER_SITE) ? (
          <Header
            displayScrollToPreorderButtonNav={displayScrollToPreorderButtonNav}
          />
        ) : (
          <HeaderFullSite />
        )}
        <main className="from-orange-100 via-orange-50 to-orange-100 flex h-full grow flex-col justify-center bg-gradient-to-t bg-fixed">
          {children}
        </main>
        <Footer />
      </div>
    </Fragment>
  )
}

export default Layout
