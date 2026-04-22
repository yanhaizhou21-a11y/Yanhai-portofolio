import { Navigate, Route, Routes } from 'react-router-dom'
import PortfolioPage from './pages/PortfolioPage.jsx'
import AdminPage from './admin/AdminPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/admin-sp" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
