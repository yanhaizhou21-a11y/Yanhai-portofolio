import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase.js'

const AuthContext = createContext(null)
const ADMIN_EMAIL = 'amrpendragon@gmail.com'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      const isAllowedAdmin = currentUser?.email?.toLowerCase() === ADMIN_EMAIL
      if (currentUser && !isAllowedAdmin) {
        signOut(auth).catch(() => {})
        setUser(null)
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    const email = result.user?.email?.toLowerCase()

    if (email !== ADMIN_EMAIL) {
      await signOut(auth)
      throw new Error('auth/not-admin')
    }

    return result
  }

  const logout = async () => {
    return signOut(auth)
  }

  const isAdmin = user?.email?.toLowerCase() === ADMIN_EMAIL

  const value = useMemo(
    () => ({ user, loading, loginWithGoogle, logout, isAdmin, adminEmail: ADMIN_EMAIL }),
    [user, loading, isAdmin],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
