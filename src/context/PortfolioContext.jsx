import { createContext, useContext, useMemo } from 'react'
import { defaultPortfolioData } from '../data/defaultData.js'
import { useFirestore } from '../hooks/useFirestore.js'

const PortfolioContext = createContext(null)

export function PortfolioProvider({ children }) {
  const [data, setData, loading] = useFirestore()

  const value = useMemo(
    () => ({
      data,
      loading,
      setData,
      replaceSection: async (sectionKey, nextValue) => {
        return setData((prev) => ({ ...prev, [sectionKey]: nextValue }))
      },
      resetData: () => setData(defaultPortfolioData),
    }),
    [data, loading, setData],
  )

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="text-sm text-gray-500">Loading portfolio...</p>
        </div>
      </div>
    )
  }

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
