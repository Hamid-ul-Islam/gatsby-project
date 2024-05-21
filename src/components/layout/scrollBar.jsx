import { useRef } from 'react'
import { useOnScroll } from '@hooks/useOnScroll'

const ScrollBar = () => {
  const scrollBarRef = useRef(null)

  const animateScrollBar = ({ scroll, limit }) => {
    if (limit === 0) {
      scrollBarRef.current.style.transform = 'scaleY(0)'
    }

    const progress = scroll / limit
    scrollBarRef.current.style.transform = `scaleY(${progress})`
  }

  useOnScroll(animateScrollBar)

  return (
    <div className={'fixed right-0 top-0 bottom-0 z-50 h-full pt-10'}>
      <div
        ref={scrollBarRef}
        className="relative h-full w-[5px] origin-top scale-x-0 bg-orange-600"
      />
    </div>
  )
}

export default ScrollBar
