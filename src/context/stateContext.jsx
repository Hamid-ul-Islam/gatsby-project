import { useState, createContext, useContext } from 'react'

const StateContext = createContext(null)

export const StateProvider = ({ children }) => {
  const [isFirstRender, setFirstRender] = useState(true)

  return (
    <StateContext.Provider value={{ isFirstRender, setFirstRender }}>
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => {
  const context = useContext(StateContext)

  if (!context) {
    throw new Error('useStateContext must be used within a StateProvider')
  }

  return context
}
