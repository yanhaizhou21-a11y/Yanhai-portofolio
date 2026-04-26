import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function AdminLogin() {
  const { user, loading, loginWithGoogle, adminEmail } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')

  if (!loading && user) return <Navigate to="/xon2-admin" replace />

  const onGoogle = async () => {
    setError('')
    try {
      await loginWithGoogle()
      navigate('/xon2-admin', { replace: true })
    } catch (err) {
      if (err?.message === 'auth/not-admin') {
        setError(`Only ${adminEmail} can access admin panel.`)
      } else {
        setError('Google sign in failed. Please try again.')
      }
    }
  }

  return (
    <main className="section-wrap border-t-0">
      <div className="container max-w-md">
        <p className="label">// ADMIN</p>
        <h1 className="title">Sign in with Google</h1>
        <div className="mt-2 text-sm" style={{ color: 'var(--text-muted)' }}>
          Allowed admin: {adminEmail}
        </div>
        <div className="mt-6 grid gap-3">
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            className="rounded px-3 py-2"
            style={{ background: 'var(--accent)', color: 'var(--bg)' }}
            onClick={onGoogle}
          >
            Continue with Google
          </button>
        </div>
        <Link className="mt-4 inline-block text-sm" to="/">
          Back to home
        </Link>
      </div>
    </main>
  )
}

export default AdminLogin
