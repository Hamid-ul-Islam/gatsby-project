import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Transition } from '@headlessui/react'
import BackgroundTexture from '../backgroundTexture'
import Close from '@images/video-modal-close.svg'
import { useLenis } from '@context/lenisContext'

const getYoutubeId = (url) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

const getVideoEmbedUrl = (url) => {
  const youtubeId = getYoutubeId(url)

  if (youtubeId) {
    const params =
      'controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1'
    const videoUrl = `https://www.youtube.com/embed/${youtubeId}?${params}}`

    return videoUrl
  }

  // add other vendors here

  return null
}

const videoEmbedModal = ({
  url = '',
  isOpen = false,
  setIsOpen = () => {},
}) => {
  const videoEmbedUrl = getVideoEmbedUrl(url)
  const { lenis } = useLenis()

  useEffect(() => {
    if (isOpen) {
      lenis?.stop()
    }

    if (!isOpen) {
      lenis?.start()
    }
  }, [isOpen, lenis])

  if (!videoEmbedUrl) return

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={() => setIsOpen(false)} className="fixed inset-0 z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div
            className="fixed inset-0 flex items-center justify-center p-4 md:p-16 lg:p-32 xl:p-48 2xl:p-64"
            style={{
              filter: 'drop-shadow(0px 0px 40px rgba(12, 226, 255, 0.5))',
            }}
          >
            <Dialog.Panel
              className="relative w-full max-w-screen-xl"
              style={{
                clipPath: `polygon(
                    0 40px, 
                    calc(52% - 28px) 40px, 
                    calc(52% + 28px) 0, 
                    100% 0, 
                    100% calc(100% - 40px), 
                    calc(48% + 28px) calc(100% - 40px),
                    calc(48% - 28px) 100%,
                    0 100%
                  )`,
              }}
            >
              <BackgroundTexture gradient="linear-gradient(360deg, #E7E7E7 15%, rgba(244, 244, 244, 0) 90%)">
                <div className="px-4 py-16 md:px-6 md:py-24">
                  <iframe
                    src={videoEmbedUrl}
                    title="YouTube video player"
                    className="aspect-video h-full w-full bg-black"
                  />
                </div>
              </BackgroundTexture>
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 flex h-fit w-fit justify-end md:top-6 md:right-6"
              >
                <Close className="h-[30px] w-[30px] md:h-auto md:w-auto" />
              </button>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

videoEmbedModal.propTypes = {
  url: PropTypes.string,
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
}

export default videoEmbedModal
