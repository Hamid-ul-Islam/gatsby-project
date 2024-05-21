import { Link } from 'gatsby'
import { Popover, Transition } from '@headlessui/react'
import { useLocale } from '@context/localeContext'
import { formatPreviewSlug, isPreviewPage } from '@utils/preview'
import { CONTENTFUL_PAGE_IDS } from '@constants'
import GlobeDefault from '@images/locale-switcher/globe-default.svg'
import GlobeActive from '@images/locale-switcher/globe-active.svg'
import IconArrowDown from '@images/icon-arrow-down.svg'

const Globe = ({ open = false }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`${
          open ? 'drop-shadow-[0px_0px_16px_#F7C6A5]' : 'filter-none'
        } grid cursor-pointer grid-cols-1 items-center justify-items-center transition`}
      >
        <GlobeActive
          className={`${
            open ? 'opacity-1' : 'opacity-0'
          } col-start-1 row-start-1 transition`}
        />
        <GlobeDefault className="col-start-1 row-start-1" />
      </div>
      <IconArrowDown
        className={`${open ? 'rotate-180' : 'rotate-0'} ml-1 transition`}
      />
    </div>
  )
}

const Languages = () => {
  const { locale: currentLocale } = useLocale()

  const getLocalizedHomeSlug = (locale) => {
    const previewSlug = formatPreviewSlug(CONTENTFUL_PAGE_IDS.home)

    if (locale === 'en-US') {
      return isPreviewPage() ? `/${previewSlug}` : '/'
    }

    return isPreviewPage() ? `/${locale}/${previewSlug}` : `/${locale}`
  }

  return (
    <div
      className={`border-style-solid absolute flex flex-col items-center gap-2 border-[3px] border-[#F7C6A5] bg-white p-2 transition`}
    >
      {[
        { slug: 'en-US', name: 'U.S. (English)' },
        { slug: 'fr-CA', name: 'Canada (French)' },
        { slug: 'es-MX', name: 'Mexico (Spanish)' },
      ].map((locale) => (
        <Popover.Button
          as={Link}
          key={locale.slug}
          to={getLocalizedHomeSlug(locale.slug)}
          disabled={locale.slug === currentLocale}
          className={`
            block 
            w-28
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
        </Popover.Button>
      ))}
    </div>
  )
}

const LocalePicker = ({ scrollView }) => {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button className="align-bottom" aria-label="localePicker">
            <Globe open={open} />
          </Popover.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="-translate-y-10 opacity-0"
            enterTo="translate-y-0 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="translate-y-0 opacity-100"
            leaveTo="-translate-y-10 opacity-0"
            className={`absolute ${
              scrollView ? 'top-[61px]' : 'top-[69px]'
            } right-[104px] -z-10`}
          >
            <Popover.Panel>
              <Languages open={open} />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}

export default LocalePicker
