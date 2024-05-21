import { useState } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'
import { Switch } from '@headlessui/react'
import useReducedMotion from '@hooks/useReducedMotion'

const ReducedMotionToggle = () => {
  const { prefersReducedMotion, togglePrefersReducedMotion } =
    useReducedMotion()
  const [prefersReducedMotionSystem, setPrefersReducedMotionSystem] =
    useState(false)

  useIsomorphicLayoutEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handleChange = () => {
      setPrefersReducedMotionSystem(mediaQuery.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    handleChange()

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  if (prefersReducedMotionSystem) return null

  return (
    <Switch
      checked={prefersReducedMotion}
      onChange={togglePrefersReducedMotion}
      className="flex items-center justify-between gap-2"
    >
      <span className="text-sm text-white">Reduce motion</span>
      <span className="relative h-6 w-11">
        <span
          className={`${
            prefersReducedMotion
              ? 'bg-gradient-orange'
              : 'bg-gradient-to-r from-gray-200 to-gray-300'
          } absolute inset-0 h-6 w-11 rounded-full transition`}
        />
        <span
          className={`${
            prefersReducedMotion ? 'translate-x-6' : 'translate-x-1'
          } absolute inset-0 top-1 h-4 w-4 transform rounded-full bg-white transition`}
        />
      </span>
    </Switch>
  )
}

export default ReducedMotionToggle
