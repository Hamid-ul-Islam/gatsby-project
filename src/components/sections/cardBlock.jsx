import React from 'react'
import PropTypes from 'prop-types'
import BlueBgWrapper from '@components/common/blueBgWrapper'
import { Link } from 'gatsby'
import Image from '@components/common/image'

const CardBlock = ({ cards, ...rest }) => {
  if (!cards || !cards.length) return null

  return (
    <div className="mx-12 mt-[32px] w-full max-w-6xl md:mt-[52px] lg:mx-16">
      <BlueBgWrapper>
        <div className="flex flex-col justify-center gap-8 gap-y-[60px] pt-3 pb-8 md:flex-row">
          {cards
            ?.filter((card, i) => i < 2)
            ?.map(({ image, title, slug, category, excerpt }, j) => (
              <Link
                key={`${slug}-${j}`}
                to={`/${category?.toLowerCase()}/${slug}`}
                className="group z-10 flex w-auto flex-col md:w-1/2"
              >
                <Image
                  className={`relative mb-4 rounded-lg hover:shadow-[0px_0px_22px_#FB5600] hover:outline hover:outline-[3px] hover:outline-[#FB5600] md:mb-9`}
                  src={image?.file?.url}
                  alt={image?.title}
                />
                <div className="w-full">
                  <div className="flex w-full flex-col text-left text-white">
                    <div className="mb-1 font-tacticSansExt text-[26px] uppercase leading-[31px] hover:underline">
                      {title}
                    </div>
                    <div className="font-itcGothic text-sm leading-[22px]">
                      {excerpt?.excerpt || excerpt}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </BlueBgWrapper>
    </div>
  )
}

CardBlock.propTypes = {}

export default CardBlock
