import { useRef } from 'react'
import PropTypes from 'prop-types'
import { useIsomorphicLayoutEffect } from 'react-use'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import useReducedMotion from '@hooks/useReducedMotion'

const BackgroundVideo = ({ src, poster }) => {
  if (!src) return null

  const videoRef = useRef(null)
  const s = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

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

  const bgImage = poster?.file?.url && `https:${poster?.file?.url}`

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
          start: 'top center',
          end: 'bottom center',
          onToggle: ({ isActive }) =>
            !noMotion
              ? handleVideoToggle(isActive, video)
              : handleVideoToggle(false, video),
        })
      }
    )

    return () => mm.revert()
  }, [prefersReducedMotion])

  return (
    <video
      ref={videoRef}
      className={`absolute inset-0 block h-full w-full bg-black bg-cover bg-center object-cover ${bgImageClasses.bgDesktop} ${bgImageClasses.bgTablet}`}
      style={{
        '--bg-desktop': `url(${bgImage}?w=1920&h=1080&fm=webp&q=50)`,
        '--bg-tablet': `url(${bgImage}?w=960&h=540&fm=webp&q=50)`,
      }}
      poster={
        'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
      }
      playsInline
      muted
      loop
    >
      {/* TODO: webm default with mp4 fallback */}
      <source src={src} type="video/mp4" />
    </video>
  )
}

BackgroundVideo.propTypes = {
  src: PropTypes.string,
  poster: PropTypes.shape({
    file: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
}

export default BackgroundVideo
