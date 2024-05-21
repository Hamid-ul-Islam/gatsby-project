import React from 'react'
import Strips from '@images/stripes.svg'
import BackgroundTexture from '@components/common/backgroundTexture'
import Link from '@components/common/link'

const FeaturedCallOutCard = ({ excerpt, title, link, className }) => {
  const clipPathMobile = `[clip-path:polygon(0_0,_100%_0,_100%_calc(100%_-_64px),_calc(100%_-_32px)_calc(100%_-_32px),_calc(100%_-_105px)_calc(100%_-_32px),_calc(100%_-_140px)_100%,_0_100%)]`
  const clipPathDesktop = `@lg:[clip-path:polygon(0_0,_100%_0,_100%_calc(100%_-_64px),_calc(100%_-_45px)_calc(100%_-_32px),_435px_calc(100%_-_32px),_390px_100%,_0_100%)]`
  const renderText = (text) => {
    return text
      .split('\n')
      .reduce(
        (children, textSegment, index) => [
          ...children,
          index > 0 && <br key={index} />,
          textSegment,
        ],
        []
      )
  }
  return (
    <div
      className={`mt-auto mb-8 w-full drop-shadow-xl @container md:mt-0 md:mb-0 ${className}`}
    >
      <div
        className={`${clipPathMobile} ${clipPathDesktop} w-fit min-w-full rounded-t-3xl sm:min-w-[546px]`}
      >
        <BackgroundTexture
          className="rounded-t-3xl"
          gradient="linear-gradient(to top, #E7E7E7 10%, rgba(244, 244, 244, 0) 90%)"
        >
          <div className="relative p-6 pb-16 pr-8 text-black">
            <h2 className="font-tacticSansExt text-2xl font-extrabold leading-8 @[30rem]:text-4xl @[30rem]:leading-[48px] @[34rem]:text-5xl @[34rem]:leading-[56px]">
              {title}
            </h2>
            <p className="mt-6 w-9/12 pl-6 text-[15px] font-medium uppercase leading-[18px]">
              {renderText(excerpt?.excerpt || excerpt)}
            </p>
            {link && <Link {...link} />}
          </div>
          <Strips className="absolute bottom-0 left-0 h-auto w-[127px] @lg:bottom-0 @lg:left-[24px] @lg:w-auto sm:w-[174px]" />
        </BackgroundTexture>
      </div>
    </div>
  )
}

export default FeaturedCallOutCard
