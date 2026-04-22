import { createContext, useContext, useMemo } from 'react'
import { defaultPortfolioData } from '../data/defaultData.js'
import { useLocalStorage } from '../hooks/useLocalStorage.js'

const PortfolioContext = createContext(null)
const STORAGE_KEY = 'portfolio-data-v1'

export function PortfolioProvider({ children }) {
  const [data, setData] = useLocalStorage(STORAGE_KEY, defaultPortfolioData)

  const value = useMemo(
    () => ({
      data,
      setData,
      replaceSection: (sectionKey, nextValue) => {
        setData((prev) => ({ ...prev, [sectionKey]: nextValue }))
      },
      resetData: () => setData(defaultPortfolioData),
    }),
    [data, setData],
  )

  return (
    <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) {
    throw new Error('usePortfolio must be used inside PortfolioProvider')
  }
  return context
}
