import { useRef, useState } from 'react'
import { Link } from 'gatsby'
import { useIsomorphicLayoutEffect } from 'react-use'
import gsap from 'gsap'
import { useLocale } from '@context/localeContext'
import { formatPreviewSlug, isPreviewPage } from '@utils/preview'
import { CONTENTFUL_PAGE_IDS } from '@constants'
import GlobeDefault from '@images/locale-switcher/globe-default.svg'
import GlobeActive from '@images/locale-switcher/globe-active.svg'
import IconArrowDown from '@images/icon-arrow-down.svg'
import BackgroundTexture from '@components/common/backgroundTexture'

const Globe = ({ isOpen = false }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${
          isOpen ? 'drop-shadow-[0px_0px_16px_#F7C6A5]' : 'filter-none'
        } grid cursor-pointer grid-cols-1 items-center justify-items-center transition`}
      >
        <GlobeActive
          className={`${
            isOpen ? 'opacity-1' : 'opacity-0'
          } col-start-1 row-start-1 transition`}
        />
        <GlobeDefault className="col-start-1 row-start-1" />
      </div>
      <IconArrowDown
        className={`${isOpen ? 'rotate-180' : 'rotate-0'} ml-1 transition`}
      />
    </div>
  )
}

const Languages = ({ setIsNavOpen }) => {
  const { locale: currentLocale } = useLocale()

  const getLocalizedHomeSlug = (locale) => {
    const previewSlug = formatPreviewSlug(CONTENTFUL_PAGE_IDS.home)

    if (locale === 'en-US') {
      return isPreviewPage() ? `/${previewSlug}` : '/'
    }

    return isPreviewPage() ? `/${locale}/${previewSlug}` : `/${locale}`
  }

  return [
    { slug: 'en-US', name: 'U.S. (English)' },
    { slug: 'fr-CA', name: 'Canada (French)' },
    { slug: 'es-MX', name: 'Mexico (Spanish)' },
  ].map((locale) => (
    <Link
      key={locale.slug}
      onClick={() => setIsNavOpen(false)}
      to={getLocalizedHomeSlug(locale.slug)}
      disabled={locale.slug === currentLocale}
      className={`
            my-2 
            block
            w-full 
            border-2 
            border-transparent
            py-3
            text-center
            font-sans
            text-base 
            font-bold 
            leading-5 
            tracking-wider 
            transition 
            first:mt-4 
            last:mb-4 
            hover:border-[#F7C6A5] 
            hover:bg-orange
            hover:shadow-locale-hover
            ${
              locale.slug === currentLocale &&
              'cursor-not pointer-events-none border-[#F7C6A5] bg-orange shadow-locale-hover'
            }
          `}
    >
      {locale.name}
    </Link>
  ))
}

const LocalePicker = ({ setIsNavOpen }) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuTimeline = useRef(null)
  const menuRef = useRef(null)

  const toggleIsOpen = () => setIsOpen((prev) => !prev)

  useIsomorphicLayoutEffect(() => {
    const menu = menuRef.current

    const ctx = gsap.context(() => {
      menuTimeline.current = gsap
        .timeline({
          paused: true,
          defaults: {
            duration: 0.25,
            ease: 'power2.inOut',
          },
        })
        .to(menu, {
          height: 'auto',
          marginBottom: 16,
          clipPath:
            'polygon(0 48px, calc(50% - 48px) 48px, calc(50% + 0px) 0, 100% 0, 100% calc(100% - 48px), calc(50% + 48px) calc(100% - 48px), calc(50% - 0px) 100%,  0 100%)',
        })
        .reverse()
    })

    return () => ctx.revert()
  }, [])

  useIsomorphicLayoutEffect(() => {
    menuTimeline.current.reversed(!isOpen)
  }, [isOpen])

  return (
    <div className="flex flex-col items-center">
      <button onClick={toggleIsOpen} className="mb-2">
        <Globe isOpen={isOpen} />
      </button>
      <div
        ref={menuRef}
        className="mb-0 h-12 w-full overflow-hidden"
        style={{
          clipPath:
            'polygon(0 48px, calc(50% - 24px) 48px, calc(50% + 24px) 0, 100% 0, 100% calc(100% - 48px), calc(50% + 24px) calc(100% - 48px), calc(50% - 24px) 100%,  0 100%)',
        }}
      >
        <BackgroundTexture gradient="linear-gradient(360deg, #E7E7E7 15%, rgba(244, 244, 244, 0) 90%)">
          <div className="px-2 py-12 sm:px-16 md:px-32">
            <Languages setIsNavOpen={setIsNavOpen} />
          </div>
        </BackgroundTexture>
      </div>
    </div>
  )
}

export default LocalePicker
