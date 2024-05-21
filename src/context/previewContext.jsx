import { useState, createContext, useContext } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const PreviewContext = createContext(null)

export const PreviewProvider = ({ children }) => {
  const [previewState, setPreviewState] = useState({
    id: null,
    contentType: null,
    preview: false,
  })

  return (
    <QueryClientProvider client={queryClient}>
      <PreviewContext.Provider value={{ previewState, setPreviewState }}>
        {children}
      </PreviewContext.Provider>
    </QueryClientProvider>
  )
}

export const usePreviewContext = () => {
  const context = useContext(PreviewContext)

  if (!context) {
    throw new Error('usePreviewContext must be used within a PreviewProvider')
  }

  return context
}
