import { useState } from 'react'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import type { Product } from '../data/products'

interface Props {
  product: Product
  size?: 'normal' | 'large' | 'compact'
  style?: React.CSSProperties
  onQuickView?: (product: Product) => void
}

export default function ProductCard({ product, size = 'normal', style, onQuickView }: Props) {
  const [hovered, setHovered] = useState(false)
  const [added, setAdded] = useState(false)
  const { addItem } = useCartStore()

  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      variant: product.variants?.[0]?.value,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const imgHeight = size === 'large' ? '520px' : size === 'compact' ? '280px' : '380px'

  return (
    <motion.div
      className="product-card"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => onQuickView ? onQuickView(product) : handleAddToCart()}
      style={{
        position: 'relative',
        cursor: 'pointer',
        ...style,
      }}
    >
      <div>
        {/* Image */}
        <div
          className="product-card-img-wrap"
          style={{ height: imgHeight, background: '#F5F0E7', position: 'relative', overflow: 'hidden' }}
        >
          <img
            src={hovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'all 0.8s cubic-bezier(0.65,0,0.35,1)',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />

          {/* Badge */}
          {product.badge && (
            <div style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              background: 'rgba(255,253,249,0.92)',
              backdropFilter: 'blur(8px)',
              padding: '0.3rem 0.75rem',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.55rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#C4A46C',
            }}>
              {product.badge}
            </div>
          )}

          {/* Hover overlay */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(51,43,38,0.12)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              padding: '1.5rem',
              gap: '0.75rem',
            }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              style={{
                flex: 1,
                padding: '0.875rem',
                background: added ? '#C4A46C' : '#332B26',
                color: '#FFFDF9',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background 0.3s ease',
              }}
            >
              <ShoppingBag size={12} />
              <span>{added ? 'Added!' : 'Quick Add to Bag'}</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Info */}
        <div style={{ padding: '1.25rem 0 0' }}>
          {product.category && (
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.58rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#C4A46C',
              marginBottom: '0.4rem',
            }}>
              {product.category.replace('-', ' ')}
            </p>
          )}
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: size === 'large' ? '1.4rem' : '1.1rem',
            fontWeight: 400,
            color: '#332B26',
            marginBottom: '0.35rem',
            letterSpacing: '0.02em',
          }}>
            {product.name}
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem',
            color: '#8A7168',
            fontStyle: 'italic',
            marginBottom: '0.75rem',
          }}>
            {product.tagline}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.1rem',
              fontWeight: 500,
              color: '#332B26',
            }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8rem',
                color: '#8A7168',
                textDecoration: 'line-through',
              }}>
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
