import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
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
        background: 'var(--bg)',
        padding: '32px',
        fontFamily: "var(--font-body), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        transition: 'background 0.4s ease',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', maxWidth: '400px' }}
      >
        <p
          style={{
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            color: 'var(--text-disabled)',
            marginBottom: '8px',
          }}
        >
          // Admin
        </p>
        <h1 style={{ fontSize: '24px', fontWeight: 400, color: 'var(--text)', lineHeight: '1.1', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Sign in with Google
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginTop: '8px' }}>
          Allowed admin: {adminEmail}
        </p>

        <div style={{ marginTop: '32px', display: 'grid', gap: '12px' }}>
          {error && (
            <p style={{ fontSize: '14px', color: '#e53e3e', padding: '12px', border: '1px solid rgba(200,0,0,0.2)' }}>
              {error}
            </p>
          )}
          <motion.button
            onClick={onGoogle}
            style={{
              padding: '12px 24px',
              fontSize: '14px',
              fontWeight: 400,
              background: 'var(--text)',
              color: 'var(--bg)',
              border: '1px solid var(--text)',
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
              borderRadius: '0',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
            whileHover={{ opacity: 0.8 }}
            whileTap={{ opacity: 0.6 }}
          >
            Continue with Google
          </motion.button>
        </div>

        <Link
          to="/"
          style={{
            display: 'inline-block',
            marginTop: '16px',
            fontSize: '14px',
            color: 'var(--text)',
            textDecoration: 'underline',
            textUnderlineOffset: '4px',
          }}
        >
          Back to home
        </Link>
      </motion.div>
    </main>
  )
}

export default AdminLogin
