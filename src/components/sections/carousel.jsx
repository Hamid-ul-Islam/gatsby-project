import React from 'react'
import Container from '@components/layout/container'
import VideoCarousel from '@components/common/videoCarousel'

const Carousel = ({ videoUrls }) => {
  return (
    <div className="mx-12 w-full max-w-6xl lg:mx-16">
      <VideoCarousel videoUrls={videoUrls} />
    </div>
  )
}

export default Carousel
