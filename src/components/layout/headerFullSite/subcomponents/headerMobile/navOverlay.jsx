import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Transition } from '@headlessui/react'
import Close from '@images/header/close.svg'
import OrnamentLeftOrange from '@images/header/ornament-left-orange.svg'
import OrnamentRightWhite from '@images/header/ornament-right-white.svg'
import LocalePicker from './localePicker'
import A from '@components/common/A'

const NavLinks = ({ links, setIsOpen }) => {
  return (
    <nav className="font-tacticSansExt text-white">
      <ul className="flex list-none flex-col">
        {links.map(({ id, label, category, url, type }, i) => (
          <li
            key={id}
            className="relative m-0 flex justify-center py-8 after:absolute after:bottom-0 after:block after:h-[1px] after:w-full after:bg-white last:after:hidden"
          >
            <Transition.Child
              as="span"
              enter="transition ease-in-out delay-[var(--delay)] duration-300 transform"
              enterFrom="-translate-x-full opacity-0"
              enterTo="translate-x-0 opacity-100"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              style={{ '--delay': `${i * 100 + 200}ms` }}
            >
              <A
                onClick={() => setIsOpen(false)}
                to={type === 'internal' ? url : null}
                href={type === 'external' ? url : null}
                category={category}
                className="block w-fit text-[18px] uppercase tracking-wide transition hover:text-yellow aria-[current=page]:pointer-events-none aria-[current=page]:text-yellow"
              >
                {label}
              </A>
            </Transition.Child>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const RaciingStripesTop = () => (
  <span className="relative block h-3 w-full border-t-2 border-white">
    <OrnamentRightWhite className="absolute -top-[2px] left-0" />
  </span>
)

const RaciingStripesBottom = () => (
  <span className="relative block h-3 w-full border-b-2 border-yellow">
    <OrnamentLeftOrange className="absolute -top-[2px] right-0" />
  </span>
)

const RacingFlag = () => (
  <span
    className="block h-[30px] w-full bg-[size:20px_30px] bg-repeat-x md:h-[60px] md:bg-[size:40px_60px]"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 40 60' width='40' height='60' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0' y='0' width='20' height='20' fill='white' /%3E%3Crect x='0' y='20' width='20' height='20' fill='black' /%3E%3Crect x='0' y='40' width='20' height='20' fill='white' /%3E%3Crect x='20' y='0' width='20' height='20' fill='black' /%3E%3Crect x='20' y='20' width='20' height='20' fill='white' /%3E%3Crect x='20' y='40' width='20' height='20' fill='black' /%3E%3C/svg%3E")`,
    }}
  />
)

const NavOverlay = ({ links, isOpen, setIsOpen }) => {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-200 ease-in-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition duration-150 ease-in-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      as={Fragment}
    >
      <Dialog onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 overflow-y-auto" data-lenis-prevent>
          <Dialog.Panel className="flex h-fit min-h-screen w-screen flex-col justify-between bg-black">
            <div className="flex flex-col">
              <Close
                width="32px"
                height="32px"
                className="my-4 mr-4 h-fit cursor-pointer self-end"
                onClick={() => setIsOpen(false)}
              />
              <LocalePicker setIsNavOpen={setIsOpen} />
              <div className="mb-16 sm:px-16 md:px-32">
                <RaciingStripesTop />
                <NavLinks links={links} setIsOpen={setIsOpen} />
                <RaciingStripesBottom />
              </div>
            </div>
            <RacingFlag />
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}

NavOverlay.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      category: PropTypes.string,
      url: PropTypes.string,
      type: PropTypes.oneOf(['internal', 'external']),
    })
  ),
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
}

export default NavOverlay
