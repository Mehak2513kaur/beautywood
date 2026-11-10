import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import CartDrawer from './components/CartDrawer'
import GlitterCanvas from './components/GlitterCanvas'
import HomePage from './pages/HomePage'
import KitDetailPage from './pages/KitDetailPage'
import AdminPage from './pages/AdminPage'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function LayoutContent() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <GlitterCanvas />}
      {!isAdmin && <Navbar />}
      {!isAdmin && <CartDrawer />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/kit/:slug" element={<KitDetailPage />} />
        <Route path="/kits/:slug" element={<KitDetailPage />} />
        <Route path="/complete-skincare-kit" element={<KitDetailPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <LayoutContent />
    </BrowserRouter>
  )
}

export default App
