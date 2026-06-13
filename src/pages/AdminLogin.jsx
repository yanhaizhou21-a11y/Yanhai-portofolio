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
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#fff',
        padding: '32px',
        fontFamily: "var(--font-body), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <p
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: '#9ca3af',
            marginBottom: '8px',
          }}
        >
          // Admin
        </p>
        <h1 style={{ fontSize: '32px', fontWeight: 700, color: '#000', lineHeight: '1.1' }}>
          Sign in with Google
        </h1>
        <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
          Allowed admin: {adminEmail}
        </p>

        <div style={{ marginTop: '32px', display: 'grid', gap: '12px' }}>
          {error && (
            <p style={{ fontSize: '14px', color: '#c00', padding: '12px', border: '1px solid rgba(200,0,0,0.2)' }}>
              {error}
            </p>
          )}
          <button
            onClick={onGoogle}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              fontWeight: 700,
              background: '#000',
              color: '#fff',
              border: '1px solid #000',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            Continue with Google
          </button>
        </div>

        <Link
          to="/"
          style={{
            display: 'inline-block',
            marginTop: '16px',
            fontSize: '14px',
            color: '#000',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}

export default AdminLogin
