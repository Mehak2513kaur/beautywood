import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2, CheckCircle, Sparkles } from 'lucide-react'
import { useCartStore } from '../store/cartStore'

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total, clearCart } = useCartStore()
  const [checkedOut, setCheckedOut] = useState(false)
  const cartTotal = total()

  const handleCheckout = () => {
    setCheckedOut(true)
    setTimeout(() => {
      clearCart()
    }, 1500)
  }

  const handleClose = () => {
    setCheckedOut(false)
    closeCart()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(51,43,38,0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 200,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(460px, 100vw)',
              background: '#FFFDF9',
              zIndex: 201,
              display: 'flex',
              flexDirection: 'column',
              borderLeft: '1px solid rgba(196,164,108,0.2)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.5rem 2rem',
              borderBottom: '1px solid rgba(196,164,108,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div>
                <span style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.5rem',
                  fontWeight: 400,
                  color: '#332B26',
                }}>
                  Your Cart
                </span>
                <span style={{
                  marginLeft: '0.75rem',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  color: '#8A7168',
                  textTransform: 'uppercase',
                }}>
                  {items.length} {items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button onClick={handleClose} style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0, padding: '4px' }}>
                <X size={20} color="#332B26" />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '0' }}>
              {items.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    gap: '1.5rem',
                    padding: '3rem 2rem',
                    textAlign: 'center',
                  }}
                >
                  <ShoppingBag size={40} color="#D9C3A0" strokeWidth={1} />
                  <div>
                    <p style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.4rem', color: '#332B26', marginBottom: '0.5rem' }}>
                      Your cart awaits
                    </p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#8A7168', lineHeight: 1.6 }}>
                      Discover something extraordinary.
                    </p>
                  </div>
                  <button onClick={closeCart} className="btn-primary">
                    <span>Explore Collection</span>
                    <ArrowRight size={14} />
                  </button>
                </motion.div>
              ) : (
                <div>
                  {items.map((item, i) => (
                    <motion.div
                      key={`${item.id}-${item.variant}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: i * 0.05 }}
                      style={{
                        display: 'flex',
                        gap: '1.25rem',
                        padding: '1.5rem 2rem',
                        borderBottom: '1px solid rgba(196,164,108,0.12)',
                      }}
                    >
                      {/* Image */}
                      <div style={{
                        width: '90px',
                        height: '110px',
                        flexShrink: 0,
                        overflow: 'hidden',
                        background: '#F5F0E7',
                      }}>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      </div>

                      {/* Details */}
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                          <p style={{
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            fontSize: '1rem',
                            fontWeight: 500,
                            color: '#332B26',
                            marginBottom: '0.25rem',
                          }}>
                            {item.name}
                          </p>
                          {item.variant && item.variant !== 'default' && (
                            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#8A7168', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                              {item.variant}
                            </p>
                          )}
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {/* Quantity */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid rgba(196,164,108,0.3)', padding: '0.3rem 0.6rem' }}>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0, color: '#332B26' }}
                            >
                              <Minus size={12} />
                            </button>
                            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', minWidth: '16px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0, color: '#332B26' }}
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.1rem', fontWeight: 500 }}>
                              ${(item.price * item.quantity).toFixed(0)}
                            </span>
                            <button
                              onClick={() => removeItem(item.id, item.variant)}
                              style={{ background: 'none', border: 'none', cursor: 'pointer', lineHeight: 0, color: '#8A7168', opacity: 0.6 }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div style={{
                padding: '1.5rem 2rem',
                borderTop: '1px solid rgba(196,164,108,0.2)',
                background: '#FFFDF9',
              }}>
                {/* Subtotal */}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8A7168' }}>
                    Subtotal
                  </span>
                  <span style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.4rem', fontWeight: 500, color: '#332B26' }}>
                    ${cartTotal.toFixed(0)}
                  </span>
                </div>

                {/* Complimentary shipping notice */}
                {cartTotal < 200 && (
                  <div style={{
                    padding: '0.75rem 1rem',
                    background: 'rgba(196,164,108,0.08)',
                    border: '1px solid rgba(196,164,108,0.2)',
                    marginBottom: '1rem',
                    textAlign: 'center',
                  }}>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#8A7168', letterSpacing: '0.08em' }}>
                      Add ${(200 - cartTotal).toFixed(0)} more for complimentary shipping
                    </p>
                  </div>
                )}

                {checkedOut ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{
                      padding: '2rem 1.5rem',
                      background: 'rgba(196,164,108,0.1)',
                      border: '1px solid #C4A46C',
                      borderRadius: '8px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', borderRadius: '50%', background: '#C4A46C', color: '#FFFDF9', marginBottom: '1rem' }}>
                      <Sparkles size={24} />
                    </div>
                    <h4 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: '1.4rem', color: '#332B26', marginBottom: '0.5rem' }}>
                      Order Placed with Distinction
                    </h4>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#7A6B63', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                      Thank you for choosing THE BEAUTYWOOD. Your ritual is being packaged with complimentary 24K gold foil wrapping and deluxe sample elixirs.
                    </p>
                    <button
                      onClick={handleClose}
                      style={{
                        padding: '0.85rem 1.5rem',
                        background: '#332B26',
                        color: '#FFFDF9',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.65rem',
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '30px',
                      }}
                    >
                      Continue Exploring
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={handleCheckout}
                      style={{
                        width: '100%',
                        padding: '1.1rem',
                        background: '#332B26',
                        color: '#FFFDF9',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.7rem',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.75rem',
                      }}
                    >
                      <span>Proceed to Checkout</span>
                      <ArrowRight size={14} />
                    </motion.button>

                    <p style={{
                      marginTop: '0.75rem',
                      textAlign: 'center',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '0.6rem',
                      color: '#8A7168',
                      letterSpacing: '0.08em',
                    }}>
                      Secure checkout — SSL encrypted
                    </p>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
