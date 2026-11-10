import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Search, Menu, X } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

const navLinks = [
  { label: 'Skincare Kits', href: '#skincare-kits' },
  { label: 'The Sandook', href: '#sandook' },
  { label: 'Products', href: '#products' },
  { label: 'The Story', href: '#story' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { itemCount, toggleCart } = useCartStore()
  const location = useLocation()
  const navigate = useNavigate()
  const count = itemCount()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    if (href === '#' || href === '/') {
      if (location.pathname !== '/') {
        navigate('/')
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      return
    }

    if (location.pathname !== '/') {
      navigate(`/${href}`)
      setTimeout(() => {
        const target = document.querySelector(href)
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 150)
      return
    }

    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const textColor = '#332B26'

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: scrolled ? '0.75rem clamp(1rem, 3.5vw, 2.5rem)' : '1.1rem clamp(1rem, 3.5vw, 2.5rem)',
          transition: 'all 0.4s cubic-bezier(0.25,0.1,0.25,1)',
          backgroundColor: scrolled ? 'rgba(255, 253, 249, 0.94)' : 'rgba(250, 247, 242, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(196, 164, 108, 0.18)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, '#')}
            style={{ textDecoration: 'none' }}
          >
            <motion.div whileHover={{ opacity: 0.7 }} transition={{ duration: 0.2 }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(0.82rem, 1.3vw, 1rem)',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: textColor,
                transition: 'color 0.4s ease',
                whiteSpace: 'nowrap',
              }}>
                THE BEAUTYWOOD
              </span>
            </motion.div>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }} className="nav-desktop">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.65rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: textColor,
                  transition: 'color 0.3s ease, opacity 0.3s ease',
                  opacity: 0.85,
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.target as HTMLElement).style.opacity = '1'}
                onMouseLeave={e => (e.target as HTMLElement).style.opacity = '0.85'}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a
              href="#products"
              onClick={(e) => handleNavClick(e, '#products')}
              style={{ lineHeight: 0, textDecoration: 'none' }}
              title="Search products"
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Search size={18} color={textColor} style={{ transition: 'color 0.4s ease' }} />
              </motion.div>
            </a>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleCart}
              style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0 }}
              aria-label={`Open cart (${count} items)`}
            >
              <ShoppingBag size={18} color={textColor} style={{ transition: 'color 0.4s ease' }} />
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '-6px',
                    right: '-6px',
                    background: '#C4A46C',
                    color: '#FFFDF9',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    fontSize: '9px',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {count}
                </motion.span>
              )}
            </motion.button>

            {/* Mobile menu button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0, display: 'none' }}
              className="nav-mobile-btn"
              aria-label="Toggle menu"
            >
              {mobileOpen
                ? <X size={20} color={textColor} />
                : <Menu size={20} color={textColor} />
              }
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: '#FFFDF9',
              display: 'flex',
              flexDirection: 'column',
              padding: '6rem 2rem 2rem',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.07 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    display: 'block',
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '2rem',
                    fontWeight: 300,
                    color: '#332B26',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid rgba(196,164,108,0.15)',
                    textDecoration: 'none',
                  }}
                >
                  {link.label}
                </a>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </>
  )
}
