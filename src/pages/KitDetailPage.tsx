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
    <div
      style={{
        background: 'linear-gradient(180deg, #EFE0C0 0%, #E8D1A7 50%, #DFC391 100%)',
        minHeight: '100vh',
        color: '#2D241E',
        paddingTop: '4.8rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Architectural Golden Corner Glows matching Beautywood Theme */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'clamp(180px, 22vw, 320px)',
          height: 'clamp(180px, 22vw, 320px)',
          background: 'linear-gradient(135deg, rgba(236, 204, 114, 0.45) 0%, rgba(196, 152, 46, 0.28) 100%)',
          borderBottomLeftRadius: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 'clamp(150px, 18vw, 260px)',
          height: 'clamp(150px, 18vw, 260px)',
          background: 'linear-gradient(135deg, rgba(221, 179, 75, 0.35) 0%, rgba(196, 152, 46, 0.2) 100%)',
          borderTopRightRadius: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ─── LAPTOP PROPORTIONED CONTAINER (1380PX WIDTH) ─── */}
      <div className="kit-detail-container" style={{ maxWidth: '1380px', margin: '0 auto', padding: '1rem 2.5rem 3rem', position: 'relative', zIndex: 1 }}>
        {/* ─── TOP BAR / BACK LINK ─── */}
        <div style={{ marginBottom: '1rem' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#4A3220',
              textDecoration: 'none',
              background: 'rgba(255, 250, 238, 0.72)',
              padding: '0.42rem 0.9rem',
              borderRadius: '20px',
              border: '1px solid rgba(184, 136, 34, 0.4)',
              transition: 'all 0.2s',
            }}
          >
            <ArrowLeft size={15} />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* ─── TAALI WOOD & LIQUID GOLD KIT HEADER CARD ─── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.25rem',
            padding: '1.6rem 2rem',
            background: 'linear-gradient(135deg, #2D1F16 0%, #442E20 55%, #2B1C13 100%)',
            borderRadius: '22px',
            border: '1.5px solid rgba(221, 179, 75, 0.55)',
            boxShadow: '0 14px 36px rgba(45, 31, 22, 0.22)',
            marginBottom: '1.8rem',
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
                color: '#E8C46A',
                marginBottom: '0.4rem',
              }}
            >
              ✦ {kit.tagline || 'Curated 3-Piece System'} ✦
            </div>
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2rem, 3.2vw, 2.85rem)',
                fontWeight: 600,
                color: '#FFF8EA',
                lineHeight: 1.08,
                margin: 0,
                marginBottom: '0.35rem',
              }}
            >
              {kit.name}
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.86rem', color: '#E3D3B7', margin: 0 }}>
              {kit.subtitle}
            </p>
          </div>

          {/* Kit Price and Buy Bundle CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'right' }}>
              <div
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '2.3rem',
                  fontWeight: 700,
                  color: '#F3D88C',
                  lineHeight: 1,
                }}
              >
                ${kit.price}
              </div>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#A5D6A7', fontWeight: 600, marginTop: '0.2rem' }}>
                {kit.badge}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 8px 25px rgba(221, 179, 75, 0.45)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddKit}
              style={{
                padding: '0.9rem 2.1rem',
                background: 'linear-gradient(135deg, #F3DC9C 0%, #D4A83E 50%, #B88822 100%)',
                color: '#241811',
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
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
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
                background: 'linear-gradient(145deg, #FFFDF6 0%, #F7E9CC 100%)',
                borderRadius: '20px',
                border: '1.5px solid rgba(184, 136, 34, 0.5)',
                padding: '1.45rem 1.7rem',
                boxShadow: '0 12px 32px rgba(92, 61, 39, 0.12)',
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
                  background: '#EED9AE',
                  border: '2px solid rgba(184, 136, 34, 0.45)',
                  boxShadow: '0 6px 18px rgba(92, 61, 39, 0.16)',
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
                {/* Top Header: Step badge + Bold Product Name on left, Price on right */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '0.85rem',
                    flexWrap: 'wrap',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.45rem' }}>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.62rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#F3D88C',
                        background: '#3B2618',
                        padding: '0.26rem 0.72rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(218, 178, 86, 0.45)',
                      }}
                    >
                      {product.step} · {product.quantity}
                    </span>
                    <h2
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: 'clamp(1.9rem, 2.5vw, 2.35rem)',
                        fontWeight: 700,
                        color: '#1A130E',
                        lineHeight: 1.05,
                        letterSpacing: '-0.01em',
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
                        fontSize: '1.85rem',
                        fontWeight: 700,
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
                    background: 'rgba(242, 224, 184, 0.42)',
                    borderRadius: '14px',
                    padding: '0.95rem 1.1rem',
                    border: '1px solid rgba(196, 152, 46, 0.34)',
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
                        color: '#785310',
                      }}
                    >
                      ✦ Key Ingredients & Their Benefits
                    </span>
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.64rem',
                        color: '#6E5538',
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
                            background: isHero
                              ? 'linear-gradient(135deg, #FBF0D6 0%, #F4DFB0 100%)'
                              : '#FCF5E5',
                            border: isHero
                              ? '1px solid rgba(184, 136, 34, 0.55)'
                              : '1px solid rgba(196, 152, 46, 0.28)',
                            borderRadius: '10px',
                            padding: '0.6rem 0.8rem',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.22rem',
                            boxShadow: isHero ? '0 2px 8px rgba(184, 136, 34, 0.12)' : 'none',
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
