import { useEffect, useState } from 'react'
import { doc, onSnapshot, setDoc } from 'firebase/firestore'
import { db } from '../firebase.js'
import { defaultPortfolioData } from '../data/defaultData.js'

const DOC_REF = doc(db, 'portfolio', 'data')

export function useFirestore() {
  const [data, setData] = useState(defaultPortfolioData)
  const [loading, setLoading] = useState(true)

  // Real-time listener
  useEffect(() => {
    const unsubscribe = onSnapshot(
      DOC_REF,
      (snapshot) => {
        if (snapshot.exists()) {
          // Merge with defaults so new fields always exist
          setData({ ...defaultPortfolioData, ...snapshot.data() })
        } else {
          // First time: seed Firestore with defaults
          setDoc(DOC_REF, defaultPortfolioData).catch(() => {})
          setData(defaultPortfolioData)
        }
        setLoading(false)
      },
      (error) => {
        console.error('Firestore read error:', error)
        // Fallback to defaults if Firestore fails
        setData(defaultPortfolioData)
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  // Write to Firestore
  const updateData = async (newData) => {
    const resolved = typeof newData === 'function' ? newData(data) : newData
    setData(resolved)
    try {
      await setDoc(DOC_REF, resolved)
    } catch (error) {
      console.error('Firestore write error:', error)
      throw error
    }
  }

  return [data, updateData, loading]
}
