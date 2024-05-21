import React, { useEffect, useRef, useState } from 'react'
import CardBlockBottom from '@images/card-block-bottom.svg'
import * as styles from './videoCarousel/videoCarousel.module.css'

const BlueBgWrapper = ({ children, ref }) => {
  return (
    <div className="mx-auto max-w-[924px]">
      <div style={{ filter: 'drop-shadow(4px 8px 10px rgba(0, 0, 0, 0.32))' }}>
        <div
          className={`relative mx-auto overflow-hidden rounded-t-2xl px-[24px] pt-[24px] md:px-[48px] md:pt-[48px]`}
          // ref={ref}
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
          <div>
            <div className="align-start xs:pb-[-16px] mx-0 my-[-8px] flex h-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[64px] w-full drop-shadow-[4px_10px_6px_rgba(0,_0,_0,_0.32)]">
        <div
          className="
          h-full w-full 
          [clip-path:polygon(100%_0px,_100%_16px,_calc(100%_-_135px)_16px,_calc(100%_-_200px)_100%,_0px_100%,_0px_0px)]
          md:[clip-path:polygon(100%_0px,_calc(100%_-_43px)_32px,_calc(100%_-_200px)_32px,_calc(100%_-_240px)_100%,_0_100%,_0px_0px)]
          "
        >
          <div className="relative h-full w-full bg-[rgb(6,_18,_32)]">
            <CardBlockBottom className="absolute bottom-0 left-0 h-auto w-[174px] md:left-[25px] md:w-[288px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlueBgWrapper
