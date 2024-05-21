import React, { useRef } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'
import gsap from 'gsap'
import useReducedMotion from '@hooks/useReducedMotion'
import Container from '@components/layout/container'
import FeaturedCallOutCard from '@components/common/cards/featureCallOutCard'
import BackgroundMedia from '@components/common/backgroundMedia'

const FeaturedProducts = ({
  calloutPlacementLeft,
  excerpt,
  title,
  backgroundMedia,
  link,
}) => {
  const featureRef = useRef(null)
  const overlayTween = useRef(null)
  const cardTimeline = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useIsomorphicLayoutEffect(() => {
    const mm = gsap.matchMedia()

    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        reducedMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { reducedMotion } = context.conditions
        const noMotion = prefersReducedMotion || reducedMotion

        gsap.set('.feature__card', {
          autoAlpha: 0,
          scale: noMotion ? 1 : 0.75,
          x: noMotion ? 0 : calloutPlacementLeft ? '-15vw' : '15vw',
        })

        overlayTween.current = gsap.to('.feature__overlay', {
          autoAlpha: 0,
          duration: 0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: '.feature__overlay',
            start: 'top center',
            end: 'bottom center',
            toggleActions: 'play reverse play reverse',
          },
        })

        cardTimeline.current = gsap
          .timeline({
            scrollTrigger: {
              trigger: '.feature__card',
              start: 'top 80%',
              end: 'bottom 20%',
              once: true,
            },
          })
          .to('.feature__card', {
            autoAlpha: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power1.in',
          })
          .to(
            '.feature__card',
            {
              x: 0,
              duration: 0.5,
              ease: 'back.out(1.4)',
            },
            '-=0.5'
          )
      },
      featureRef
    )

    return () => mm.revert()
  }, [prefersReducedMotion])

  const featureCallOutCardProps = {
    calloutPlacementLeft,
    excerpt,
    title,
    link,
  }

  return (
    <div ref={featureRef} className="h-screen w-screen">
      <div className={`h-full w-full`}>
        <BackgroundMedia
          backgroundMedia={backgroundMedia}
          useImageFallbackMobile
        />
        <div className="feature__overlay absolute top-0 left-0 h-full w-full bg-black opacity-50" />
        <Container
          className={`${
            calloutPlacementLeft ? 'justify-start' : 'justify-end'
          } h-full w-full items-start sm:items-center`}
        >
          <FeaturedCallOutCard
            {...featureCallOutCardProps}
            className="feature__card w-fit min-w-full pt-32 opacity-0 sm:min-w-[546px] sm:pt-0"
          />
        </Container>
      </div>
    </div>
  )
}

export default FeaturedProducts
