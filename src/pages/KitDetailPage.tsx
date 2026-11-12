import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useAdminStore } from '../store/adminStore'
import Footer from '../components/Footer'

const INGREDIENT_BENEFITS: Record<string, string> = {
  'glycolic acid': 'Gently exfoliates dead skin cells, unclogs pores, and refines skin texture for a smoother complexion.',
  'vitamin c': 'Potent antioxidant that brightens dull skin, fades dark spots, and boosts natural radiance.',
  'papaya extract': 'Rich in natural papain enzymes to dissolve impurities and promote gentle skin renewal.',
  'tulsi extract': 'Sacred Ayurvedic purifier that calms inflammation, fights blemishes, and detoxifies pores.',
  'aloe extract': 'Deeply hydrates, cools, and soothes sensitive or irritated skin while preserving moisture.',
  'neem extract': 'Natural antibacterial botanical that clears breakouts, balances sebum, and protects the barrier.',
  'panthenol': 'Pro-Vitamin B5 humectant that locks in hydration, softens skin, and strengthens the protective barrier.',
  'niacinamide': 'Minimizes enlarged pores, balances oil production, and reinforces the skin moisture barrier.',
  'melazero': 'Clinically proven brightening active that targets stubborn hyperpigmentation and uneven tone gently.',
  'pro col one+': 'Advanced collagen-boosting complex that firms skin, improves elasticity, and softens fine lines.',
  'caffeine': 'Energizes tired skin, reduces morning puffiness, and visibly tightens and revitalizes complexion.',
  'pro vitamin b5': 'Deeply attracts and retains moisture to keep skin plump, calm, and supple throughout the day.',
  'vitamin e': 'Nourishing antioxidant that shields against UV & environmental stressors while enhancing Vitamin C efficacy.',
  'hyaluronic acid': 'Multi-depth hydrator that binds up to 1000× its weight in water for instant, dewy plumpness.',
  'neem': 'Overnight purifying botanical that calms redness, clarifies blemishes, and keeps pores clean while you sleep.',
  'manjishta': 'Revered Ayurvedic herb that fades pigmentation, evens skin tone, and restores a healthy natural glow.',
  'orange peel': 'Natural source of citric acid and antioxidants that gently brightens, tightens pores, and refreshes skin.',
  'saffron': 'Royal Kashmiri elixir rich in crocin to illuminate skin, diminish dark spots, and impart golden radiance.',
  'rosehip': 'Cold-pressed botanical rich in omegas & natural retinoids to accelerate cellular repair and smooth fine lines.',
}

function getIngredientBenefit(ingredient: string): string {
  const key = ingredient.trim().toLowerCase()
  return INGREDIENT_BENEFITS[key] || 'Botanical & clinical active supporting healthy, radiant, balanced skin.'
}

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
      <div className="kit-detail-container" style={{ maxWidth: '1380px', margin: '0 auto', padding: '1rem 2.5rem 3rem' }}>
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
                padding: '1.35rem 1.6rem',
                boxShadow: '0 6px 20px rgba(184, 147, 84, 0.07)',
                display: 'flex',
                alignItems: 'flex-start',
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

                {/* Ingredients & Benefits Breakdown: Each Ingredient Separate */}
                <div
                  style={{
                    background: '#FAF7F2',
                    borderRadius: '14px',
                    padding: '0.9rem 1.05rem',
                    border: '1px solid rgba(196, 164, 108, 0.25)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '0.4rem',
                      marginBottom: '0.65rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#8C6718',
                      }}
                    >
                      ✦ Key Ingredients & Their Benefits
                    </span>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.64rem',
                        color: '#8A7565',
                        fontStyle: 'italic',
                      }}
                    >
                      {product.ingredients.length} Pure Actives
                    </span>
                  </div>

                  <div
                    className="kit-ingredients-grid"
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                      gap: '0.55rem',
                    }}
                  >
                    {product.ingredients.map((ing, idx) => {
                      const isHero = product.heroActives?.includes(ing)
                      return (
                        <div
                          key={idx}
                          style={{
                            background: isHero ? '#FCF7EA' : '#FFFDF9',
                            border: isHero
                              ? '1px solid rgba(196, 152, 46, 0.45)'
                              : '1px solid rgba(196, 164, 108, 0.22)',
                            borderRadius: '10px',
                            padding: '0.55rem 0.75rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.2rem',
                          }}
                        >
                          <div
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '0.74rem',
                              fontWeight: 700,
                              color: isHero ? '#785310' : '#241D19',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                            }}
                          >
                            <span style={{ color: '#B89354', fontSize: '0.7rem' }}>{isHero ? '✦' : '•'}</span>
                            <span>{ing}</span>
                          </div>
                          <div
                            style={{
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '0.71rem',
                              color: '#5C4E46',
                              lineHeight: 1.45,
                            }}
                          >
                            {getIngredientBenefit(ing)}
                          </div>
                        </div>
                      )
                    })}
                  </div>
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
        @media (max-width: 640px) {
          .kit-detail-container {
            padding: 0.75rem 1rem 2.5rem !important;
          }
          .kit-product-card {
            padding: 1rem !important;
            gap: 1rem !important;
          }
          .kit-ingredients-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* ─── FOOTER ─── */}
      <Footer />
    </div>
  )
}
