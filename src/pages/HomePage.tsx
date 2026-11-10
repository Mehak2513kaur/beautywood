import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowDown, ShoppingBag, Sparkles, Check, Star, X } from 'lucide-react'
import { products, skincareKits, getProductsForKit, type SkincareKit } from '../data/products'
import { useAdminStore, type AdminProduct } from '../store/adminStore'
import { useCartStore } from '../store/cartStore'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

// ─── ANIMATION VARIANTS ───────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: 'easeOut' } },
}

// ─── STARTING HERO SECTION: ENTIRE UNTRUNCATED IMAGE WITH ANIMATED TEXT IN EMPTY SPACE ───
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { hero } = useAdminStore()

  // Staggered animated typography words
  const headlineWords = ['BEAUTY,', 'BEYOND', 'THE', 'ORDINARY.']

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        width: '100%',
        marginTop: '4.8rem', // Placed directly after top navigation bar
        background: '#FAF7F2',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0, // Zero padding so width stretches edge-to-edge to match laptop dimensions
        overflow: 'hidden',
      }}
    >
      {/* 
        HERO STAGE: Stretches to 100% full laptop width edge-to-edge.
        Preserves the exact 1671 / 941 native aspect ratio so the entire image fits completely without cropping.
      */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '100%', // Full laptop screen width
          aspectRatio: '1671 / 941',
          margin: 0,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', // Aligns text into the empty lower satin space
        }}
      >
        {/* Full-width image matching laptop dimensions */}
        <img
          src={hero.heroImage}
          alt="THE BEAUTYWOOD Starting Hero"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover', // Fills 100% edge-to-edge seamlessly matching native 1671/941 aspect ratio
            display: 'block',
          }}
        />

        {/* 
          Soft luxury gradient applied strictly in the lower empty satin region:
          Top 60% is 100% transparent so the card and bottles are totally clear and unblocked.
          Lower 40% has gentle darkening so the animated text has great contrast.
        */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, transparent 40%, rgba(20, 16, 12, 0.35) 65%, rgba(18, 14, 10, 0.8) 95%)',
            pointerEvents: 'none',
          }}
        />

        {/* ─── ANIMATED TEXT IN THE EMPTY SATIN SPACE ─── */}
        <div
          className="hero-animated-text-container"
          style={{
            position: 'relative',
            zIndex: 5,
            width: '100%',
            padding: 'clamp(1rem, 2.5vw, 2.5rem) clamp(1rem, 3vw, 3rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          {/* Animated Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -14, letterSpacing: '0.15em' }}
            animate={{ opacity: 1, y: 0, letterSpacing: '0.24em' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 1.1rem',
              background: 'rgba(255, 253, 249, 0.16)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              border: '1px solid rgba(234, 216, 181, 0.35)',
              borderRadius: '40px',
              marginBottom: '0.75rem',
              boxShadow: '0 6px 20px rgba(0, 0, 0, 0.25)',
            }}
          >
            <span style={{ color: '#EAD8B5', fontSize: '10px' }}>✦</span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.65rem, 0.88vw, 0.78rem)',
                fontWeight: 600,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#FFFDF9',
              }}
            >
              Liquid Gold Botanical Luxury
            </span>
            <span style={{ color: '#EAD8B5', fontSize: '10px' }}>✦</span>
          </motion.div>

          {/* Staggered Animated Headline */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.35rem 1.1rem',
              marginBottom: '0.85rem',
            }}
          >
            {headlineWords.map((word, index) => (
              <div key={index} style={{ overflow: 'hidden' }}>
                <motion.span
                  initial={{ y: '115%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.25 + index * 0.1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  style={{
                    display: 'inline-block',
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(2.4rem, 4.8vw, 5.2rem)',
                    fontWeight: 300,
                    lineHeight: 1.05,
                    letterSpacing: '-0.02em',
                    color: word === 'BEYOND' ? 'transparent' : '#FFFDF9',
                    fontStyle: word === 'BEYOND' ? 'italic' : 'normal',
                    background:
                      word === 'BEYOND'
                        ? 'linear-gradient(135deg, #FFFDF9 0%, #EAD8B5 40%, #C4A46C 80%, #FFFDF9 100%)'
                        : 'none',
                    WebkitBackgroundClip: word === 'BEYOND' ? 'text' : 'unset',
                    WebkitTextFillColor: word === 'BEYOND' ? 'transparent' : undefined,
                    textShadow: '0 3px 20px rgba(0, 0, 0, 0.55)',
                  }}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Animated Subtitle in Empty Satin Space */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.65, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.85rem, 1.25vw, 1.15rem)',
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'rgba(255, 253, 249, 0.95)',
              maxWidth: '680px',
              marginBottom: '1.4rem',
              letterSpacing: '0.015em',
              textShadow: '0 2px 14px rgba(0, 0, 0, 0.65)',
            }}
          >
            {hero.subtitle}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.85 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <a href="#skincare-kits" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: '0 12px 28px rgba(196, 164, 108, 0.45)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.95rem 2.4rem',
                  background: 'linear-gradient(135deg, #EAD8B5 0%, #C4A46C 50%, #B89354 100%)',
                  color: '#241D19',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(0.68rem, 0.9vw, 0.78rem)',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  boxShadow: '0 8px 22px rgba(0, 0, 0, 0.3)',
                }}
              >
                <span>{hero.ctaText}</span>
                <ArrowRight size={14} color="#241D19" />
              </motion.button>
            </a>

            <a href="#products" style={{ textDecoration: 'none' }}>
              <motion.button
                whileHover={{
                  backgroundColor: 'rgba(255, 253, 249, 0.16)',
                  borderColor: '#FFFDF9',
                }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '0.95rem 2.2rem',
                  background: 'rgba(255, 253, 249, 0.08)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: '#FFFDF9',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(0.68rem, 0.9vw, 0.78rem)',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255, 253, 249, 0.35)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              >
                Shop All Products
              </motion.button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── MARQUEE BAR ──────────────────────────────────
function MarqueeBar() {
  const { marquee } = useAdminStore()
  const items = marquee.flatMap((item) => [item, '✦'])
  const doubled = [...items, ...items]
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, #B89354 0%, #C4A46C 25%, #EAD8B5 50%, #C4A46C 75%, #B89354 100%)',
        padding: '0.85rem 0',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 10,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        borderTop: '1px solid rgba(255, 253, 249, 0.35)',
        borderBottom: '1px solid rgba(51, 43, 38, 0.1)',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '2.5rem',
          animation: 'marquee 40s linear infinite',
          whiteSpace: 'nowrap',
          width: 'max-content',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: item === '✦' ? '#FFFDF9' : '#2A221C',
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              textShadow: item === '✦' ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── LOCAL SECTION GLITTER & SPARKLE CANVAS ─────────────────────
function SectionGlitterCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    const parent = canvas.parentElement
    if (!parent) return

    let width = (canvas.width = parent.clientWidth)
    let height = (canvas.height = parent.clientHeight)

    const handleResize = () => {
      if (!canvas || !parent) return
      width = canvas.width = parent.clientWidth
      height = canvas.height = parent.clientHeight
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(parent)

    // Palette of sparkling gold, soft champagne and creamy shimmer
    const GOLD_SPARKLES = [
      { r: 236, g: 198, b: 122 }, // Molten gold
      { r: 248, g: 228, b: 172 }, // Champagne sparkle
      { r: 218, g: 178, b: 106 }, // Warm golden shimmer
      { r: 255, g: 246, b: 220 }, // Pure diamond spark
      { r: 224, g: 186, b: 116 }, // Luminous botanical gold
    ]

    interface SparkleParticle {
      x: number
      y: number
      size: number
      baseOpacity: number
      speedY: number
      speedX: number
      angle: number
      rotSpeed: number
      twinkleSpeed: number
      phase: number
      type: 'star' | 'diamond' | 'bokeh' | 'spark'
      color: { r: number; g: number; b: number }
    }

    const count = Math.min(100, Math.max(50, Math.floor((width * height) / 11000)))
    const particles: SparkleParticle[] = []

    for (let i = 0; i < count; i++) {
      const color = GOLD_SPARKLES[Math.floor(Math.random() * GOLD_SPARKLES.length)]
      const types: SparkleParticle['type'][] = ['star', 'diamond', 'bokeh', 'spark']
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() < 0.28 ? Math.random() * 5 + 3.5 : Math.random() * 2.4 + 1.2,
        baseOpacity: Math.random() * 0.45 + 0.35,
        speedY: (Math.random() - 0.5) * 0.25 - 0.1,
        speedX: (Math.random() - 0.5) * 0.2,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.025,
        twinkleSpeed: Math.random() * 0.045 + 0.02,
        phase: Math.random() * Math.PI * 2,
        type: types[Math.floor(Math.random() * types.length)],
        color,
      })
    }

    const drawStar = (cx: number, cy: number, spikes: number, outerR: number, innerR: number) => {
      let rot = (Math.PI / 2) * 3
      let x = cx
      let y = cy
      const step = Math.PI / spikes

      ctx.beginPath()
      ctx.moveTo(cx, cy - outerR)
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerR
        y = cy + Math.sin(rot) * outerR
        ctx.lineTo(x, y)
        rot += step
        x = cx + Math.cos(rot) * innerR
        y = cy + Math.sin(rot) * innerR
        ctx.lineTo(x, y)
        rot += step
      }
      ctx.lineTo(cx, cy - outerR)
      ctx.closePath()
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.y += p.speedY
        p.x += p.speedX
        p.angle += p.rotSpeed
        p.phase += p.twinkleSpeed

        if (p.y < -25) p.y = height + 25
        if (p.y > height + 25) p.y = -25
        if (p.x < -25) p.x = width + 25
        if (p.x > width + 25) p.x = -25

        const osc = 0.5 + 0.5 * Math.sin(p.phase)
        const currentOpacity = p.baseOpacity * (0.25 + 0.75 * osc)
        const { r, g, b } = p.color

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.angle)

        if (p.type === 'star') {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`
          ctx.shadowColor = `rgba(245, 220, 150, ${currentOpacity * 0.95})`
          ctx.shadowBlur = 12
          drawStar(0, 0, 4, p.size * 2.2, p.size * 0.45)
          ctx.fill()
        } else if (p.type === 'diamond') {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`
          ctx.shadowColor = `rgba(234, 196, 122, ${currentOpacity * 0.85})`
          ctx.shadowBlur = 9
          ctx.beginPath()
          ctx.moveTo(0, -p.size * 1.6)
          ctx.lineTo(p.size * 0.8, 0)
          ctx.lineTo(0, p.size * 1.6)
          ctx.lineTo(-p.size * 0.8, 0)
          ctx.closePath()
          ctx.fill()
        } else if (p.type === 'bokeh') {
          const rad = p.size * 4
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rad)
          grad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.6})`)
          grad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${currentOpacity * 0.22})`)
          grad.addColorStop(1, 'rgba(234, 196, 122, 0)')
          ctx.fillStyle = grad
          ctx.beginPath()
          ctx.arc(0, 0, rad, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`
          ctx.shadowColor = `rgba(255, 245, 220, ${currentOpacity})`
          ctx.shadowBlur = 7
          ctx.beginPath()
          ctx.arc(0, 0, p.size * 0.9, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.restore()
      }

      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  )
}

// ─── SECTION: SHOP OUR SKINCARE KITS ─────────────────────────────
function SkincareKitsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const navigate = useNavigate()
  const { addItem, openCart } = useCartStore()
  const { kit } = useAdminStore()

  const handleAddKitToCart = () => {
    addItem({
      id: kit.id,
      name: kit.name,
      price: kit.price,
      image: kit.image,
    })
    openCart()
  }

  return (
    <section
      id="skincare-kits"
      ref={ref}
      style={{
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden',
        // Opulent golden sparkly cream canvas base:
        background: `
          radial-gradient(ellipse 65% 55% at 18% 22%, rgba(248, 232, 185, 0.45) 0%, transparent 70%),
          radial-gradient(ellipse 60% 50% at 82% 78%, rgba(234, 198, 128, 0.35) 0%, transparent 70%),
          linear-gradient(180deg, #FDFBF7 0%, #FAF4E6 50%, #FDFBF7 100%)
        `,
        paddingTop: 'clamp(4.5rem, 7vw, 6.5rem)',
        paddingBottom: 'clamp(5.5rem, 9.5vw, 8.5rem)',
        borderTop: '1px solid rgba(212, 176, 119, 0.4)',
        borderBottom: '1px solid rgba(212, 176, 119, 0.4)',
      }}
    >
      {/* ─── FEATURED LUXURY GOLDEN SKINCARE BACKGROUND (FROM DOWNLOADS) ─── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/kits/skincare-kit-bg.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.38,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'saturate(1.08) brightness(1.02)',
        }}
      />

      {/* ─── SOFT SMOOTH EDGE TRANSITION OVERLAY ─── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(253, 251, 247, 0.65) 0%, rgba(253, 251, 247, 0.1) 25%, rgba(253, 251, 247, 0.1) 75%, rgba(253, 251, 247, 0.65) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* ─── LIVE TWINKLING GOLDEN CANVAS PARTICLES ─── */}
      <SectionGlitterCanvas />

      {/* ─── CONTENT CONTAINER (ELEVATED ABOVE PARTICLES) ─── */}
      <div style={{ maxWidth: '1540px', margin: '0 auto', padding: '0 2.5rem', position: 'relative', zIndex: 3 }}>
        {/* ─── SECTION HEADER ─── */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2.8rem',
            flexWrap: 'wrap',
            gap: '2rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                fontWeight: 600,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#B89354',
                marginBottom: '0.75rem',
              }}
            >
              <span>✦</span>
              <span>The Signature Skincare Kit</span>
              <span>✦</span>
            </div>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.7rem, 5vw, 4.2rem)',
                fontWeight: 300,
                color: '#2D241E',
                lineHeight: 1.08,
                letterSpacing: '-0.015em',
                marginBottom: '0.65rem',
              }}
            >
              Shop Our <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Skincare Kit</span>
            </h2>
            <p
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: 'clamp(0.95rem, 1.25vw, 1.15rem)',
                color: '#7A6B63',
                lineHeight: 1.65,
                maxWidth: '720px',
              }}
            >
              Complete skincare kit crafted with research-based ingredients for healthy, radiant, and timeless skin.
            </p>
          </div>

          <a
            href="#products"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#332B26',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.75rem 1.8rem',
              border: '1px solid rgba(51, 43, 38, 0.3)',
              borderRadius: '35px',
              background: 'rgba(255, 253, 249, 0.85)',
              backdropFilter: 'blur(8px)',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(51, 43, 38, 0.04)',
              textDecoration: 'none',
            }}
          >
            <span>Explore All Products</span>
            <ArrowRight size={14} />
          </a>
        </div>

        {/* ─── SINGLE HORIZONTAL BAR: COMPLETE SKINCARE KIT ─── */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            background: 'rgba(255, 253, 249, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            borderRadius: '26px',
            border: '1.5px solid rgba(218, 180, 120, 0.55)',
            boxShadow: '0 20px 50px rgba(184, 147, 84, 0.16)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Subtle top gold sheen gradient line */}
          <div
            style={{
              height: '3px',
              width: '100%',
              background: 'linear-gradient(90deg, transparent 0%, #D4AF37 35%, #F3E5AB 50%, #C4A46C 65%, transparent 100%)',
            }}
          />

          <div
            style={{
              padding: 'clamp(2rem, 3.5vw, 3.2rem)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 'clamp(2rem, 3.5vw, 3.5rem)',
              alignItems: 'center',
            }}
          >
            {/* Left Column: Kit Identity, Price & Action */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#B89354',
                  background: 'rgba(196, 164, 108, 0.12)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '30px',
                  width: 'fit-content',
                  marginBottom: '1rem',
                  border: '1px solid rgba(196, 164, 108, 0.25)',
                }}
              >
                <span>✦</span>
                <span>Signature Skincare Kit</span>
              </div>

              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(2.4rem, 3.8vw, 3.4rem)',
                  fontWeight: 600,
                  color: '#2D241E',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                  marginBottom: '0.75rem',
                }}
              >
                {kit.name}
              </h3>

              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(0.9rem, 1.15vw, 1.05rem)',
                  color: '#706056',
                  lineHeight: 1.6,
                  marginBottom: '1.4rem',
                }}
              >
                {kit.subtitle}
              </p>

              {/* Clean Price */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '1rem',
                  marginBottom: '1.8rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '2.6rem',
                    fontWeight: 600,
                    color: '#2D241E',
                  }}
                >
                  ${kit.price}
                </span>
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#2E7D32',
                    background: 'rgba(46, 125, 50, 0.1)',
                    border: '1px solid rgba(46, 125, 50, 0.25)',
                    padding: '0.25rem 0.65rem',
                    borderRadius: '14px',
                  }}
                >
                  {kit.badge}
                </span>
              </div>

              {/* Action Buttons: Add Kit to Bag (Sold as single unit) & Shop The Kit */}
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', alignItems: 'center' }}>
                <motion.button
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 12px 32px rgba(196, 164, 108, 0.48)',
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddKitToCart}
                  style={{
                    padding: '1rem 2.2rem',
                    background: 'linear-gradient(135deg, #EAD8B5 0%, #C4A46C 50%, #B89354 100%)',
                    color: '#241D19',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    border: 'none',
                    borderRadius: '40px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 22px rgba(196, 164, 108, 0.35)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    transition: 'all 0.25s ease',
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Add Kit to Bag — ${kit.price}</span>
                </motion.button>

                <Link to="/kit/complete-skincare-kit" style={{ textDecoration: 'none' }}>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(196, 164, 108, 0.12)' }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      padding: '0.98rem 1.8rem',
                      background: 'transparent',
                      border: '1.5px solid rgba(184, 147, 84, 0.55)',
                      color: '#332B26',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.76rem',
                      fontWeight: 600,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      borderRadius: '40px',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.55rem',
                      transition: 'all 0.25s ease',
                    }}
                  >
                    <span>Shop The Kit</span>
                    <ArrowRight size={15} />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Right Column: Only The Kit Contents Mentioned */}
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'clamp(0.85rem, 1.6vw, 1.4rem)',
                }}
                className="kit-products-row"
              >
                {/* 1. Face Cleanser */}
                <motion.div
                  whileHover={{ y: -6, borderColor: '#C4A46C' }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: '#FAF7F2',
                    borderRadius: '18px',
                    padding: '1rem',
                    border: '1px solid rgba(218, 180, 120, 0.4)',
                    boxShadow: '0 8px 24px rgba(184, 147, 84, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                  onClick={() => navigate('/kit/complete-skincare-kit')}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      color: '#B89354',
                      textTransform: 'uppercase',
                      background: 'rgba(196, 164, 108, 0.15)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '10px',
                      marginBottom: '0.75rem',
                      alignSelf: 'center',
                    }}
                  >
                    Step 01
                  </div>

                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1.08',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: '#FFFFFF',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1556228722-d9b32cb198bc?w=600&q=80"
                      alt="Face Cleanser"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <h4
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: '#2D241E',
                      lineHeight: 1.15,
                    }}
                  >
                    Face Cleanser
                  </h4>
                </motion.div>

                {/* 2. Day Serum */}
                <motion.div
                  whileHover={{ y: -6, borderColor: '#C4A46C' }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: '#FAF7F2',
                    borderRadius: '18px',
                    padding: '1rem',
                    border: '1px solid rgba(218, 180, 120, 0.4)',
                    boxShadow: '0 8px 24px rgba(184, 147, 84, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                  onClick={() => navigate('/kit/complete-skincare-kit')}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      color: '#B89354',
                      textTransform: 'uppercase',
                      background: 'rgba(196, 164, 108, 0.15)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '10px',
                      marginBottom: '0.75rem',
                      alignSelf: 'center',
                    }}
                  >
                    Step 02
                  </div>

                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1.08',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: '#FFFFFF',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80"
                      alt="Day Serum"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <h4
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: '#2D241E',
                      lineHeight: 1.15,
                    }}
                  >
                    Day Serum
                  </h4>
                </motion.div>

                {/* 3. Night Serum */}
                <motion.div
                  whileHover={{ y: -6, borderColor: '#C4A46C' }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: '#FAF7F2',
                    borderRadius: '18px',
                    padding: '1rem',
                    border: '1px solid rgba(218, 180, 120, 0.4)',
                    boxShadow: '0 8px 24px rgba(184, 147, 84, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    textAlign: 'center',
                  }}
                  onClick={() => navigate('/kit/complete-skincare-kit')}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.58rem',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      color: '#B89354',
                      textTransform: 'uppercase',
                      background: 'rgba(196, 164, 108, 0.15)',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '10px',
                      marginBottom: '0.75rem',
                      alignSelf: 'center',
                    }}
                  >
                    Step 03
                  </div>

                  <div
                    style={{
                      width: '100%',
                      aspectRatio: '1 / 1.08',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      background: '#FFFFFF',
                      marginBottom: '0.85rem',
                    }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=600&q=80"
                      alt="Night Serum"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <h4
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: '#2D241E',
                      lineHeight: 1.15,
                    }}
                  >
                    Night Serum
                  </h4>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── SECTION 2: THE SANDOOK · TAALI KI LAKKAD ─────────────────────
function EditorialBreak() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const { sandook } = useAdminStore()

  return (
    <section
      id="sandook"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #FFFDF8 0%, #FAF3E1 45%, #F4E7C7 100%)',
        padding: 'clamp(3.8rem, 6vw, 5.8rem) 0 clamp(3.2rem, 5vw, 4.8rem)',
        minHeight: 'clamp(600px, 75vh, 780px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
        position: 'relative',
        borderTop: '1px solid rgba(220, 180, 75, 0.35)',
        borderBottom: '1px solid rgba(220, 180, 75, 0.35)',
      }}
    >
      {/* Top-Right Architectural Light Golden Arch Accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 'clamp(200px, 22vw, 340px)',
          height: 'clamp(200px, 22vw, 340px)',
          background: 'linear-gradient(135deg, #ECCC72 0%, #DDB34B 50%, #C4982E 100%)',
          borderBottomLeftRadius: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.9,
          boxShadow: 'inset 0 0 35px rgba(255, 230, 140, 0.35)',
        }}
      />

      {/* Bottom-Left Architectural Light Golden Arc Accent */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: 'clamp(140px, 16vw, 240px)',
          height: 'clamp(140px, 16vw, 240px)',
          background: 'linear-gradient(135deg, #ECCC72 0%, #DDB34B 50%, #C4982E 100%)',
          borderTopRightRadius: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.9,
          boxShadow: 'inset 0 0 35px rgba(255, 230, 140, 0.35)',
        }}
      />

      {/* Golden background watermark on the right side under the photo */}
      <div
        style={{
          position: 'absolute',
          bottom: '1rem',
          right: 'clamp(1rem, 4vw, 4.5rem)',
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(3.5rem, 7.5vw, 7.2rem)',
          fontWeight: 400,
          letterSpacing: '0.22em',
          color: 'rgba(214, 170, 60, 0.16)',
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          whiteSpace: 'nowrap',
          zIndex: 1,
        }}
      >
        {sandook.watermarkText}
      </div>

      <div style={{ maxWidth: '1620px', width: '100%', margin: '0 auto', padding: '0 clamp(1.5rem, 3.5vw, 3.5rem)', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(320px, 440px)',
            gap: 'clamp(2rem, 4vw, 4.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left: The Soul of the Sandook (Golden theme) */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {/* Eyebrow */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.65rem' }}>
                <span style={{ width: '36px', height: '1.5px', background: '#C4982E', display: 'inline-block' }} />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color: '#A87C1D',
                  }}
                >
                  {sandook.eyebrow}
                </span>
                <span style={{ width: '36px', height: '1.5px', background: '#C4982E', display: 'inline-block' }} />
              </div>

              {/* Title with radiant golden italic flourish */}
              <div style={{ marginBottom: '0.65rem' }}>
                <h2
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(2.8rem, 4.8vw, 4.8rem)',
                    fontWeight: 400,
                    lineHeight: 0.98,
                    color: '#2C2210',
                    margin: 0,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {sandook.titleLine1}
                </h2>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: 'clamp(2.8rem, 4.8vw, 4.8rem)',
                      fontWeight: 600,
                      fontStyle: 'italic',
                      lineHeight: 1.02,
                      background: 'linear-gradient(135deg, #C4982E 0%, #DDB34B 50%, #9C7215 100%)',
                      WebkitBackgroundClip: 'text',
                      backgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {sandook.titleLine2 && sandook.titleLine2 !== 'A Legacy of Love & Blessings.' ? sandook.titleLine2 : 'The Sandook.'}
                  </span>
                  {/* Botanical leaf spray in gold */}
                  <svg
                    width="44"
                    height="44"
                    viewBox="0 0 44 44"
                    fill="none"
                    stroke="#D4AF37"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ transform: 'rotate(12deg)' }}
                  >
                    <path d="M 6 38 C 16 32, 28 20, 36 6" />
                    <path d="M 18 29 C 14 24, 16 18, 22 21 C 28 24, 25 28, 18 29 Z" />
                    <path d="M 26 21 C 24 14, 29 11, 33 15 C 37 19, 32 22, 26 21 Z" />
                    <path d="M 33 14 C 34 8, 40 7, 41 12 C 42 17, 37 17, 33 14 Z" />
                  </svg>
                </div>
              </div>

              {/* Tagline */}
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(1.02rem, 1.35vw, 1.25rem)',
                  fontWeight: 400,
                  lineHeight: 1.45,
                  color: '#5C4E2D',
                  marginBottom: '0.9rem',
                  maxWidth: '780px',
                }}
              >
                Handcrafted heirlooms that hold more than products — they hold stories, love, and generations of care.
              </p>

              {/* 3 Feature Badges in Golden Harmony */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'stretch',
                  gap: '1rem',
                  padding: '0.85rem 0',
                  borderTop: '1px solid rgba(214, 175, 60, 0.35)',
                  borderBottom: '1px solid rgba(214, 175, 60, 0.35)',
                  marginBottom: '0.95rem',
                  maxWidth: '780px',
                }}
              >
                {/* Badge 1 */}
                <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="#B88822" strokeWidth="1.4" style={{ marginBottom: '0.35rem' }}>
                    <circle cx="18" cy="18" r="15" strokeDasharray="3 2" />
                    <circle cx="18" cy="18" r="11" />
                    <circle cx="18" cy="18" r="7" strokeDasharray="4 2" />
                    <circle cx="18" cy="18" r="3" fill="#B88822" />
                  </svg>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2C2210', lineHeight: 1.3 }}>
                    GENUINE<br />TAALI KI LAKKAD<br /><span style={{ fontSize: '0.64rem', fontWeight: 600, color: '#8A7238' }}>(INDIAN ROSEWOOD)</span>
                  </div>
                </div>

                <div style={{ width: '1px', background: 'rgba(214, 175, 60, 0.35)', alignSelf: 'stretch' }} />

                {/* Badge 2 */}
                <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="#B88822" strokeWidth="1.4" style={{ marginBottom: '0.35rem' }}>
                    <path d="M 10 26 C 10 14, 22 10, 26 10 C 26 22, 14 26, 10 26 Z" />
                    <path d="M 12 24 L 23 13" />
                    <path d="M 20 26 C 24 23, 26 19, 26 15" strokeDasharray="2 2" />
                  </svg>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2C2210', lineHeight: 1.3 }}>
                    RICH,<br />NATURAL<br />FRAGRANCE
                  </div>
                </div>

                <div style={{ width: '1px', background: 'rgba(214, 175, 60, 0.35)', alignSelf: 'stretch' }} />

                {/* Badge 3 */}
                <div style={{ flex: 1, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" stroke="#B88822" strokeWidth="1.4" style={{ marginBottom: '0.35rem' }}>
                    <polygon points="18,6 29,14 18,30 7,14" />
                    <polyline points="7,14 18,17 29,14" />
                    <line x1="18" y1="6" x2="18" y2="30" />
                  </svg>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.74rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#2C2210', lineHeight: 1.3 }}>
                    BUILT<br />TO LAST<br />GENERATIONS
                  </div>
                </div>
              </div>

              {/* Narrative */}
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.96rem',
                  lineHeight: 1.65,
                  color: '#4F4224',
                  marginBottom: '1rem',
                  maxWidth: '780px',
                }}
              >
                {sandook.storyNarrative}
              </p>

              {/* 3 Thumbnail Cards (Light golden champagne theme) */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                  gap: '1rem',
                  marginBottom: 0,
                  maxWidth: '820px',
                }}
              >
                {sandook.thumbnails.map((thumb, i) => (
                  <div
                    key={i}
                    style={{
                      background: '#FCF7EA',
                      borderRadius: '14px',
                      padding: '0.8rem 0.85rem',
                      boxShadow: '0 8px 22px rgba(190, 150, 50, 0.1)',
                      border: '1px solid rgba(220, 185, 90, 0.4)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <img
                      src={thumb.image}
                      alt={thumb.title}
                      style={{
                        width: '100%',
                        height: 'clamp(82px, 7vw, 105px)',
                        objectFit: 'cover',
                        borderRadius: '10px',
                        marginBottom: '0.6rem',
                      }}
                    />
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', fontWeight: 700, color: '#2C2210', marginBottom: '0.25rem' }}>
                      {thumb.title}
                    </div>
                    <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.74rem', color: '#6E5D32', lineHeight: 1.4 }}>
                      {thumb.desc}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: The Sandook Visual Showcase (Warm Gold Backing) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}
          >
            {/* Radiant Golden offset backing card */}
            <div
              style={{
                position: 'absolute',
                right: '-1.1rem',
                bottom: '-1.2rem',
                width: '88%',
                height: '84%',
                background: 'linear-gradient(135deg, #E8C86A 0%, #D4A83E 50%, #BD8E25 100%)',
                borderRadius: '28px',
                zIndex: 1,
                boxShadow: '0 18px 45px rgba(190, 145, 40, 0.28)',
              }}
            />

            {/* Main Hero Card with tote & wooden sandook */}
            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              style={{
                position: 'relative',
                zIndex: 2,
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 48px rgba(180, 140, 35, 0.2)',
                background: '#FAF2DE',
                border: '2px solid rgba(225, 190, 85, 0.45)',
              }}
            >
              <img
                src={sandook.heroMainImage}
                alt="THE BEAUTYWOOD Heirloom Sandook in Taali Ki Lakkad and Embroidered Tote"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </motion.div>

            {/* Floating Memories Gallery Card (Top Right) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88, y: 15 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -3 }}
              style={{
                position: 'absolute',
                top: '-1.5rem',
                right: '-1.3rem',
                width: '46%',
                maxWidth: '185px',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 14px 32px rgba(180, 140, 30, 0.22)',
                border: '3.5px solid #FFFDF8',
                zIndex: 4,
                background: '#FFFDF8',
              }}
            >
              <img
                src={sandook.heroMemoriesImage}
                alt="Memories treasured inside the Sandook"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  objectFit: 'cover',
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 3: INDIVIDUAL PRODUCT PURCHASE SECTION ────────────────────
function ProductGallery() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { addItem, openCart } = useCartStore()
  const [addedId, setAddedId] = useState<string | null>(null)
  const { products: trilogyProducts } = useAdminStore()

  const handleAddToCart = (product: AdminProduct) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    setAddedId(product.id)
    setTimeout(() => setAddedId(null), 2000)
    openCart()
  }

  return (
    <section
      id="products"
      ref={ref}
      style={{
        position: 'relative',
        background: `
          radial-gradient(ellipse 65% 50% at 50% 15%, rgba(248, 234, 198, 0.55) 0%, transparent 70%),
          radial-gradient(ellipse 55% 45% at 85% 85%, rgba(235, 212, 162, 0.4) 0%, transparent 65%),
          radial-gradient(ellipse 45% 40% at 15% 75%, rgba(240, 220, 175, 0.35) 0%, transparent 60%),
          linear-gradient(180deg, #FAF6EE 0%, #F5EDE0 50%, #FAF5EC 100%)
        `,
        padding: 'clamp(2.4rem, 3.6vw, 3.8rem) 0 clamp(2.8rem, 4vw, 4.2rem)',
        overflow: 'hidden',
        borderTop: '1px solid rgba(212, 176, 119, 0.35)',
        borderBottom: '1px solid rgba(212, 176, 119, 0.35)',
      }}
    >
      {/* ─── LAYER 1: BESPOKE LIQUID GOLD & SATIN LUXURY TEXTURE ─── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/golden-glitter-luxury.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.16,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
          zIndex: 0,
          filter: 'saturate(1.15) contrast(1.05)',
        }}
      />

      {/* ─── LAYER 2: GRAND BOTANICAL TRILOGY WATERMARK TYPOGRAPHY ─── */}
      <div
        style={{
          position: 'absolute',
          top: '3.5%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(3.8rem, 9.5vw, 9rem)',
          fontWeight: 700,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(196, 154, 70, 0.075)',
          whiteSpace: 'nowrap',
          userSelect: 'none',
          pointerEvents: 'none',
          zIndex: 0,
          lineHeight: 1,
        }}
      >
        BOTANICAL TRILOGY
      </div>

      {/* ─── LAYER 3: TOP-LEFT BOTANICAL AYURVEDIC FOLIAGE SILHOUETTE ─── */}
      <svg
        width="340"
        height="340"
        viewBox="0 0 200 200"
        fill="none"
        style={{
          position: 'absolute',
          top: '-20px',
          left: '-20px',
          opacity: 0.28,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <path
          d="M 10 190 Q 60 120 120 70 Q 160 40 190 10"
          stroke="#C49A38"
          strokeWidth="1.6"
        />
        <path
          d="M 50 140 Q 25 115 42 92 Q 65 108 50 140 Z"
          fill="rgba(214, 175, 60, 0.18)"
          stroke="#C49A38"
          strokeWidth="1.1"
        />
        <path
          d="M 72 120 Q 98 102 108 82 Q 92 82 72 120 Z"
          fill="rgba(214, 175, 60, 0.18)"
          stroke="#C49A38"
          strokeWidth="1.1"
        />
        <path
          d="M 100 85 Q 82 60 98 40 Q 120 58 100 85 Z"
          fill="rgba(214, 175, 60, 0.22)"
          stroke="#C49A38"
          strokeWidth="1.1"
        />
        <path
          d="M 130 65 Q 158 50 168 28 Q 148 35 130 65 Z"
          fill="rgba(214, 175, 60, 0.22)"
          stroke="#C49A38"
          strokeWidth="1.1"
        />
        <circle cx="190" cy="10" r="3.5" fill="#C49A38" />
      </svg>

      {/* ─── LAYER 4: BOTTOM-RIGHT BOTANICAL AYURVEDIC FOLIAGE SILHOUETTE ─── */}
      <svg
        width="360"
        height="360"
        viewBox="0 0 200 200"
        fill="none"
        style={{
          position: 'absolute',
          bottom: '-30px',
          right: '-30px',
          opacity: 0.28,
          transform: 'rotate(180deg)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <path
          d="M 10 190 Q 60 120 120 70 Q 160 40 190 10"
          stroke="#C49A38"
          strokeWidth="1.6"
        />
        <path
          d="M 50 140 Q 25 115 42 92 Q 65 108 50 140 Z"
          fill="rgba(214, 175, 60, 0.18)"
          stroke="#C49A38"
          strokeWidth="1.1"
        />
        <path
          d="M 72 120 Q 98 102 108 82 Q 92 82 72 120 Z"
          fill="rgba(214, 175, 60, 0.18)"
          stroke="#C49A38"
          strokeWidth="1.1"
        />
        <path
          d="M 100 85 Q 82 60 98 40 Q 120 58 100 85 Z"
          fill="rgba(214, 175, 60, 0.22)"
          stroke="#C49A38"
          strokeWidth="1.1"
        />
        <path
          d="M 130 65 Q 158 50 168 28 Q 148 35 130 65 Z"
          fill="rgba(214, 175, 60, 0.22)"
          stroke="#C49A38"
          strokeWidth="1.1"
        />
        <circle cx="190" cy="10" r="3.5" fill="#C49A38" />
      </svg>

      {/* ─── LAYER 5: ARCHITECTURAL GOLD LINE PATTERN & PARTICLES ─── */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(184, 147, 84, 0.11) 1.2px, transparent 0)',
          backgroundSize: '36px 36px',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Radiant ambient glow orbs behind individual product cards */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '1000px',
          height: '420px',
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(246, 226, 170, 0.45) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: '1480px', margin: '0 auto', padding: '0 clamp(1.5rem, 3.5vw, 3.5rem)', position: 'relative', zIndex: 2 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 3.8vw, 3.5rem)' }}
        >
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.85rem', marginBottom: '0.85rem' }}>
            <span style={{ width: '40px', height: '1.5px', background: 'linear-gradient(90deg, transparent, #C49A38)', display: 'inline-block' }} />
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: '#A87C1D',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
              }}
            >
              <Sparkles size={13} color="#C49A38" />
              THE BOTANICAL TRILOGY · INDIVIDUAL ESSENTIALS
              <Sparkles size={13} color="#C49A38" />
            </span>
            <span style={{ width: '40px', height: '1.5px', background: 'linear-gradient(90deg, #C49A38, transparent)', display: 'inline-block' }} />
          </div>

          <h2
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2.5rem, 4.5vw, 4.2rem)',
              fontWeight: 400,
              color: '#281B13',
              lineHeight: 1.05,
              marginBottom: '0.85rem',
              letterSpacing: '-0.01em',
            }}
          >
            Curated Individual Formulas
          </h2>

          <p
            style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 'clamp(0.98rem, 1.3vw, 1.12rem)',
              color: '#655345',
              lineHeight: 1.65,
              maxWidth: '720px',
              margin: '0 auto',
            }}
          >
            Each formula stands on its own as a masterwork of clinical potency and Ayurvedic botanical wisdom. Select individually or experience all three in harmony.
          </p>
        </motion.div>

        {/* 3 Individual Product Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: 'clamp(1.75rem, 3vw, 2.75rem)',
            alignItems: 'stretch',
          }}
        >
          {trilogyProducts.map((p, idx) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 45 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: idx * 0.16 }}
              whileHover={{ y: -8, boxShadow: '0 28px 65px rgba(184, 147, 84, 0.22)', borderColor: 'rgba(196, 154, 70, 0.7)' }}
              style={{
                background: 'linear-gradient(180deg, #FFFFFF 0%, #FCF9F3 100%)',
                borderRadius: '26px',
                border: '1.5px solid rgba(212, 176, 119, 0.42)',
                boxShadow: '0 16px 42px rgba(50, 35, 20, 0.08)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
              }}
            >
              {/* Product Photo Showcase */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '310px',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at 50% 50%, #FAF3E6 0%, #EFE3D0 100%)',
                }}
              >
                {/* Background watermark Roman numeral */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '11rem',
                    fontWeight: 700,
                    color: 'rgba(196, 164, 108, 0.12)',
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    zIndex: 0,
                  }}
                >
                  {p.roman}
                </div>

                <motion.img
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.8 }}
                  src={p.image}
                  alt={p.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    position: 'relative',
                    zIndex: 1,
                  }}
                />

                {/* Soft bottom vignette on image */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(20, 15, 10, 0.1) 0%, transparent 40%, rgba(20, 15, 10, 0.45) 100%)',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                />

                {/* Floating Step Badge with Frosted Glass */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.1rem',
                    left: '1.1rem',
                    background: 'rgba(255, 253, 249, 0.92)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    padding: '0.45rem 0.95rem',
                    borderRadius: '20px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.64rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#9C7215',
                    border: '1px solid rgba(212, 176, 119, 0.5)',
                    boxShadow: '0 4px 14px rgba(40, 25, 15, 0.12)',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                  }}
                >
                  <Sparkles size={11} color="#C4982E" />
                  <span>{p.step}</span>
                </div>

                {/* Top-Right Review Rating Pill */}
                <div
                  style={{
                    position: 'absolute',
                    top: '1.1rem',
                    right: '1.1rem',
                    background: 'rgba(40, 27, 18, 0.88)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    padding: '0.4rem 0.75rem',
                    borderRadius: '20px',
                    color: '#FFFDF9',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    zIndex: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    border: '1px solid rgba(212, 176, 119, 0.3)',
                  }}
                >
                  <Star size={11} color="#E8C86A" fill="#E8C86A" />
                  <span>{p.rating}</span>
                  <span style={{ color: 'rgba(255, 253, 249, 0.65)', fontSize: '0.58rem' }}>({p.reviewCount})</span>
                </div>

                {/* Floating Volume / Quantity Pill on Photo Bottom */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.1rem',
                    right: '1.1rem',
                    background: 'rgba(255, 253, 249, 0.95)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    color: '#281B13',
                    padding: '0.45rem 0.9rem',
                    borderRadius: '20px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    border: '1.5px solid rgba(212, 176, 119, 0.45)',
                    boxShadow: '0 6px 18px rgba(40, 25, 15, 0.16)',
                    zIndex: 3,
                  }}
                >
                  💧 {p.quantity}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.85rem clamp(1.25rem, 2vw, 1.85rem)', display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Title & Price Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem', gap: '1rem' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '2.1rem',
                        fontWeight: 600,
                        color: '#241912',
                        lineHeight: 1.1,
                        margin: 0,
                      }}
                    >
                      {p.name}
                    </h3>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.78rem',
                        fontWeight: 600,
                        color: '#A87C1D',
                        marginTop: '0.25rem',
                        letterSpacing: '0.04em',
                      }}
                    >
                      {p.tagline}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '2.2rem',
                        fontWeight: 700,
                        color: '#241912',
                        lineHeight: 1,
                      }}
                    >
                      ${p.price}
                    </div>
                    <div
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.62rem',
                        color: '#8A7565',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        marginTop: '0.25rem',
                        fontWeight: 600,
                      }}
                    >
                      USD · In Stock
                    </div>
                  </div>
                </div>

                {/* Sensory Feel & Texture Note */}
                <div
                  style={{
                    background: 'linear-gradient(135deg, #FBF6EB 0%, #F5ECDA 100%)',
                    borderRadius: '12px',
                    padding: '0.65rem 0.85rem',
                    margin: '0.85rem 0 1rem 0',
                    border: '1px solid rgba(212, 176, 119, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.2rem',
                  }}
                >
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.64rem', color: '#7E632B', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    ✦ Skin Feel & Goal:
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#443427', lineHeight: 1.4, fontWeight: 500 }}>
                    {p.skinGoal}
                  </div>
                </div>

                {/* Description */}
                <p
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.84rem',
                    lineHeight: 1.65,
                    color: '#5C4A3E',
                    marginBottom: '1.35rem',
                  }}
                >
                  {p.description}
                </p>

                {/* Ingredients Apothecary Badge Grid */}
                <div style={{ marginTop: 'auto', paddingTop: '1.1rem', borderTop: '1px solid rgba(212, 176, 119, 0.28)', marginBottom: '1.6rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.66rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#9C7215',
                      }}
                    >
                      ✦ Key Actives & Ingredients:
                    </span>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', color: '#8A7565', fontStyle: 'italic' }}>
                      {p.ingredients.length} Pure Actives
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {p.ingredients.map((ing, i) => {
                      const isHero = p.heroActives.includes(ing)
                      return (
                        <span
                          key={i}
                          style={{
                            background: isHero
                              ? 'linear-gradient(135deg, #FBF3DF 0%, #F5E5C2 100%)'
                              : 'linear-gradient(135deg, #FAF4EB 0%, #F5ECDD 100%)',
                            border: isHero
                              ? '1px solid rgba(196, 148, 46, 0.55)'
                              : '1px solid rgba(212, 176, 119, 0.32)',
                            borderRadius: '16px',
                            padding: '0.3rem 0.72rem',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.69rem',
                            fontWeight: isHero ? 700 : 500,
                            color: isHero ? '#785310' : '#4A3B2F',
                            boxShadow: isHero ? '0 2px 8px rgba(184, 147, 84, 0.15)' : 'none',
                          }}
                        >
                          {isHero && '✦ '}
                          {ing}
                        </span>
                      )
                    })}
                  </div>
                </div>

                {/* Elevated Luxury Add to Bag CTA */}
                <motion.button
                  whileHover={{ scale: 1.025, backgroundColor: '#4A301D', boxShadow: '0 12px 30px rgba(92, 62, 40, 0.35)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(p)}
                  style={{
                    width: '100%',
                    padding: '1.05rem 1.6rem',
                    background: 'linear-gradient(135deg, #5C3D27 0%, #3B2618 100%)',
                    color: '#FFFDF9',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderRadius: '16px',
                    border: '1px solid rgba(212, 176, 119, 0.4)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    boxShadow: '0 8px 22px rgba(80, 50, 30, 0.25)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  {addedId === p.id ? (
                    <>
                      <Check size={17} color="#8CE85A" />
                      <span>Added to Your Bag!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} color="#E8C86A" />
                      <span>Add to Bag — ${p.price}</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 4: LIQUID GOLD MOMENT ─────────────────
function LiquidGoldMoment() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section
      ref={ref}
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#1A1410',
      }}
    >
      {/* Background silk glitter image */}
      <div style={{ position: 'absolute', inset: 0, opacity: 0.28, mixBlendMode: 'screen' }}>
        <img
          src="/golden-glitter-luxury.png"
          alt="Golden Glitter Liquid Texture"
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(1px)' }}
        />
      </div>

      {/* Animated gradient orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <motion.div
          animate={{ x: ['-10%', '10%', '-10%'], y: ['-10%', '15%', '-10%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '800px',
            height: '800px',
            top: '-200px',
            left: '-200px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(196,164,108,0.2) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <motion.div
          animate={{ x: ['10%', '-10%', '10%'], y: ['10%', '-15%', '10%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            bottom: '-100px',
            right: '-100px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(217,195,160,0.15) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
        {/* Center glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(196,164,108,0.08) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }} />
      </div>

      {/* Horizontal lines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
        {[20, 40, 60, 80].map(top => (
          <div key={top} style={{
            position: 'absolute',
            top: `${top}%`,
            left: 0,
            right: 0,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(196,164,108,0.08), transparent)',
          }} />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ scale, opacity, position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 2rem' }}
      >
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ width: '60px', height: '1px', background: '#C4A46C', margin: '0 auto 2.5rem' }}
        />

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C4A46C',
            marginBottom: '2rem',
          }}
        >
          For those who know
        </motion.p>

        {['YOUR RITUAL.', 'YOUR RADIANCE.', 'YOUR WORLD.'].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '110%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.5rem, 7vw, 8rem)',
                fontWeight: i === 1 ? 700 : 300,
                fontStyle: i === 1 ? 'italic' : 'normal',
                lineHeight: 0.95,
                color: i === 1 ? 'transparent' : '#EAD8B5',
                background: i === 1 ? 'linear-gradient(135deg, #EAD8B5 0%, #C4A46C 50%, #8A6540 100%)' : 'none',
                WebkitBackgroundClip: i === 1 ? 'text' : 'unset',
                backgroundClip: i === 1 ? 'text' : 'unset',
                WebkitTextFillColor: i === 1 ? 'transparent' : undefined,
                letterSpacing: '-0.01em',
              }}
            >
              {line}
            </motion.h2>
          </div>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem',
            lineHeight: 1.9,
            color: 'rgba(217,195,160,0.6)',
            maxWidth: '500px',
            margin: '2.5rem auto 3rem',
          }}
        >
          Designed for the discerning. Crafted for the extraordinary. Welcome to THE BEAUTYWOOD.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <a href="#skincare-kits" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.04, background: 'rgba(196,164,108,0.2)', borderColor: '#C4A46C' }}
              style={{
                padding: '1.1rem 3rem',
                background: 'transparent',
                border: '1px solid rgba(196,164,108,0.4)',
                color: '#EAD8B5',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'all 0.4s ease',
              }}
            >
              <span>Begin Your Ritual</span>
              <ArrowRight size={14} />
            </motion.button>
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

// ─── SECTION 6: BRAND STORY ─────────────────────────
function BrandStory() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { brandStory } = useAdminStore()

  return (
    <section
      ref={ref}
      id="story"
      style={{
        background: '#332B26',
        padding: 'clamp(6rem, 10vw, 10rem) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background texture number */}
      <div style={{
        position: 'absolute',
        top: '-3rem',
        left: '-3rem',
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: 'clamp(10rem, 25vw, 28rem)',
        fontWeight: 700,
        color: 'rgba(196,164,108,0.04)',
        lineHeight: 1,
        userSelect: 'none',
        pointerEvents: 'none',
      }}>
        BW
      </div>

      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 2 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', alignItems: 'center' }}>
          {/* Left — image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{ height: '600px', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=900&q=80"
                alt="THE BEAUTYWOOD story"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
              />
            </div>
            {/* Gold frame accent */}
            <div style={{
              position: 'absolute',
              top: '-1.5rem',
              left: '-1.5rem',
              right: '2rem',
              bottom: '2rem',
              border: '1px solid rgba(196,164,108,0.2)',
              pointerEvents: 'none',
              zIndex: -1,
            }} />
          </motion.div>

          {/* Right — text */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div style={{ width: '40px', height: '1px', background: '#C4A46C', marginBottom: '2rem' }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C4A46C', display: 'block', marginBottom: '2rem' }}>
              {brandStory.eyebrow}
            </span>

            <h2 style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(2rem, 4vw, 4rem)',
              fontWeight: 300,
              color: '#EAD8B5',
              lineHeight: 1.1,
              marginBottom: '2.5rem',
            }}>
              {brandStory.heading}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', lineHeight: 1.9, color: 'rgba(217,195,160,0.7)' }}>
                {brandStory.paragraph1}
              </p>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', lineHeight: 1.9, color: 'rgba(217,195,160,0.7)' }}>
                {brandStory.paragraph2}
              </p>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem', paddingTop: '2rem', borderTop: '1px solid rgba(196,164,108,0.15)' }}>
              {brandStory.stats.map((stat, i) => (
                <div key={i}>
                  <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '2.5rem', fontWeight: 300, color: '#C4A46C', lineHeight: 1 }}>
                    {stat.number}
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(217,195,160,0.5)', marginTop: '0.4rem' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <a href="#products" style={{ textDecoration: 'none' }}>
              <button style={{
                padding: '1rem 2.5rem',
                background: '#C4A46C',
                color: '#332B26',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.68rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
              }}>
                <span>Explore the Edit</span>
                <ArrowRight size={14} />
              </button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── SECTION 7: GRAND FINALE ────────────────────────
function GrandFinale() {
  return (
    <>
      {/* Campaign CTA */}
      <section style={{
        position: 'relative',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#1A1410',
      }}>
        <motion.div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1562504208-03d85cc8c23e?w=1800&q=85"
            alt="Final campaign"
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.35)' }}
          />
        </motion.div>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(26,20,16,0.3) 0%, rgba(196,164,108,0.06) 50%, rgba(26,20,16,0.5) 100%)',
        }} />

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 5, textAlign: 'center', padding: '0 2rem' }}
        >
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#C4A46C', marginBottom: '2rem' }}>
            Limited Edition
          </p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(3rem, 8vw, 9rem)',
            fontWeight: 300,
            color: '#EAD8B5',
            lineHeight: 0.9,
            marginBottom: '2.5rem',
            letterSpacing: '-0.01em',
          }}>
            The Golden<br /><em>Edit.</em>
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: 'rgba(217,195,160,0.6)', marginBottom: '3rem', maxWidth: '420px', margin: '0 auto 3rem', lineHeight: 1.8 }}>
            Our most coveted products, curated into one extraordinary collection.
          </p>
          <a href="#skincare-kits" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.04, background: '#D9C3A0' }}
              style={{
                padding: '1.1rem 3.5rem',
                background: '#C4A46C',
                color: '#332B26',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.7rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                fontWeight: 600,
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1rem',
                transition: 'background 0.3s ease',
              }}
            >
              <span>Shop the Edit</span>
              <ArrowRight size={14} />
            </motion.button>
          </a>
        </motion.div>
      </section>

      {/* Newsletter */}
      <NewsletterSection />

      <Footer />
    </>
  )
}

function NewsletterSection() {
  return (
    <section style={{ background: '#F5F0E7', padding: '5rem 2rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ width: '40px', height: '1px', background: '#C4A46C', margin: '0 auto 2rem' }} />
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C4A46C', display: 'block', marginBottom: '1rem' }}>
          Join the world
        </span>
        <h2 style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(2rem, 4vw, 3.5rem)',
          fontWeight: 300,
          color: '#332B26',
          marginBottom: '1rem',
          lineHeight: 1.1,
        }}>
          Beauty, delivered to your door.
        </h2>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', lineHeight: 1.8, color: '#8A7168', marginBottom: '2.5rem' }}>
          Subscribe for early access to new launches, exclusive rituals, and beauty intelligence.
        </p>
        <form
          onSubmit={e => { e.preventDefault(); alert('Thank you for subscribing to THE BEAUTYWOOD.') }}
          style={{ display: 'flex', gap: '0', maxWidth: '480px', margin: '0 auto' }}
        >
          <input
            type="email"
            required
            placeholder="Your email address"
            style={{
              flex: 1,
              padding: '1rem 1.25rem',
              border: '1px solid rgba(196,164,108,0.4)',
              borderRight: 'none',
              background: '#FFFDF9',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem',
              color: '#332B26',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '1rem 1.75rem',
              background: '#332B26',
              color: '#EAD8B5',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              border: '1px solid #332B26',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'background 0.3s ease',
            }}
          >
            Subscribe
          </button>
        </form>
        <p style={{ marginTop: '1rem', fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', color: 'rgba(138,113,104,0.6)', letterSpacing: '0.08em' }}>
          No spam. Unsubscribe at any time. Your privacy is sacred.
        </p>
      </div>
    </section>
  )
}

// ─── HOME PAGE ──────────────────────────────────────
export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <HeroSection />
      <MarqueeBar />
      <SkincareKitsSection />
      <EditorialBreak />
      <ProductGallery />
      <LiquidGoldMoment />
      <BrandStory />
      <GrandFinale />
    </motion.div>
  )
}
