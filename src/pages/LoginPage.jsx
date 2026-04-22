import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function LoginPage() {
  const { user, loading, loginWithGoogle, adminEmail } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Already logged in → go to dashboard
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
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] !cursor-auto [&_*]:!cursor-auto">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 !cursor-auto [&_*]:!cursor-auto">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold tracking-tight text-white">Admin Access</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in with Google as {adminEmail}</p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#141414] p-6 space-y-4">
          {error && (
            <div className="rounded-lg border border-red-900/30 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={submitting}
            className="w-full rounded-lg bg-white py-2.5 text-sm font-medium text-black transition hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Signing in...' : 'Continue with Google'}
          </button>
        </div>

        {/* Back link */}
        <p className="mt-6 text-center">
          <a
            href="/"
            className="text-sm text-gray-600 transition hover:text-white"
          >
            ← Back to Portfolio
          </a>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
