import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { PortfolioProvider } from './context/PortfolioContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <PortfolioProvider>
        <App />
      </PortfolioProvider>
    </AuthProvider>
  </StrictMode>,
)
