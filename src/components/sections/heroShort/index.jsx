import Container from '@components/layout/container'
import BackgroundTexture from '@components/common/backgroundTexture'
import BackgroundMedia from '@components/common/backgroundMedia'

const HeroShort = ({ title, backgroundMedia }) => {
  return (
    <section className="relative">
      <BackgroundMedia
        backgroundMedia={backgroundMedia}
        videoTriggerStart="top bottom"
      />
      <div className="hero-short-gradient-blue absolute inset-0 h-full w-full bg-[#00000033]" />
      <Container className="h-full min-h-[60vh] items-end justify-center text-center md:justify-start md:text-left">
        <h1 className="mt-60 mb-32 w-full break-words font-tacticSansExt text-[40px] font-extrabold uppercase leading-[48px] tracking-wider text-white drop-shadow-lg lg:mt-64 lg:text-5xl lg:leading-[56px] xl:text-6xl xl:leading-[64px]">
          {title}
        </h1>
      </Container>
      <div
        className="absolute bottom-0 right-0 h-[100px] w-full md:w-1/2 xl:w-1/3"
        style={{
          clipPath:
            'polygon(0 100%, 56px calc(100% - 40px), calc(100% - 84px) calc(100% - 40px), 100% calc(100% - 100px), 100% 100%)',
        }}
      >
        <BackgroundTexture />
      </div>
    </section>
  )
}

export default HeroShort
