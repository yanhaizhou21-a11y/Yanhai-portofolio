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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: 'var(--bg, #fff)',
          transition: 'background 0.4s ease',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              border: '2px solid var(--border, rgba(0,0,0,0.1))',
              borderTop: '2px solid var(--text, #000)',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
            }}
          />
          <p style={{ fontSize: '14px', color: 'var(--text-muted, #6b7280)', fontFamily: 'sans-serif' }}>Loading portfolio...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
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
