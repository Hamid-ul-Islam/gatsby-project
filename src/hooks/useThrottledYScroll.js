import { useCallback, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'

const useThrottledYScroll = () => {
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const timer = setTimeout(() => {
      setScrollY(window.scrollY)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useIsomorphicLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return scrollY
}

export default useThrottledYScroll
