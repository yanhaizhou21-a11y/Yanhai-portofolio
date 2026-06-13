import { useState, useCallback } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import SmoothScroll from './components/SmoothScroll.jsx'
import Preloader from './components/Preloader.jsx'
import PageTransition from './components/PageTransition.jsx'
import Navbar from './components/Navbar.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Admin from './admin/AdminPage.jsx'
import AdminLogin from './pages/AdminLogin.jsx'

function App() {
  const [loaded, setLoaded] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <BrowserRouter>
      <SmoothScroll>
        <Preloader onComplete={handlePreloaderComplete} />

        {loaded && (
          <>
            <Navbar />
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/projects" element={<Navigate to="/" replace />} />
                <Route path="/xon2-admin/login" element={<AdminLogin />} />
                <Route
                  path="/xon2-admin"
                  element={
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </PageTransition>
          </>
        )}
      </SmoothScroll>
    </BrowserRouter>
  )
}

export default App
