import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function ProtectedRoute({ children }) {
  const { user, loading, isAdmin } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
          <p className="text-sm text-gray-500">Verifying access...</p>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin) {
    return <Navigate to="/admin-login-x7" replace />
  }

  return children
}

export default ProtectedRoute
