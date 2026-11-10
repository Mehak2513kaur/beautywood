import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useAdminStore } from '../store/adminStore'
import Footer from '../components/Footer'

export default function KitDetailPage() {
  const { addItem, openCart } = useCartStore()
  const { kit, products } = useAdminStore()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [])

  const handleAddKit = () => {
    addItem({
      id: kit.id,
      name: kit.name,
      price: kit.price,
      image: kit.image,
    })
    openCart()
  }

  return (
    <div style={{ background: '#FAF7F2', minHeight: '100vh', color: '#2D241E', paddingTop: '4.8rem' }}>
      {/* ─── LAPTOP PROPORTIONED CONTAINER (1380PX WIDTH) ─── */}
      <div style={{ maxWidth: '1380px', margin: '0 auto', padding: '1rem 2.5rem 3rem' }}>
        {/* ─── TOP BAR / BACK LINK ─── */}
        <div style={{ marginBottom: '1.2rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#706056',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* ─── SLEEK KIT HEADER BAR ─── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
            paddingBottom: '1.4rem',
            borderBottom: '1px solid rgba(196, 164, 108, 0.25)',
            marginBottom: '1.6rem',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.64rem',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#B89354',
                marginBottom: '0.35rem',
              }}
            >
              ✦ {kit.tagline || 'Curated 3-Piece System'} ✦
            </div>
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
                fontWeight: 500,
                color: '#241D19',
                lineHeight: 1.1,
                margin: 0,
                marginBottom: '0.25rem',
              }}
            >
              {kit.name}
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#706056', margin: 0 }}>
              {kit.subtitle}
            </p>
          </div>

          {/* Kit Price and Buy Bundle CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '2.2rem',
                  fontWeight: 600,
                  color: '#241D19',
                  lineHeight: 1,
                }}
              >
                ${kit.price}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#2E7D32', fontWeight: 600 }}>
                {kit.badge}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(196, 164, 108, 0.45)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddKit}
              style={{
                padding: '0.85rem 2rem',
                background: 'linear-gradient(135deg, #EAD8B5 0%, #C4A46C 50%, #B89354 100%)',
                color: '#241D19',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                border: 'none',
                borderRadius: '35px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                boxShadow: '0 4px 18px rgba(196, 164, 108, 0.35)',
              }}
            >
              <ShoppingBag size={15} />
              <span>Buy Complete Kit — ${kit.price}</span>
            </motion.button>
          </div>
        </div>

        {/* ─── 3 PRODUCTS IN SLEEK HORIZONTAL CARDS (LAPTOP FITTED) ─── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {products.map((product) => (
            <div
              key={product.id}
              className="kit-product-card"
              style={{
                background: '#FFFDF9',
                borderRadius: '18px',
                border: '1.5px solid rgba(218, 180, 120, 0.45)',
                padding: '1.2rem 1.6rem',
                boxShadow: '0 6px 20px rgba(184, 147, 84, 0.07)',
                display: 'flex',
                alignItems: 'center',
                gap: '1.75rem',
              }}
            >
              {/* Product Photo: Fixed compact size on laptop */}
              <div
                className="kit-product-img"
                style={{
                  width: '165px',
                  height: '165px',
                  flexShrink: 0,
                  borderRadius: '14px',
                  overflow: 'hidden',
                  background: '#FAF7F2',
                  boxShadow: '0 4px 14px rgba(0, 0, 0, 0.06)',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Product Details: Name, Price, Ingredients, Action */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                {/* Top Header: Step & Name on left, Price & Add Button on right */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.65rem',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.6rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#B89354',
                        background: 'rgba(196, 164, 108, 0.14)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: '8px',
                      }}
                    >
                      {product.step} · {product.quantity}
                    </span>
                    <h2
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '1.75rem',
                        fontWeight: 600,
                        color: '#241D19',
                        lineHeight: 1,
                        margin: 0,
                      }}
                    >
                      {product.name}
                    </h2>
                  </div>

                  <div>
                    <span
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '1.75rem',
                        fontWeight: 600,
                        color: '#B89354',
                        lineHeight: 1,
                      }}
                    >
                      ${product.price}
                    </span>
                  </div>
                </div>

                {/* Ingredients Box: Compact & Clear */}
                <div
                  style={{
                    background: '#FAF7F2',
                    borderRadius: '12px',
                    padding: '0.75rem 1rem',
                    border: '1px solid rgba(196, 164, 108, 0.2)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.64rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: '#5C4A42',
                      marginBottom: '0.25rem',
                    }}
                  >
                    Ingredients:
                  </div>
                  <p
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.76rem',
                      color: '#6E5E56',
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {product.ingredients.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .kit-product-card {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
          .kit-product-img {
            width: 100% !important;
            height: 220px !important;
          }
        }
      `}</style>

      {/* ─── FOOTER ─── */}
      <Footer />
    </div>
  )
}
