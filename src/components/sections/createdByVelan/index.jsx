import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { getImage, GatsbyImage } from 'gatsby-plugin-image'
import Container from '@components/layout/container'
import RacingLine from '@components/common/racingLine'
import Image from '@components/common/image'

const CreatedByVelan = ({ excerpt, title, logo }) => {
  const data = useStaticQuery(graphql`
    query {
      velanStudiosBG: file(relativePath: { eq: "velan/bg-velan-studios.png" }) {
        childImageSharp {
          gatsbyImageData(width: 1920, quality: 70, formats: [WEBP, JPG])
        }
      }
    }
  `)

  return (
    <>
      <GatsbyImage
        image={getImage(data?.velanStudiosBG)}
        alt=""
        objectPosition="left"
        objectFit="cover"
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
      />
      <div className="relative mb-10 flex min-h-[696px] items-center pt-[103px] md:pt-[35px]">
        <Container className="block">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2">
            <div className="col-1 flex flex-col justify-center text-white">
              <RacingLine position="topLeft" />
              <div className="text-last-end mt-12 max-w-[340px] font-tacticSansExt text-4xl uppercase tracking-[1px]">
                {title}
              </div>
              <div className="mx-auto mt-8 mb-[58px] h-[2px] w-[215px] bg-orange lg:mt-[30px] lg:mb-[48px] lg:ml-0" />
              <div className="flex flex-col gap-12 lg:flex-row">
                <div className="flex-1 font-itcGothic text-lg font-medium">
                  {excerpt?.excerpt || excerpt}
                </div>
              </div>
            </div>
            <div className="col-1 flex items-center justify-center lg:pl-16 xl:pl-24">
              <a
                href={`https://www.velanstudios.com/`}
                target="_blank"
                rel="norefferer"
              >
                <Image src={logo} alt="Velan Studios" />
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default CreatedByVelan
