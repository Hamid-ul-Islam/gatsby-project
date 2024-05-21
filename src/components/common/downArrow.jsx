import { useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql, useStaticQuery } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { useIsomorphicLayoutEffect } from 'react-use'
import gsap from 'gsap'
import useReducedMotion from '@hooks/useReducedMotion'

const DownArrow = ({ parallax = false, className = '' }) => {
  const data = useStaticQuery(graphql`
    query {
      downArrow: file(relativePath: { eq: "down-arrow/down-arrow.png" }) {
        childImageSharp {
          gatsbyImageData(width: 154, placeholder: NONE, quality: 60)
        }
      }
    }
  `)

  const arrowRef = useRef(null)
  const containerRef = useRef(null)
  const arrowTimeline = useRef(null)
  const { prefersReducedMotion } = useReducedMotion()

  useIsomorphicLayoutEffect(() => {
    if (!parallax) return

    const container = containerRef.current
    const arrow = arrowRef.current

    const mm = gsap.matchMedia()

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
        reducedMotion: '(prefers-reduced-motion: reduce)',
      },
      (context) => {
        const { isDesktop, reducedMotion } = context.conditions
        const noMotion = prefersReducedMotion || reducedMotion

        arrowTimeline.current = gsap
          .timeline({
            scrollTrigger: {
              trigger: container,
              scrub: 0.5,
            },
          })
          .fromTo(
            arrow,
            {
              y: noMotion ? 0 : isDesktop ? `${10}vh` : `${6}vh`,
              duration: 0.35,
            },
            {
              y: noMotion ? 0 : isDesktop ? `-${10}vh` : `-${6}vh`,
              duration: 0.35,
            }
          )

        gsap.to(container, {
          autoAlpha: 1,
          duration: 0.35,
          delay: 1,
        })
      }
    )

    return () => mm.revert()
  }, [prefersReducedMotion])

  return (
    <div
      ref={containerRef}
      className={`w-20 opacity-0 md:w-28 lg:w-32 xl:w-auto ${className}`}
    >
      <div ref={arrowRef}>
        <GatsbyImage image={getImage(data?.downArrow)} alt="" />
      </div>
    </div>
  )
}

DownArrow.propTypes = {
  parallax: PropTypes.bool,
  className: PropTypes.string,
}

export default DownArrow
