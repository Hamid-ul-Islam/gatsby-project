import { graphql, useStaticQuery, Link } from 'gatsby'
import Container from '@components/layout/container'
import RacingLine from '@components/common/racingLine'
import IconFacebook from '@images/footer/icon-facebook.svg'
import IconTwitter from '@images/footer/icon-twitter.svg'
import IconInstagram from '@images/footer/icon-instagram.svg'
import IconYoutube from '@images/footer/icon-youtube.svg'
import IconTikTok from '@images/footer/icon-tiktok.svg'
import FooterLogo from '@images/footer/footer-logo.svg'
import FooterArrow from '@images/footer/footer-mark.svg'
import FooterArrowM from '@images/footer/footer-mark-m.svg'
import { useLocale } from '@context/localeContext'
import { formattedLinkType, getUrl, renderText } from '@utils'
import A from '@components/common/A'
import { isPlayStation } from '@utils'
import ESRB, { THEMES } from '@components/common/ESRB'

const Footer = () => {
  const isPs = isPlayStation()
  const { getLocalizedSlug, locale } = useLocale()
  const footerContentfulData = useStaticQuery(graphql`
    {
      footer: allContentfulFooter(
        filter: { internalNickname: { ne: "[CMS SCHEMA REQUIRED]" } }
      ) {
        nodes {
          node_locale
          logoLink {
            ...link
          }
          links {
            ...link
          }
          privacyLinks {
            ...link
          }
          secondaryLinks {
            ...link
          }
          legalCopy {
            legalCopy
          }
        }
      }
      socialLinks: allContentfulSite(
        filter: { name: { ne: "[CMS SCHEMA REQUIRED]" } }
      ) {
        nodes {
          facebookProfile
          instagramProfile
          youTubeProfile
          twitterProfile
          tikTokProfile
          node_locale
        }
      }
    }
  `)
  let secondaryLinks = footerContentfulData?.footer?.nodes?.filter(
    (node) => node.node_locale === locale
  )?.[0]?.secondaryLinks

  let logoLink = footerContentfulData?.footer?.nodes?.filter(
    (node) => node.node_locale === locale
  )?.[0]?.logoLink

  let links = footerContentfulData?.footer?.nodes?.filter(
    (node) => node.node_locale === locale
  )?.[0]?.links
  const linksCount = Math.floor(links?.length / 2) || 0

  let socialLinks = footerContentfulData?.socialLinks?.nodes?.filter(
    (node) => node.node_locale === locale
  )[0]

  let legalCopy = footerContentfulData?.footer?.nodes?.filter(
    (node) => node.node_locale === locale
  )?.[0]?.legalCopy?.legalCopy

  if (isPs) {
    return (
      <footer className="z-10 -mt-12 w-full">
        <span className="block h-12 w-full bg-black [clip-path:polygon(0px_48px,_50%_48px,_calc(50%_+_28px)_0px,_100%_0px,_100%_100%,_0px_100%)] lg:[clip-path:polygon(0px_48px,_calc(72%_-_33px)_48px,_calc(72%_+_33px)_0px,_100%_0px,_100%_100%,_0px_100%)]" />
        <Container className="relative w-full bg-black pt-9">
          <div className="mx-auto w-full max-w-[313px] text-white md:max-w-full">
            <FooterArrow className="absolute top-[-22px] hidden md:block" />
            <FooterArrowM className="absolute top-[-15px] left-[30px] block md:hidden" />
            <div className="mb-8 flex w-full flex-col items-center justify-center pt-[103px] font-tacticSansExt uppercase tracking-[.04em] md:mb-12 md:pt-14 xl:px-12 2xl:flex-row">
              <FooterLogo className="order-1 mx-0 mb-8 2xl:order-2 2xl:mx-14 2xl:mb-0" />
            </div>
            <div className="mt-12 mb-10 flex flex-col items-center justify-between gap-8 md:gap-12 xl:grid xl:grid-cols-[minmax(300px,1fr)_minmax(10px,3fr)_minmax(300px,1fr)] xl:items-center xl:justify-items-stretch xl:gap-12">
              <ESRB theme={THEMES.LIGHT} />
              <div className="flex w-full flex-1 items-center justify-center gap-x-8 sm:gap-x-10">
                {Object.keys(socialItems).map((_social, _i) => {
                  const item = socialItems[_social]
                  if (!socialLinks || !socialLinks[_social]) return null

                  return (
                    <a
                      key={_social}
                      tabIndex={0}
                      aria-label={_social}
                      href={`${item.baseLink}${socialLinks[_social]}`}
                      target="_blank"
                      rel="norefferer"
                    >
                      {item.icon}
                    </a>
                  )
                })}
              </div>
              <div className="items-around flex w-fit flex-wrap justify-center gap-[10px] whitespace-nowrap text-[12px] font-medium text-light-gray xl:justify-end">
                {secondaryLinks &&
                  secondaryLinks.map((_link, _i) => {
                    const type = formattedLinkType(
                      _link?.target?.[0]?.__typename
                    )
                    return (
                      <A
                        key={_link?.id}
                        to={type !== 'url' && getUrl(type, _link?.target?.[0])}
                        href={
                          type === 'url' && getUrl(type, _link?.target?.[0])
                        }
                        className="flex-1 text-center underline"
                      >
                        {_link?.displayText}
                      </A>
                    )
                  })}
                <A
                  key="ps"
                  to="/playstation"
                  className="flex-1 text-center underline"
                >
                  PS
                </A>
              </div>
            </div>
            <RacingLine position="topRight" />
            <div className="mt-4 mb-8 text-center text-[12px] text-light-gray lg:mb-12 lg:text-left">
              <span>
                © 2010 — {new Date().getFullYear()}. {renderText(legalCopy)}
              </span>
            </div>
          </div>
        </Container>
        <div className="bg-mosaic h-8 w-screen" />
      </footer>
    )
  }
  return (
    <footer className="z-10 -mt-12 w-full">
      <span className="block h-12 w-full bg-black [clip-path:polygon(0px_48px,_50%_48px,_calc(50%_+_28px)_0px,_100%_0px,_100%_100%,_0px_100%)] lg:[clip-path:polygon(0px_48px,_calc(72%_-_33px)_48px,_calc(72%_+_33px)_0px,_100%_0px,_100%_100%,_0px_100%)]" />
      <Container className="relative w-full bg-black pt-9">
        <div className="mx-auto w-full max-w-[313px] text-white md:max-w-full">
          <FooterArrow className="absolute top-[-22px] hidden md:block" />
          <FooterArrowM className="absolute top-[-15px] left-[30px] block md:hidden" />
          <div className="mb-8 flex w-full flex-col items-center justify-center pt-[103px] font-tacticSansExt uppercase tracking-[.04em] md:mb-12 md:pt-14 xl:px-12 2xl:flex-row">
            <div className="order-2 mb-2 flex w-full flex-col items-center justify-between gap-2 2xl:order-1 2xl:mb-0 2xl:flex-row">
              {links
                ?.filter((_link, _i) => _i < linksCount)
                ?.map((_link, _i) => {
                  const type = formattedLinkType(_link?.target?.[0]?.__typename)

                  return (
                    <A
                      key={_link?.id}
                      to={type !== 'url' && getUrl(type, _link?.target?.[0])}
                      href={type === 'url' && getUrl(type, _link?.target?.[0])}
                      className="text-center xl:max-w-[175px]"
                    >
                      {_link?.displayText}
                    </A>
                  )
                })}
            </div>
            <FooterLogo className="order-1 mx-0 mb-8 2xl:order-2 2xl:mx-14 2xl:mb-0" />
            <div className="order-3 flex w-full flex-col items-center justify-between gap-2 2xl:flex-row">
              {links
                ?.filter((_link, _i) => _i >= linksCount)
                ?.map((_link, _i) => {
                  const type = formattedLinkType(_link?.target?.[0]?.__typename)

                  return (
                    <A
                      key={_link?.id}
                      to={type !== 'url' && getUrl(type, _link?.target?.[0])}
                      href={type === 'url' && getUrl(type, _link?.target?.[0])}
                      className="text-center xl:max-w-[175px]"
                    >
                      {_link?.displayText}
                    </A>
                  )
                })}
            </div>
          </div>
          <div className="mt-12 mb-10 flex flex-col items-center justify-between gap-8 md:gap-12 xl:grid xl:grid-cols-[minmax(300px,1fr)_minmax(10px,3fr)_minmax(300px,1fr)] xl:items-center xl:justify-items-stretch xl:gap-12">
            <ESRB theme={THEMES.LIGHT} />
            <div className="flex w-full flex-1 items-center justify-center gap-x-8 sm:gap-x-10">
              {Object.keys(socialItems).map((_social, _i) => {
                const item = socialItems[_social]
                if (!socialLinks || !socialLinks[_social]) return null

                return (
                  <a
                    key={_social}
                    tabIndex={0}
                    aria-label={_social}
                    href={`${item.baseLink}${socialLinks[_social]}`}
                    target="_blank"
                    rel="norefferer"
                  >
                    {item.icon}
                  </a>
                )
              })}
            </div>
            <div className="items-around flex w-fit flex-wrap justify-center gap-[10px] whitespace-nowrap text-[12px] font-medium text-light-gray xl:justify-end">
              {secondaryLinks &&
                secondaryLinks.map((_link, _i) => {
                  const type = formattedLinkType(_link?.target?.[0]?.__typename)
                  return (
                    <A
                      key={_link?.id}
                      to={type !== 'url' && getUrl(type, _link?.target?.[0])}
                      href={type === 'url' && getUrl(type, _link?.target?.[0])}
                      className="flex-1 text-center underline"
                    >
                      {_link?.displayText}
                    </A>
                  )
                })}
            </div>
          </div>
          <RacingLine position="topRight" />
          <div className="mt-4 mb-8 text-center text-[12px] text-light-gray lg:mb-12 lg:text-left">
            <span>
              © 2010 — {new Date().getFullYear()}. {renderText(legalCopy)}
            </span>
          </div>
        </div>
      </Container>
      <div className="bg-mosaic h-8 w-screen" />
    </footer>
  )
}

export default Footer

const socialItems = {
  facebookProfile: {
    icon: <IconFacebook />,
    baseLink: 'https://www.facebook.com/',
  },
  instagramProfile: {
    icon: <IconInstagram />,
    baseLink: 'https://www.instagram.com/',
  },
  twitterProfile: {
    icon: <IconTwitter />,
    baseLink: 'https://www.twitter.com/',
  },
  youTubeProfile: {
    icon: <IconYoutube />,
    baseLink: 'https://www.youtube.com/@',
  },
  tikTokProfile: {
    icon: <IconTikTok />,
    baseLink: 'https://www.tiktok.com/@',
  },
}
