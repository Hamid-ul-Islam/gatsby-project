import React from 'react'
import PropTypes from 'prop-types'
import Container from '@components/layout/container'
import Image from '@components/common/image'

const WhatsIncludedCallout = ({ title, includedItems }) => {
  if (!includedItems) return null

  return (
    <Container className="flex-col justify-center gap-12 pb-16 md:gap-14">
      <h2 className="text-center font-tacticSansExt text-[32px] leading-10 md:text-5xl">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-16 text-center md:grid-cols-3 md:gap-8 lg:gap-16">
        {includedItems?.map((item) => (
          <figure key={item?.id} className="flex flex-col items-center gap-6">
            <Image
              src={item}
              alt={item?.title}
              className="rounded-lg shadow-[4px_8px_10px_rgba(0,0,0,0.08),_4px_8px_24px_rgba(0,0,0,0.24)] md:rounded-2xl"
            />
            <figcaption className="font-itcGothic text-base uppercase tracking-wide text-[#1A1A1A]">
              {item?.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </Container>
  )
}

WhatsIncludedCallout.propTypes = {
  title: PropTypes.string,
  includedItems: PropTypes.arrayOf(PropTypes.object),
}

export default WhatsIncludedCallout
