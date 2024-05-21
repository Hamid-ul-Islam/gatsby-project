import React from 'react'
import PropTypes from 'prop-types'
import Container from '@components/layout/container'
import RacingLine from '@components/common/racingLine'

const NewsHeader = ({ title, category, author, publishedDate }) => {
  return (
    <div className="w-100">
      <Container>
        <div className="pt-[96px] pb-[75px]">
          <div className="mb-[71px] break-all font-tacticSansExt text-5xl uppercase leading-[56px] text-[#1A1A1A] md:mb-[63px] md:text-[64px] md:leading-[72px]">
            {title}
          </div>
          <div className="mb-[33px] h-[6px] w-[107px] bg-yellow"></div>
          <div className="mb-[27px] flex gap-6 text-[20px] uppercase leading-[28px] text-black">
            <span>{publishedDate}</span>
            <span>{category}</span>
            <span>{author}</span>
          </div>
          <div className="w-full max-w-[530px]">
            <RacingLine />
          </div>
        </div>
      </Container>
    </div>
  )
}

NewsHeader.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.object,
  author: PropTypes.string,
  publishedDate: PropTypes.string,
}

export default NewsHeader
