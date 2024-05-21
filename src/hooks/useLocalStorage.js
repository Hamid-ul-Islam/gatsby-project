import { useState } from 'react'
import { isSSR } from '@utils'

const useLocalStorage = (key, initialState) => {
  const [state, setState] = useState(() => {
    if (isSSR()) return initialState

    try {
      const localStorageValue = localStorage.getItem(key)
      if (typeof localStorageValue !== 'string') {
        localStorage.setItem(key, JSON.stringify(initialState))
        return initialState
      } else {
        return JSON.parse(localStorageValue || 'null')
      }
    } catch {
      console.error(`Error reading localStorage key "${key}"`)
      return initialState
    }
  })

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value
      setState(valueToStore)

      if (!isSSR()) {
        localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}"`)
    }
  }

  return [state, setValue]
}

export default useLocalStorage

export const LOCAL_STORAGE_KEYS = {
  USER_TOOLS_EXPANDED: 'userToolsExpanded',
  ACCEPTED_TERMS: 'acceptedTerms',
}
