import { motion } from 'framer-motion'
import { Instagram, Mail, MapPin } from 'lucide-react'

const footerLinks = {
  Shop: [
    { label: 'Skincare Kits', href: '/#skincare-kits' },
    { label: 'The Sandook', href: '/#sandook' },
    { label: 'Individual Formulas', href: '/#products' },
    { label: 'The Liquid Gold Ritual', href: '/#story' },
  ],
  Rituals: [
    { label: 'The Sandook Experience', href: '/#sandook' },
    { label: 'Day Antioxidant Shield', href: '/#products' },
    { label: 'Overnight Cell Renewal', href: '/#products' },
    { label: 'Botanical Purification', href: '/#products' },
    { label: 'Complete Botanical Kit', href: '/#skincare-kits' },
  ],
  About: [
    { label: 'Our Story', href: '/#story' },
    { label: 'Contact Us', href: 'mailto:hello@thebeautywood.com' },
    { label: 'Shipping & Returns', href: '/#story' },
    { label: 'Dermatologist Verified', href: '/#skincare-kits' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: '#1A1410', color: '#D9C3A0' }}>
      {/* Oversized wordmark */}
      <div style={{
        borderBottom: '1px solid rgba(196,164,108,0.08)',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem) 3rem',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(3rem, 10vw, 12rem)',
            fontWeight: 300,
            letterSpacing: '0.05em',
            color: 'rgba(196,164,108,0.12)',
            lineHeight: 1,
            textTransform: 'uppercase',
            userSelect: 'none',
          }}
        >
          THE BEAUTYWOOD
        </motion.p>
      </div>

      {/* Links grid */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 3vw, 2rem)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '3rem',
      }}>
        {/* Brand column */}
        <div style={{ gridColumn: 'span 1' }}>
          <a href="#" style={{ textDecoration: 'none' }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#EAD8B5',
              marginBottom: '1.5rem',
            }}>
              THE BEAUTYWOOD
            </p>
          </a>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.78rem',
            lineHeight: 1.8,
            color: 'rgba(217,195,160,0.5)',
            maxWidth: '240px',
            marginBottom: '2rem',
          }}>
            Liquid Gold Botanical Luxury. Where every ritual becomes an expression of beauty.
          </p>
          {/* Social */}
          <div style={{ display: 'flex', gap: '1.25rem' }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ color: '#C4A46C', scale: 1.1 }} style={{ color: 'rgba(217,195,160,0.4)', lineHeight: 0 }}>
                <Instagram size={18} />
              </motion.div>
            </a>
            <a href="mailto:hello@thebeautywood.com">
              <motion.div whileHover={{ color: '#C4A46C', scale: 1.1 }} style={{ color: 'rgba(217,195,160,0.4)', lineHeight: 0 }}>
                <Mail size={18} />
              </motion.div>
            </a>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C4A46C',
              marginBottom: '1.5rem',
            }}>
              {group}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {links.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.78rem',
                    color: 'rgba(217,195,160,0.5)',
                    transition: 'color 0.2s ease',
                    display: 'inline-block',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => (e.target as HTMLElement).style.color = '#EAD8B5'}
                  onMouseLeave={e => (e.target as HTMLElement).style.color = 'rgba(217,195,160,0.5)'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}

        {/* Contact */}
        <div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C4A46C', marginBottom: '1.5rem' }}>
            Contact
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Mail size={14} color="rgba(196,164,108,0.5)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <a href="mailto:hello@thebeautywood.com" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'rgba(217,195,160,0.5)', textDecoration: 'none' }}>
                hello@thebeautywood.com
              </a>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <MapPin size={14} color="rgba(196,164,108,0.5)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: 'rgba(217,195,160,0.5)', lineHeight: 1.6 }}>
                THE BEAUTYWOOD<br />
                Luxury Botanical Beauty House
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(196,164,108,0.08)',
        padding: '1.5rem clamp(1rem, 3vw, 2rem)',
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: 'rgba(217,195,160,0.3)', letterSpacing: '0.08em' }}>
          © {new Date().getFullYear()} THE BEAUTYWOOD. All rights reserved.
        </p>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: 'rgba(217,195,160,0.3)', letterSpacing: '0.08em' }}>
          Liquid Gold Botanical Luxury ✦
        </p>
      </div>
    </footer>
  )
}
