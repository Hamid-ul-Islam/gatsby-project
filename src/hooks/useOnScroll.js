import { useLenis } from '@context/lenisContext'
import { useEffect } from 'react'

export const useOnScroll = (callback) => {
  const { lenis } = useLenis()

  useEffect(() => {
    if (!lenis) return

    lenis.on('scroll', callback)
    lenis.notify()

    return () => {
      lenis.off('scroll', callback)
    }
  }, [lenis, callback])
}

// usage with other dependencies
// useOnScroll(useMemo(() => {}, [other dependencies]))
