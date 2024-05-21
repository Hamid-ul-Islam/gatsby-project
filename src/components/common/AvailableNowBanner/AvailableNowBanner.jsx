import React from 'react'
import * as styles from '@components/common/backgroundTexture/backgroundTexture.module.css'
import Image from '../image'
import OrangeRightButton from '@images/orange-right.svg'
import { Link } from 'gatsby'

const AvailableNowBanner = ({
  bannerLink,
  displayBanner,
  bannerLogo,
  bannerText,
  bannerLinkTrackingId,
}) => {
  if (!displayBanner) return null

  const handleClick = (e, bannerLink) => {
    if (e) e.preventDefault()
    if (typeof window !== 'undefined') {
      window.open(bannerLink, '_newtab')
    }
  }

  return (
    <a
      className="w-full"
      href="#"
      onClick={(e) => handleClick(e, bannerLink)}
      id={bannerLinkTrackingId}
    >
      <div
        className={`bg-gradient-t ${styles.texture__container} ${styles.texture__container} mt-[72px] flex min-h-[194px] w-full items-center justify-center rounded-[24px] bg-white from-[rgba(231,231,231,0.5)89.96%] to-[rgba(244,244,244,0)15.5%] py-[24px] px-[32px] shadow-[4px_8px_24px_rgba(0,0,0,0.16)] md:h-[160px] md:min-h-[160px] md:py-[32.5px] md:px-[48px] lg:h-[129px] lg:min-h-[129px]`}
      >
        <div className="flex w-full flex-col justify-between md:flex-row">
          <p className=" mb-[32px] mt-0 text-center font-tacticSansExt text-[24px] font-extrabold uppercase italic leading-[32px] tracking-[.01em] md:mt-[5px] md:mr-[16px] md:mb-0 md:w-full md:max-w-[351px] md:text-left md:text-[28px]">
            {bannerText}
          </p>
          <div className="flex w-full max-w-[885px] items-center justify-center rounded-[16px] border border-[#F99300] hover:border-[#FB5600]">
            <div className="flex h-[81px] items-center justify-center">
              <div className="h-fit">
                <Image
                  className={
                    bannerLink
                      ? 'mr-[3px] max-w-[154px] md:mr-[16px]'
                      : 'max-w-[154px]'
                  }
                  src={bannerLogo}
                />
              </div>
              {bannerLink && <OrangeRightButton />}
            </div>
          </div>
        </div>
      </div>
    </a>
  )
}

export default AvailableNowBanner
