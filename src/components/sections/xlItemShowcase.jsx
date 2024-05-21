import React from 'react'
import PropTypes from 'prop-types'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import Container from '@components/layout/container'
import BackgroundTexture from '@components/common/backgroundTexture'
import RacingLine from '@components/common/racingLine'

const XLItemShowcase = ({ title, subtitle }) => {
  const data = useStaticQuery(graphql`
    query {
      background: file(
        relativePath: { eq: "chameleon/chameleon-background.png" }
      ) {
        childImageSharp {
          gatsbyImageData(
            width: 1920
            placeholder: NONE
            quality: 60
            formats: [WEBP, JPG]
          )
        }
      }
      chameleon: file(relativePath: { eq: "chameleon/chameleon.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 1920
            placeholder: NONE
            quality: 60
            formats: [WEBP, PNG]
          )
        }
      }
    }
  `)

  return (
    <div>
      <BackgroundTexture gradient={['linear-gradient(#E7E7E7, #E7E7E7)']}>
        <div
          style={{
            clipPath:
              'polygon(0 0, calc(50% - 28px) 0, calc(50% + 28px) 40px, 100% 40px, 100% 100%, 0 100%)',
          }}
          className="relative h-full w-full pb-8 pt-36"
        >
          <GatsbyImage
            image={getImage(data?.background)}
            alt=""
            objectPosition="left top"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              zIndex: -10,
            }}
          />
          <Container className="flex-col gap-8 md:flex-row md:gap-0">
            <div className="text-white">
              <h2 className="mb-8 max-w-xl bg-gradient-to-b from-white to-[#E2E2E2] bg-clip-text font-tacticSansExt text-[32px] font-extrabold leading-10 tracking-wide text-transparent drop-shadow-[0px_0px_24px_#0CE2FF] lg:max-w-full lg:tracking-wider xl:text-[56px] xl:leading-[64px]">
                {title}
              </h2>
              <RacingLine position="bottomLeft" className="mb-8 xl:w-11/12" />
              <p className="font-itcGothic text-lg leading-8 tracking-wide lg:text-lg lg:leading-8 xl:w-4/5">
                {subtitle}
              </p>
            </div>
            <GatsbyImage
              image={getImage(data?.chameleon)}
              alt="3/4 View of Chameleon RC Car"
            />
          </Container>
        </div>
      </BackgroundTexture>
    </div>
  )
}

export default XLItemShowcase

XLItemShowcase.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}
