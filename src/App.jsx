import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const PortfolioPage = lazy(() => import('./pages/PortfolioPage.jsx'))
const LoginPage = lazy(() => import('./pages/LoginPage.jsx'))
const AdminPage = lazy(() => import('./admin/AdminPage.jsx'))

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/admin-login-x7" element={<LoginPage />} />
        <Route
          path="/dashboard-ctrl-x7"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export default App
