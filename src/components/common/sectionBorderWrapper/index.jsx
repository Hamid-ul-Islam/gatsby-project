import * as styles from './sectionBorderWrapper.module.css'
import PropTypes from 'prop-types'
import BackgroundTexture from '@components/common/backgroundTexture'
import Container from '@components/layout/container'
import DownArrow from '@components/common/downArrow'

export const borderTypes = {
  LEFT: 'Angled Left',
  RIGHT: 'Angled Right',
  BOLT: 'Lightning Bolt',
}

const downArrowPlacements = {
  LEFT: 'Left',
  RIGHT: 'Right',
  NONE: 'None',
}

const Bolt = () => (
  <span
    className={`absolute top-[-56px] left-0 h-[150px] w-full ${styles.border__divider}`}
  />
)

const SectionBorderWrapper = ({
  border,
  isBelowHero = false,
  hasBackgroundTexture = false,
  downArrow = downArrowPlacements.NONE,
  children,
}) => {
  border ??= borderTypes.LEFT

  const clipPaths = {
    left: '[clip-path:polygon(0_0,_50%_0,_calc(50%_+_48px)_48px,_100%_48px,_100%_100%,_0_100%)]',
    right:
      '[clip-path:polygon(0_48px,_calc(50%_-_48px)_48px,_50%_0,_100%_0,_100%_100%,_0_100%)]',
  }

  const getBorderStyles = (border) => {
    switch (border) {
      case borderTypes.LEFT:
        return clipPaths.left
      case borderTypes.RIGHT:
        return clipPaths.right
      case borderTypes.BOLT:
        return styles.border__container
      default:
        return ''
    }
  }

  const Content = () => {
    const paddintTop = !isBelowHero
      ? border !== borderTypes.BOLT
        ? 'pt-12'
        : 'pt-6'
      : ''

    return <div className={`${paddintTop} pb-12`}>{children}</div>
  }

  return (
    <section className="relative">
      <div className={!isBelowHero ? `${getBorderStyles(border)} -mt-12` : ''}>
        {hasBackgroundTexture ? (
          <BackgroundTexture gradient="linear-gradient(360deg, #e7e7e7 15%, rgba(244, 244, 244, 0) 90%)">
            <Content />
          </BackgroundTexture>
        ) : (
          <Content />
        )}
      </div>
      {border === borderTypes.BOLT && !isBelowHero && <Bolt />}
      {downArrow !== downArrowPlacements.NONE ? (
        <div className="pointer-events-none absolute inset-0 mx-auto hidden h-full w-full md:block">
          <Container className="relative block">
            <DownArrow
              parallax
              className={`xl:-top-42 absolute -top-32 ${
                downArrow === downArrowPlacements.RIGHT
                  ? 'right-[4%] md:right-[6%]'
                  : 'left-[4%] md:left-[6%]'
              }`}
            />
          </Container>
        </div>
      ) : null}
    </section>
  )
}

SectionBorderWrapper.propTypes = {
  border: PropTypes.string,
  downArrow: PropTypes.string,
  isBelowHero: PropTypes.bool,
  hasBackgroundTexture: PropTypes.bool,
  children: PropTypes.node,
}

export default SectionBorderWrapper
