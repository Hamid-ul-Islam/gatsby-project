import gsap from 'gsap'
import {
  createGlobalState,
  useIsomorphicLayoutEffect,
  useLocalStorage,
} from 'react-use'

const usePrefersReducedMotion = createGlobalState('PrefersReducedMotion')

const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] =
    usePrefersReducedMotion(false)
  const [
    prefersReducedMotionLocalStorage,
    setPrefersReducedMotionLocalStorage,
  ] = useLocalStorage('prefersReducedMotion', false)

  useIsomorphicLayoutEffect(() => {
    setPrefersReducedMotion(prefersReducedMotionLocalStorage)
  }, [prefersReducedMotionLocalStorage])

  const togglePrefersReducedMotion = () => {
    setPrefersReducedMotionLocalStorage(!prefersReducedMotionLocalStorage)
    gsap.matchMediaRefresh()
  }

  return { prefersReducedMotion, togglePrefersReducedMotion }
}

export default useReducedMotion
