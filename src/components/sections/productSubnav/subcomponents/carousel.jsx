import { useState } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import { SliderContainer } from '../style'
import Image from '@components/common/image'
import { ChevronLeft, ChevronRight } from 'react-feather'

const NextArrow = ({ onClick }) => (
  <button className="w-8 pl-4" onClick={onClick}>
    <ChevronRight size={14} />
  </button>
)

const PrevArrow = ({ onClick }) => (
  <button className="w-8 pr-4" onClick={onClick}>
    <ChevronLeft size={14} />
  </button>
)

const Carousel = ({ carousel }) => {
  const [sliderHero, setSliderHero] = useState()
  const [sliderNav, setSliderNav] = useState()

  const getSlidesToShow = (slidesToShow) => {
    const carouselLength = carousel?.length
    return carouselLength <= slidesToShow ? carouselLength : slidesToShow
  }

  const getCarouselWidth = (slidesToShow) => {
    const carouselLength = carousel?.length
    return carouselLength <= slidesToShow
      ? `calc(${carouselLength} / ${slidesToShow} * 100%)`
      : '100%'
  }

  const getCarouselDisplay = (slidesToShow) => {
    const carouselLength = carousel?.length
    return carouselLength <= slidesToShow ? 'block' : 'flex'
  }

  const settings = {
    slidesToShow: getSlidesToShow(7),
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: getSlidesToShow(4),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: getSlidesToShow(5),
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: getSlidesToShow(7),
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: getSlidesToShow(5),
        },
      },
    ],
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  }

  return (
    <SliderContainer
      style={{
        '--slider-width': getCarouselWidth(4),
        '--slider-width-sm': getCarouselWidth(5),
        '--slider-width-md': getCarouselWidth(7),
        '--slider-width-lg': getCarouselWidth(5),
        '--slider-width-xl': getCarouselWidth(7),
        '--slider-display': getCarouselDisplay(4),
        '--slider-display-sm': getCarouselDisplay(5),
        '--slider-display-md': getCarouselDisplay(7),
        '--slider-display-lg': getCarouselDisplay(5),
        '--slider-display-xl': getCarouselDisplay(7),
      }}
    >
      <Slider
        asNavFor={sliderNav}
        ref={(slider) => setSliderHero(slider)}
        arrows={false}
        fade
        className="-ml-6 w-[calc(100%+48px)]"
      >
        {carousel?.map((image) => (
          <div key={image?.id} className="px-6 pb-8">
            <Image
              src={image}
              className="aspect-[3/2] rounded-[20px] object-cover shadow-[4px_8px_10px_rgba(0,0,0,0.08),_4px_8px_24px_rgba(0,0,0,0.24)] lg:aspect-[4/3]"
            />
          </div>
        ))}
      </Slider>
      <div className="w-[var(--slider-width)] sm:w-[var(--slider-width-sm)] md:w-[var(--slider-width-md)] lg:w-[var(--slider-width-lg)] xl:w-[var(--slider-width-xl)]">
        <Slider
          asNavFor={sliderHero}
          ref={(slider) => setSliderNav(slider)}
          swipeToSlide
          focusOnSelect
          {...settings}
          className="-mt-10 !items-stretch ![display:var(--slider-display)] sm:![display:var(--slider-display-sm)] md:![display:var(--slider-display-md)] lg:![display:var(--slider-display-lg)] xl:![display:var(--slider-display-xl)]"
        >
          {carousel?.map((image) => (
            <div key={image?.id} className="cursor-pointer px-3 py-6">
              <span className="block">
                <Image
                  src={image}
                  className="aspect-square rounded-lg object-cover"
                />
              </span>
            </div>
          ))}
        </Slider>
      </div>
    </SliderContainer>
  )
}

Carousel.propTypes = {
  carousel: PropTypes.array,
}

export default Carousel
