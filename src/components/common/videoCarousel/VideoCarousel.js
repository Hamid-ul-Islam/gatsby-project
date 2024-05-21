import React, { useEffect, useRef, useState } from 'react'
import useIntersectionObserver from '@react-hook/intersection-observer'
import { sanitizeAndAddYoutubeThumbnailUrls } from '@utils'
import { StyledSlider } from './style'
import RacingLine from '../racingLine'
import * as styles from './videoCarousel.module.css'
import { useQueries, useQuery } from '@tanstack/react-query'
import CarouselButton from './subcomponents/CarouselButton'
import { useMedia } from 'react-use'

const VideoCarousel = ({ videoUrls }) => {
  let swiping = false
  const carouselRef = useRef()
  const carouselFocusRef = useRef()
  const iframeRef = useRef()
  const containerRef = useRef()
  const lockRef = useRef(false)
  const { isIntersecting } = useIntersectionObserver(containerRef)
  const [activeVideo, setActiveVideo] = useState(0)
  const [activeSlide, setActiveSlide] = useState(0)
  const [iframeLoadedThroughClick, setIframeLoadedthroughClick] =
    useState(false)

  if (isIntersecting) {
    lockRef.current = true
  }
  const sm = useMedia('(max-width: 640px)', true)

  const youtubeUrlsWithThumbnail = sanitizeAndAddYoutubeThumbnailUrls(videoUrls)
  const currentVideoSrc = youtubeUrlsWithThumbnail[activeVideo]?.url

  const carouselConfig = {
    dots: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    infinite: false,
    draggable: true,
    afterChange: (index) => {
      setActiveSlide(index)
    },
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          vertical: true,
          verticalSwiping: false,
          draggable: false,
        },
      },
    ],
  }

  /* ==== Handle next and prev visibility and functionality ==== */

  const numVideos = youtubeUrlsWithThumbnail?.length || 0
  const showNextArrow =
    activeSlide < numVideos - (carouselConfig?.slidesToShow || 0)
  const showPrevArrow = activeSlide > 0

  const handleNext = () => {
    if (carouselRef?.current) carouselRef.current.slickNext()
  }

  const handlePrev = () => {
    if (carouselRef?.current) carouselRef.current.slickPrev()
  }

  const handleKeyDownNext = (e) => {
    if (e.key === 'Enter') {
      if (carouselRef?.current) carouselRef.current.slickNext()
    }
  }

  const handleKeyDownPrev = (e) => {
    if (e.key === 'Enter') {
      if (carouselRef?.current) carouselRef.current.slickPrev()
    }
  }

  /* ==== Handle iframe focus ==== */

  const handleThumbnailClickAndFocus = (i) => {
    setActiveVideo(i)
    setIframeLoadedthroughClick(true)
  }

  const handleIframeLoad = () => {
    if (iframeLoadedThroughClick) {
      iframeRef.current.focus()
    }
  }

  /* ==== The following 3 handlers are required so that images don't trigger on click while carousel is sliding. ==== */

  const handleClickCapture = (event, i) => {
    if (swiping) {
      event.preventDefault()
      event.stopPropagation()
      event.nativeEvent.preventDefault()
      event.nativeEvent.stopPropagation()
    }
  }

  const handleMouseDownCapture = (event) => {
    swiping = true
    event.preventDefault()
  }

  const handleMouseUpCapture = () => {
    if (carouselRef?.current?.innerSlider?.state)
      swiping = carouselRef.current.innerSlider.state.swiping
  }

  /* ==== Remove tabindex from hidden slides ==== */
  useEffect(() => {
    // disabled tabindex on ALL slides
    const allElementsToDisableTabbing =
      carouselFocusRef?.current?.querySelectorAll(
        'a, .slick-slide button, iframe, .slick-current a, .slick-current button, .slick-current iframe'
      )

    if (allElementsToDisableTabbing?.length) {
      for (let i = 0; i < allElementsToDisableTabbing?.length; i++) {
        allElementsToDisableTabbing[i].setAttribute('tabindex', -1)
      }
    }

    // then enable on current slide
    const currentSlide = carouselFocusRef?.current?.querySelectorAll(
      '.slick-active a, .slick-active button, .slick-active iframe'
    )

    if (currentSlide?.length) {
      for (let i = 0; i < currentSlide?.length; i++) {
        currentSlide[i].setAttribute('tabindex', 0)
      }
    }
  }, [activeSlide])

  const videoQueries = useQueries({
    queries: youtubeUrlsWithThumbnail.map(({ id }) => ({
      queryKey: [id],
      queryFn: async () => {
        const url = `https://www.youtube.com/oembed?url=http%3A//youtube.com/watch%3Fv%3D${id}&format=json`
        const data = await fetch(url).then((res) => res.json())
        return { id, ...data }
      },
    })),
  })

  const getVideoTitle = (id) => {
    const video = videoQueries?.find((v) => v.data?.id === id)
    return video?.data?.title
  }

  if (!videoUrls?.length) return null

  // TODO: styling: iframe left/right dividers, carousel arrows,

  const getActiveSlideStyle = (slideIndex) =>
    slideIndex === activeVideo
      ? 'border-[3px] border-[#FB5600] shadow-[0px_0px_22px] shadow-[#FB5600]'
      : 'border-[1px] border-[transparent]'
  const getHoveredSlideStyle = (slideIndex) =>
    slideIndex !== activeVideo ? 'hover:border-[#F99300]' : ''

  return (
    <div className="mx-auto mt-16 max-w-[924px]">
      <div className="my-[76px] w-full md:mt-[48px] md:mb-[64px] lg:mt-[48px] lg:mb-[64px] xl:mt-[16px] xl:mb-[24px]">
        <RacingLine position="topRight" className="xl:hidden" />
        <div className=" absolute hidden h-[2px] w-full max-w-[450px] -translate-x-[36px] xl:block">
          <RacingLine
            position="topRight"
            vertical
            className="h-full w-full -translate-x-1/2 translate-y-[225px] -rotate-90"
          />
        </div>
        <div ref={containerRef}>
          {lockRef.current && (
            <iframe
              className="mx-auto my-[24px] aspect-video w-full"
              src={currentVideoSrc}
              title="Youtube video player"
              frameborder="0"
              allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen="allowfullscreen"
              ref={iframeRef}
              onLoad={handleIframeLoad}
            />
          )}
        </div>

        <RacingLine position="bottomLeft" className="xl:hidden" />
        <div className="absolute hidden h-[2px] w-full max-w-[450px] translate-x-[calc(100%+24px+36px)] xl:block">
          <RacingLine
            position="topRight"
            vertical
            className="h-full w-full translate-x-1/2 -translate-y-[250px] rotate-90"
          />
        </div>
      </div>

      <div style={{ filter: 'drop-shadow(4px 8px 10px rgba(0, 0, 0, 0.32))' }}>
        <div
          className={`relative mx-auto overflow-hidden rounded-t-2xl px-[24px] pt-[24px] md:px-[48px] md:pt-[48px]`}
          ref={carouselFocusRef}
        >
          <span
            className={`absolute top-0 left-0  h-full w-full rounded-t-2xl`}
            style={{
              backgroundImage:
                'linear-gradient(180deg, #00AEEA -33.27%, #061220 69.88%)',
            }}
          />
          <span
            className={`absolute top-0 left-0  h-full w-full ${styles.texture__container} rounded-t-2xl`}
          />

          <StyledSlider ref={carouselRef} {...carouselConfig}>
            {youtubeUrlsWithThumbnail?.map(({ id, thumbnail }, i) => (
              <div
                key={id}
                onClickCapture={(e) => handleClickCapture(e, i)}
                onMouseDownCapture={(e) => handleMouseDownCapture(e)}
                onMouseUpCapture={() => handleMouseUpCapture()}
              >
                <button
                  onClick={() => handleThumbnailClickAndFocus(i)}
                  aria-label={`Select Video ${i + 1}`}
                >
                  <img
                    className={`aspect-video  ${getActiveSlideStyle(
                      i
                    )} ${getHoveredSlideStyle(i)} transition`}
                    src={thumbnail}
                    alt={`Youtube thumbnail of video with id: ${id} `}
                  />
                  <div className="relative mt-1 h-[24px] w-full">
                    <p className="absolute inset-0 h-[24px] w-full truncate text-left text-white">
                      {getVideoTitle(id)}
                    </p>
                  </div>
                </button>
              </div>
            ))}
          </StyledSlider>

          <CarouselButton
            visible={showPrevArrow}
            className="hidden sm:block"
            onKeyDown={handleKeyDownPrev}
            onClick={handlePrev}
            aria-label={'Carousel Back'}
            direction="left"
          />
          <CarouselButton
            visible={showNextArrow}
            className="hidden sm:block"
            onKeyDown={handleKeyDownNext}
            onClick={handleNext}
            aria-label={'Carousel Next'}
            direction="right"
          />
        </div>

        <div
          className={`h-[64px] w-full ${styles.bottom_image} mb-[16px] md:mb-[64px] lg:mb-[64px] xl:mb-[24px]`}
        />
      </div>
    </div>
  )
}

export default VideoCarousel
