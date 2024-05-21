import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useIsomorphicLayoutEffect, useMedia } from 'react-use'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '@hooks/useReducedMotion'
import Image from '@components/common/image'

const BackgroundVideo = ({
  src,
  poster,
  videoTriggerStart,
  videoTriggerEnd,
  useImageFallbackMobile,
}) => {
  if (!src) return null

  const videoRef = useRef(null)
  const s = useRef(null)

  const { prefersReducedMotion } = useReducedMotion()
  const prefersReducedMotionSystem = useMedia(
    '(prefers-reduced-motion: reduce)'
  )
  const isMobile = useMedia('(max-width: 767px)')
  const [useImageFallback, setUseImageFallback] = useState(
    isMobile && useImageFallbackMobile
  )

  const handleVideoToggle = (isActive, video) => {
    if (isActive) {
      const playPromise = video?.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            video?.pause()
            video?.play()
          })
          .catch((error) => console.error(error))
      }
    } else {
      const playPromise = video?.play()

      if (playPromise !== undefined) {
        playPromise
          .then(() => video?.pause())
          .catch((error) => console.error(error))
      }
    }
  }

  const bgImage = poster && `https:${poster}`

  const bgImageClasses = {
    bgDesktop: bgImage ? `lg:bg-[image:var(--bg-desktop)]` : '',
    bgTablet: bgImage ? `bg-[image:var(--bg-tablet)]` : '',
  }

  useIsomorphicLayoutEffect(() => {
    const video = videoRef.current
    const mm = gsap.matchMedia()

    mm.add(
      {
        reducedMotion: '(prefers-reduced-motion: reduce)',
        notReducedMotion: '(prefers-reduced-motion: no-preference)',
      },
      (context) => {
        const { reducedMotion } = context.conditions
        const noMotion = prefersReducedMotion || reducedMotion

        s.current = ScrollTrigger.create({
          trigger: video,
          start: videoTriggerStart,
          end: videoTriggerEnd,
          onToggle: ({ isActive }) =>
            !noMotion
              ? handleVideoToggle(isActive, video)
              : handleVideoToggle(false, video),
        })
      }
    )

    return () => mm.revert()
  }, [prefersReducedMotion, prefersReducedMotionSystem, useImageFallback])

  useIsomorphicLayoutEffect(() => {
    if (isMobile && useImageFallbackMobile) {
      setUseImageFallback(true)
    } else {
      setUseImageFallback(false)
    }
  }, [isMobile, useImageFallbackMobile])

  return !prefersReducedMotion &&
    !prefersReducedMotionSystem &&
    !useImageFallback ? (
    <video
      ref={videoRef}
      className={`absolute inset-0 block h-full w-full bg-black bg-cover bg-center object-cover ${bgImageClasses.bgDesktop} ${bgImageClasses.bgTablet}`}
      style={{
        '--bg-desktop': bgImage
          ? `url(${bgImage}?w=1920&h=1080&fm=webp&q=50)`
          : '',
        '--bg-tablet': bgImage
          ? `url(${bgImage}?w=960&h=540&fm=webp&q=50)`
          : '',
      }}
      poster={
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      }
      playsInline
      muted
      loop
      preload="none"
    >
      {/* TODO: webm default with mp4 fallback */}
      <source src={src} type="video/mp4" />
    </video>
  ) : (
    <Image
      src={bgImage || ''}
      className="absolute inset-0 block h-full w-full bg-black bg-cover bg-center object-cover"
    />
  )
}

BackgroundVideo.propTypes = {
  src: PropTypes.string,
  poster: PropTypes.string,
  videoTriggerStart: PropTypes.string,
  videoTriggerEnd: PropTypes.string,
  useImageFallbackMobile: PropTypes.bool,
}

export default BackgroundVideo
