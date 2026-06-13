import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function LoginPage() {
  const { user, loading, loginWithGoogle, adminEmail } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) {
    return <Navigate to="/dashboard-ctrl-x7" replace />
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setSubmitting(true)
    try {
      await loginWithGoogle()
      navigate('/dashboard-ctrl-x7', { replace: true })
    } catch (err) {
      const msg =
        err?.message === 'auth/not-admin'
          ? `Only ${adminEmail} can access admin dashboard.`
          : 'Google login failed. Please try again.'
      setError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          background: '#fff',
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            border: '2px solid rgba(0,0,0,0.1)',
            borderTop: '2px solid #000',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#fff',
        padding: '16px',
        fontFamily: "var(--font-body), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#000' }}>Admin Access</h1>
          <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px' }}>
            Sign in with Google as {adminEmail}
          </p>
        </div>

        <div style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '24px' }}>
          {error && (
            <div
              style={{
                padding: '12px',
                fontSize: '14px',
                color: '#c00',
                border: '1px solid rgba(200,0,0,0.2)',
                marginBottom: '16px',
              }}
            >
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting}
            style={{
              width: '100%',
              padding: '12px',
              fontSize: '14px',
              fontWeight: 700,
              background: '#000',
              color: '#fff',
              border: '1px solid #000',
              cursor: submitting ? 'not-allowed' : 'pointer',
              opacity: submitting ? 0.5 : 1,
              fontFamily: 'inherit',
            }}
          >
            {submitting ? 'Signing in...' : 'Continue with Google'}
          </button>
        </div>

        <p style={{ marginTop: '24px', textAlign: 'center' }}>
          <a href="/" style={{ fontSize: '14px', color: '#6b7280', textDecoration: 'underline', textUnderlineOffset: '4px' }}>
            Back to Portfolio
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
