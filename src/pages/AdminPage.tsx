import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Package,
  Sparkles,
  ShoppingBag,
  Layers,
  FileText,
  Settings,
  ArrowUpRight,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  Image as ImageIcon,
  DollarSign,
  Droplet,
  Tag,
  Eye,
  Edit3,
  ExternalLink,
} from 'lucide-react'
import {
  useAdminStore,
  type AdminProduct,
  defaultProducts,
  defaultKit,
  defaultSandook,
  defaultHero,
  defaultMarquee,
  defaultBrandStory,
} from '../store/adminStore'

type TabKey = 'products' | 'kit' | 'sandook' | 'hero' | 'story' | 'settings'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('products')
  const [toast, setToast] = useState<string | null>(null)
  const [selectedProductId, setSelectedProductId] = useState<string>('p-cleanser')
  const [showNewProductModal, setShowNewProductModal] = useState(false)

  const {
    products,
    kit,
    sandook,
    hero,
    marquee,
    brandStory,
    siteSettings,
    updateProduct,
    addProduct,
    deleteProduct,
    updateKit,
    updateSandook,
    updateHero,
    updateMarquee,
    updateBrandStory,
    updateSiteSettings,
    resetToDefaults,
  } = useAdminStore()

  const showSavedToast = (msg: string = 'Changes saved to live storefront!') => {
    setToast(msg)
    setTimeout(() => setToast(null), 2400)
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to restore all storefront data to factory defaults? Any custom edits will be reset.')) {
      resetToDefaults()
      showSavedToast('Storefront reset to artisanal defaults.')
    }
  }

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0]

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FAF7F2',
        color: '#2C221A',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -20, x: '-50%' }}
            style={{
              position: 'fixed',
              top: '1.5rem',
              left: '50%',
              zIndex: 9999,
              background: 'linear-gradient(135deg, #2C221A 0%, #1A130D 100%)',
              color: '#F5E6C4',
              fontWeight: 700,
              fontSize: '0.86rem',
              padding: '0.75rem 1.6rem',
              borderRadius: '30px',
              boxShadow: '0 12px 35px rgba(196, 154, 70, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <Check size={18} strokeWidth={3} />
            <span>{toast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Navigation Bar */}
      <header
        style={{
          borderBottom: '1px solid rgba(196, 154, 70, 0.22)',
          background: 'rgba(255, 255, 255, 0.95)', boxShadow: '0 2px 14px rgba(44, 34, 26, 0.04)',
          backdropFilter: 'blur(16px)',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          padding: '0.9rem clamp(1.2rem, 3vw, 2.5rem)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div>
            <div
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.5rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                color: '#2C221A',
                lineHeight: 1,
              }}
            >
              THE BEAUTYWOOD
            </div>
            <div
              style={{
                fontSize: '0.65rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#8A6818',
                marginTop: '0.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#48BB78', display: 'inline-block' }} />
              Admin Portal · Real-Time Store Sync Active
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={handleReset}
            style={{
              background: '#FFFFFF',
              border: '1px solid rgba(196, 154, 70, 0.35)',
              color: '#7A5B18',
              padding: '0.55rem 1rem',
              borderRadius: '10px',
              fontSize: '0.74rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              transition: 'all 0.2s ease',
            }}
            title="Restore default copy & products"
          >
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>

          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: 'none',
              background: 'linear-gradient(135deg, #C4982E 0%, #A87C1D 100%)',
              color: '#FFFFFF',
              padding: '0.55rem 1.2rem',
              borderRadius: '10px',
              fontSize: '0.76rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: '0 4px 16px rgba(168, 124, 29, 0.25)',
            }}
          >
            <span>View Live Customer Store</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </header>

      {/* Main Content Layout */}
      <div className="admin-layout" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar Tabs */}
        <aside
          className="admin-sidebar"
          style={{
            width: '260px',
            borderRight: '1px solid rgba(196, 154, 70, 0.2)',
            background: '#F4EFE6',
            padding: '1.4rem 0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            flexShrink: 0,
          }}
        >
          <div
            className="admin-sidebar-header"
            style={{
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#8A6D3B',
              padding: '0 0.75rem 0.5rem',
            }}
          >
            Storefront Modules
          </div>

          {[
            { key: 'products', label: 'Individual Products', icon: Package, count: products.length },
            { key: 'kit', label: 'Skincare Kit', icon: ShoppingBag, count: '1 Kit' },
            { key: 'sandook', label: 'The Sandook Legacy', icon: Layers },
            { key: 'hero', label: 'Hero & Marquee', icon: Sparkles },
            { key: 'story', label: 'Brand Story & Stats', icon: FileText },
            { key: 'settings', label: 'Store Settings', icon: Settings },
          ].map((item) => {
            const Icon = item.icon
            const isCurrent = activeTab === item.key
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key as TabKey)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.9rem',
                  borderRadius: '10px',
                  border: isCurrent ? '1px solid #C4982E' : '1px solid transparent',
                  background: isCurrent
                    ? 'linear-gradient(135deg, rgba(196, 154, 70, 0.18) 0%, rgba(196, 154, 70, 0.08) 100%)'
                    : 'transparent',
                  color: isCurrent ? '#2C221A' : '#635342',
                  fontSize: '0.82rem',
                  fontWeight: isCurrent ? 700 : 500,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                  <Icon size={16} color={isCurrent ? '#B88820' : '#8C7A67'} />
                  <span>{item.label}</span>
                </div>
                {item.count && (
                  <span
                    style={{
                      fontSize: '0.62rem',
                      padding: '0.15rem 0.45rem',
                      borderRadius: '10px',
                      background: isCurrent ? '#C4982E' : 'rgba(196, 154, 70, 0.14)',
                      color: isCurrent ? '#FFFFFF' : '#7A6230',
                      fontWeight: 600,
                    }}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            )
          })}

          <div className="admin-sidebar-tip" style={{ marginTop: 'auto', padding: '1rem 0.75rem', borderTop: '1px solid rgba(196, 154, 70, 0.2)' }}>
            <div style={{ fontSize: '0.7rem', color: '#7A6230', lineHeight: 1.4, background: '#FFFFFF', padding: '0.65rem 0.75rem', borderRadius: '10px', border: '1px solid rgba(196, 154, 70, 0.22)' }}>
              💡 All modifications automatically update the live store and persist across reloads.
            </div>
          </div>
        </aside>

        {/* Tab Body */}
        <main style={{ flex: 1, padding: 'clamp(1.5rem, 3vw, 2.5rem)', overflowY: 'auto', maxHeight: 'calc(100vh - 65px)' }}>
          {/* TAB 1: INDIVIDUAL PRODUCTS */}
          {activeTab === 'products' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.8rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', margin: 0, color: '#2C221A' }}>
                    Individual Product Formulas
                  </h1>
                  <p style={{ margin: '0.3rem 0 0', color: '#6E5D4B', fontSize: '0.84rem' }}>
                    Control names, quantities, pricing, descriptions, images, and apothecary ingredient actives.
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => {
                      const newId = `p-custom-${Date.now()}`
                      addProduct({
                        id: newId,
                        slug: `custom-formula-${Date.now()}`,
                        roman: 'IV',
                        step: 'ADDITIONAL FORMULA',
                        name: 'New Botanical Formula',
                        tagline: 'Artisanal Botanical Elixir',
                        quantity: '50 ml · 1.7 fl oz',
                        price: 65,
                        originalPrice: 75,
                        rating: '5.0',
                        reviewCount: '1',
                        texture: 'Velvety botanical serum',
                        skinGoal: 'Hydration & radiance',
                        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80',
                        description: 'A pure botanical treatment crafted with research-backed botanicals.',
                        ingredients: ['Saffron', 'Rosehip', 'Vitamin C'],
                        heroActives: ['Saffron', 'Rosehip'],
                        inStock: true,
                      })
                      setSelectedProductId(newId)
                      showSavedToast('New product created!')
                    }}
                    style={{
                      background: 'rgba(196, 154, 70, 0.15)',
                      border: '1px solid rgba(196, 154, 70, 0.45)',
                      color: '#8C6718',
                      padding: '0.6rem 1rem',
                      borderRadius: '10px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                    }}
                  >
                    <Plus size={15} />
                    <span>Add New Product</span>
                  </button>
                </div>
              </div>

              {/* Horizontal Product Selector Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                {products.map((p) => {
                  const isSelected = p.id === selectedProductId
                  return (
                    <div
                      key={p.id}
                      onClick={() => setSelectedProductId(p.id)}
                      style={{
                        background: isSelected ? '#FFFBF2' : '#FFFFFF',
                        border: isSelected ? '2px solid #C4982E' : '1px solid rgba(196, 154, 70, 0.24)',
                        boxShadow: isSelected ? '0 6px 20px rgba(196, 154, 70, 0.16)' : '0 2px 8px rgba(44, 34, 26, 0.04)',
                        borderRadius: '14px',
                        padding: '1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '0.85rem',
                        alignItems: 'center',
                        position: 'relative',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: '54px',
                          height: '54px',
                          borderRadius: '10px',
                          objectFit: 'cover',
                          border: '1px solid rgba(196, 154, 70, 0.24)',
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ fontSize: '0.62rem', color: '#C49A38', fontWeight: 700, letterSpacing: '0.08em' }}>
                          {p.step}
                        </div>
                        <div style={{ fontSize: '0.94rem', fontWeight: 700, color: '#2C221A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6E5D4B', marginTop: '0.15rem' }}>
                          ${p.price} · {p.quantity}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Product Edit Form for Selected Product */}
              {selectedProduct && (
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid rgba(196, 154, 70, 0.26)',
                    borderRadius: '20px',
                    padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                    boxShadow: '0 10px 30px rgba(44, 34, 26, 0.05)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid rgba(196, 154, 70, 0.15)', paddingBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '1.2rem', fontFamily: 'Cormorant Garamond, serif', color: '#8C6718', fontWeight: 700 }}>
                        Editing: {selectedProduct.name}
                      </span>
                      <span
                        style={{
                          fontSize: '0.65rem',
                          background: selectedProduct.inStock ? '#E6F4EA' : '#FCE8E6',
                          color: selectedProduct.inStock ? '#137333' : '#C5221F',
                          border: `1px solid ${selectedProduct.inStock ? 'rgba(52, 168, 83, 0.35)' : 'rgba(234, 67, 53, 0.35)'}`,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '12px',
                          fontWeight: 700,
                        }}
                      >
                        {selectedProduct.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    {products.length > 1 && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${selectedProduct.name}?`)) {
                            deleteProduct(selectedProduct.id)
                            setSelectedProductId(products[0].id)
                            showSavedToast('Product deleted')
                          }
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#E53E3E',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          fontSize: '0.74rem',
                        }}
                      >
                        <Trash2 size={14} />
                        <span>Delete Formula</span>
                      </button>
                    )}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem' }}>
                    {/* Name */}
                    <div>
                      <label style={labelStyle}>Product Title / Name</label>
                      <input
                        type="text"
                        value={selectedProduct.name}
                        onChange={(e) => {
                          updateProduct(selectedProduct.id, { name: e.target.value })
                          showSavedToast()
                        }}
                        style={inputStyle}
                      />
                    </div>

                    {/* Tagline */}
                    <div>
                      <label style={labelStyle}>Tagline / Subheading</label>
                      <input
                        type="text"
                        value={selectedProduct.tagline}
                        onChange={(e) => {
                          updateProduct(selectedProduct.id, { tagline: e.target.value })
                          showSavedToast()
                        }}
                        style={inputStyle}
                      />
                    </div>

                    {/* Price */}
                    <div>
                      <label style={labelStyle}>Price ($ USD)</label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '11px', color: '#C49A38', fontWeight: 700 }}>$</span>
                        <input
                          type="number"
                          value={selectedProduct.price}
                          onChange={(e) => {
                            updateProduct(selectedProduct.id, { price: Number(e.target.value) })
                            showSavedToast()
                          }}
                          style={{ ...inputStyle, paddingLeft: '28px' }}
                        />
                      </div>
                    </div>

                    {/* Quantity / Volume */}
                    <div>
                      <label style={labelStyle}>Volume / Quantity (e.g. 120 ml · 4.0 fl oz)</label>
                      <input
                        type="text"
                        value={selectedProduct.quantity}
                        onChange={(e) => {
                          updateProduct(selectedProduct.id, { quantity: e.target.value })
                          showSavedToast()
                        }}
                        style={inputStyle}
                        placeholder="120 ml · 4.0 fl oz"
                      />
                    </div>

                    {/* Step label */}
                    <div>
                      <label style={labelStyle}>Step Label (Eyebrow)</label>
                      <input
                        type="text"
                        value={selectedProduct.step}
                        onChange={(e) => {
                          updateProduct(selectedProduct.id, { step: e.target.value })
                          showSavedToast()
                        }}
                        style={inputStyle}
                        placeholder="STEP 01 · PURIFY"
                      />
                    </div>

                    {/* Rating & Reviews */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                      <div>
                        <label style={labelStyle}>Rating (e.g. 4.9)</label>
                        <input
                          type="text"
                          value={selectedProduct.rating}
                          onChange={(e) => {
                            updateProduct(selectedProduct.id, { rating: e.target.value })
                            showSavedToast()
                          }}
                          style={inputStyle}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>Reviews Count</label>
                        <input
                          type="text"
                          value={selectedProduct.reviewCount}
                          onChange={(e) => {
                            updateProduct(selectedProduct.id, { reviewCount: e.target.value })
                            showSavedToast()
                          }}
                          style={inputStyle}
                        />
                      </div>
                    </div>

                    {/* Texture Feel */}
                    <div>
                      <label style={labelStyle}>Texture & Sensation</label>
                      <input
                        type="text"
                        value={selectedProduct.texture}
                        onChange={(e) => {
                          updateProduct(selectedProduct.id, { texture: e.target.value })
                          showSavedToast()
                        }}
                        style={inputStyle}
                      />
                    </div>

                    {/* Skin Goal */}
                    <div>
                      <label style={labelStyle}>Clinical Skin Goal</label>
                      <input
                        type="text"
                        value={selectedProduct.skinGoal}
                        onChange={(e) => {
                          updateProduct(selectedProduct.id, { skinGoal: e.target.value })
                          showSavedToast()
                        }}
                        style={inputStyle}
                      />
                    </div>
                  </div>

                  {/* Image URL & Live Preview */}
                  <div style={{ marginTop: '1.4rem' }}>
                    <label style={labelStyle}>Product Image URL</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                      <input
                        type="text"
                        value={selectedProduct.image}
                        onChange={(e) => {
                          updateProduct(selectedProduct.id, { image: e.target.value })
                          showSavedToast()
                        }}
                        style={{ ...inputStyle, flex: 1, minWidth: '260px' }}
                        placeholder="https://... or /kits/..."
                      />
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <img
                          src={selectedProduct.image}
                          alt="Preview"
                          style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '10px',
                            objectFit: 'cover',
                            border: '1.5px solid #C49A38',
                          }}
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src =
                              '/kits/face-cleanser.jpg'
                          }}
                        />
                        <span style={{ fontSize: '0.7rem', color: '#6E5D4B' }}>Live Preview</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ marginTop: '1.4rem' }}>
                    <label style={labelStyle}>Description & Narrative</label>
                    <textarea
                      rows={3}
                      value={selectedProduct.description}
                      onChange={(e) => {
                        updateProduct(selectedProduct.id, { description: e.target.value })
                        showSavedToast()
                      }}
                      style={{ ...inputStyle, resize: 'vertical' }}
                    />
                  </div>

                  {/* Ingredients List (Comma separated) */}
                  <div style={{ marginTop: '1.4rem' }}>
                    <label style={labelStyle}>
                      Ingredients & Actives (Comma-separated)
                    </label>
                    <input
                      type="text"
                      value={selectedProduct.ingredients.join(', ')}
                      onChange={(e) => {
                        const list = e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        updateProduct(selectedProduct.id, { ingredients: list })
                        showSavedToast()
                      }}
                      style={inputStyle}
                      placeholder="Glycolic Acid, Vitamin C, Tulsi Extract..."
                    />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.65rem' }}>
                      {selectedProduct.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          style={{
                            background: 'rgba(196, 154, 70, 0.12)',
                            border: '1px solid rgba(196, 154, 70, 0.35)',
                            color: '#8C6718',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '12px',
                            fontSize: '0.68rem',
                          }}
                        >
                          ✦ {ing}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* In Stock Switch */}
                  <div style={{ marginTop: '1.4rem', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.84rem' }}>
                      <input
                        type="checkbox"
                        checked={selectedProduct.inStock}
                        onChange={(e) => {
                          updateProduct(selectedProduct.id, { inStock: e.target.checked })
                          showSavedToast()
                        }}
                        style={{ width: '18px', height: '18px', accentColor: '#C49A38' }}
                      />
                      <span>Item is actively In-Stock and purchasable</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SKINCARE KIT */}
          {activeTab === 'kit' && (
            <div>
              <div style={{ marginBottom: '1.8rem' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', margin: 0, color: '#2C221A' }}>
                  The Signature Skincare Kit
                </h1>
                <p style={{ margin: '0.3rem 0 0', color: '#6E5D4B', fontSize: '0.84rem' }}>
                  Manage the featured 3-piece complete ritual sold on the homepage and kit detail page.
                </p>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(196, 154, 70, 0.26)',
                  borderRadius: '20px',
                  padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  boxShadow: '0 10px 30px rgba(44, 34, 26, 0.05)',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem' }}>
                  <div>
                    <label style={labelStyle}>Kit Title</label>
                    <input
                      type="text"
                      value={kit.name}
                      onChange={(e) => {
                        updateKit({ name: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Tagline / Eyebrow</label>
                    <input
                      type="text"
                      value={kit.tagline}
                      onChange={(e) => {
                        updateKit({ tagline: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Kit Bundle Price ($ USD)</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '11px', color: '#C49A38', fontWeight: 700 }}>$</span>
                      <input
                        type="number"
                        value={kit.price}
                        onChange={(e) => {
                          updateKit({ price: Number(e.target.value) })
                          showSavedToast()
                        }}
                        style={{ ...inputStyle, paddingLeft: '28px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Original Value ($ USD)</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '11px', color: '#C49A38', fontWeight: 700 }}>$</span>
                      <input
                        type="number"
                        value={kit.originalPrice}
                        onChange={(e) => {
                          updateKit({ originalPrice: Number(e.target.value) })
                          showSavedToast()
                        }}
                        style={{ ...inputStyle, paddingLeft: '28px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Savings Value ($ USD)</label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '11px', color: '#C49A38', fontWeight: 700 }}>$</span>
                      <input
                        type="number"
                        value={kit.savings}
                        onChange={(e) => {
                          updateKit({ savings: Number(e.target.value) })
                          showSavedToast()
                        }}
                        style={{ ...inputStyle, paddingLeft: '28px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Badge Pill Text</label>
                    <input
                      type="text"
                      value={kit.badge}
                      onChange={(e) => {
                        updateKit({ badge: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                      placeholder="SAVE $62 (3-PIECE SET)"
                    />
                  </div>
                </div>

                <div style={{ marginTop: '1.4rem' }}>
                  <label style={labelStyle}>Subtitle / Component Line</label>
                  <input
                    type="text"
                    value={kit.subtitle}
                    onChange={(e) => {
                      updateKit({ subtitle: e.target.value })
                      showSavedToast()
                    }}
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginTop: '1.4rem' }}>
                  <label style={labelStyle}>Kit Hero Image URL</label>
                  <input
                    type="text"
                    value={kit.image}
                    onChange={(e) => {
                      updateKit({ image: e.target.value })
                      showSavedToast()
                    }}
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginTop: '1.4rem' }}>
                  <label style={labelStyle}>Kit Description</label>
                  <textarea
                    rows={4}
                    value={kit.description}
                    onChange={(e) => {
                      updateKit({ description: e.target.value })
                      showSavedToast()
                    }}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <div style={{ marginTop: '1.4rem' }}>
                  <label style={labelStyle}>Key Actives Highlight (One per line)</label>
                  <textarea
                    rows={4}
                    value={kit.keyActives.join('\n')}
                    onChange={(e) => {
                      const lines = e.target.value.split('\n').filter(Boolean)
                      updateKit({ keyActives: lines })
                      showSavedToast()
                    }}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: THE SANDOOK */}
          {activeTab === 'sandook' && (
            <div>
              <div style={{ marginBottom: '1.8rem' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', margin: 0, color: '#2C221A' }}>
                  The Heirloom Sandook Section
                </h1>
                <p style={{ margin: '0.3rem 0 0', color: '#6E5D4B', fontSize: '0.84rem' }}>
                  Customize the narrative, watermark, showcase photography, badges, and 3 artisanal thumbnail cards.
                </p>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(196, 154, 70, 0.24)',
                  borderRadius: '20px',
                  padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  boxShadow: '0 10px 30px rgba(44, 34, 26, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.6rem',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem' }}>
                  <div>
                    <label style={labelStyle}>Eyebrow Title</label>
                    <input
                      type="text"
                      value={sandook.eyebrow}
                      onChange={(e) => {
                        updateSandook({ eyebrow: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Watermark Word (Under Photo)</label>
                    <input
                      type="text"
                      value={sandook.watermarkText}
                      onChange={(e) => {
                        updateSandook({ watermarkText: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Heading Line 1</label>
                    <input
                      type="text"
                      value={sandook.titleLine1}
                      onChange={(e) => {
                        updateSandook({ titleLine1: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Heading Line 2 (Italic Flourish)</label>
                    <input
                      type="text"
                      value={sandook.titleLine2}
                      onChange={(e) => {
                        updateSandook({ titleLine2: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Sandook Story Narrative</label>
                  <textarea
                    rows={4}
                    value={sandook.storyNarrative}
                    onChange={(e) => {
                      updateSandook({ storyNarrative: e.target.value })
                      showSavedToast()
                    }}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.4rem' }}>
                  <div>
                    <label style={labelStyle}>Hero Main Photo Path / URL</label>
                    <input
                      type="text"
                      value={sandook.heroMainImage}
                      onChange={(e) => {
                        updateSandook({ heroMainImage: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Hero Floating Memories Photo Path / URL</label>
                    <input
                      type="text"
                      value={sandook.heroMemoriesImage}
                      onChange={(e) => {
                        updateSandook({ heroMemoriesImage: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>
                </div>

                {/* 3 Artisanal Thumbnail Cards */}
                <div>
                  <h3 style={{ fontSize: '1rem', color: '#8C6718', margin: '1rem 0 0.8rem', fontFamily: 'Cormorant Garamond, serif' }}>
                    3 Sandook Feature Showcase Cards
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
                    {sandook.thumbnails.map((thumb, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: '#FAF6EE',
                          border: '1px solid rgba(196, 154, 70, 0.22)',
                          borderRadius: '12px',
                          padding: '1rem',
                        }}
                      >
                        <div style={{ fontSize: '0.68rem', color: '#C49A38', fontWeight: 700, marginBottom: '0.4rem' }}>
                          CARD {idx + 1}
                        </div>
                        <div style={{ marginBottom: '0.6rem' }}>
                          <label style={{ ...labelStyle, fontSize: '0.66rem' }}>Card Title</label>
                          <input
                            type="text"
                            value={thumb.title}
                            onChange={(e) => {
                              const updated = [...sandook.thumbnails]
                              updated[idx] = { ...updated[idx], title: e.target.value }
                              updateSandook({ thumbnails: updated })
                              showSavedToast()
                            }}
                            style={{ ...inputStyle, padding: '0.5rem 0.75rem', fontSize: '0.78rem' }}
                          />
                        </div>
                        <div style={{ marginBottom: '0.6rem' }}>
                          <label style={{ ...labelStyle, fontSize: '0.66rem' }}>Description</label>
                          <textarea
                            rows={2}
                            value={thumb.desc}
                            onChange={(e) => {
                              const updated = [...sandook.thumbnails]
                              updated[idx] = { ...updated[idx], desc: e.target.value }
                              updateSandook({ thumbnails: updated })
                              showSavedToast()
                            }}
                            style={{ ...inputStyle, padding: '0.5rem 0.75rem', fontSize: '0.76rem', resize: 'vertical' }}
                          />
                        </div>
                        <div>
                          <label style={{ ...labelStyle, fontSize: '0.66rem' }}>Image Path / URL</label>
                          <input
                            type="text"
                            value={thumb.image}
                            onChange={(e) => {
                              const updated = [...sandook.thumbnails]
                              updated[idx] = { ...updated[idx], image: e.target.value }
                              updateSandook({ thumbnails: updated })
                              showSavedToast()
                            }}
                            style={{ ...inputStyle, padding: '0.5rem 0.75rem', fontSize: '0.76rem' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: HERO & MARQUEE */}
          {activeTab === 'hero' && (
            <div>
              <div style={{ marginBottom: '1.8rem' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', margin: 0, color: '#2C221A' }}>
                  Hero Header & Announcement Marquee
                </h1>
                <p style={{ margin: '0.3rem 0 0', color: '#6E5D4B', fontSize: '0.84rem' }}>
                  Fine-tune the top landing banner typography, imagery, and rotating ticker highlights.
                </p>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(196, 154, 70, 0.24)',
                  borderRadius: '20px',
                  padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  boxShadow: '0 10px 30px rgba(44, 34, 26, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.4rem',
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem' }}>
                  <div>
                    <label style={labelStyle}>Hero Eyebrow</label>
                    <input
                      type="text"
                      value={hero.eyebrow}
                      onChange={(e) => {
                        updateHero({ eyebrow: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Headline Part 1</label>
                    <input
                      type="text"
                      value={hero.headlinePart1}
                      onChange={(e) => {
                        updateHero({ headlinePart1: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Headline Part 2 (Italic Flourish)</label>
                    <input
                      type="text"
                      value={hero.headlinePart2}
                      onChange={(e) => {
                        updateHero({ headlinePart2: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Primary CTA Button Text</label>
                    <input
                      type="text"
                      value={hero.ctaText}
                      onChange={(e) => {
                        updateHero({ ctaText: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Hero Subtitle Narrative</label>
                  <textarea
                    rows={3}
                    value={hero.subtitle}
                    onChange={(e) => {
                      updateHero({ subtitle: e.target.value })
                      showSavedToast()
                    }}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Hero Visual Image URL</label>
                  <input
                    type="text"
                    value={hero.heroImage}
                    onChange={(e) => {
                      updateHero({ heroImage: e.target.value })
                      showSavedToast()
                    }}
                    style={inputStyle}
                  />
                </div>

                <div style={{ borderTop: '1px solid rgba(196, 154, 70, 0.2)', paddingTop: '1.4rem' }}>
                  <label style={labelStyle}>
                    Marquee Ticker Items (One per line)
                  </label>
                  <textarea
                    rows={5}
                    value={marquee.join('\n')}
                    onChange={(e) => {
                      const items = e.target.value.split('\n').filter(Boolean)
                      updateMarquee(items)
                      showSavedToast()
                    }}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BRAND STORY & STATS */}
          {activeTab === 'story' && (
            <div>
              <div style={{ marginBottom: '1.8rem' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', margin: 0, color: '#2C221A' }}>
                  Brand Story & Heritage
                </h1>
                <p style={{ margin: '0.3rem 0 0', color: '#6E5D4B', fontSize: '0.84rem' }}>
                  Edit the philosophy copy and luxury statistics callout.
                </p>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(196, 154, 70, 0.24)',
                  borderRadius: '20px',
                  padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  boxShadow: '0 10px 30px rgba(44, 34, 26, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.4rem',
                }}
              >
                <div>
                  <label style={labelStyle}>Story Eyebrow</label>
                  <input
                    type="text"
                    value={brandStory.eyebrow}
                    onChange={(e) => {
                      updateBrandStory({ eyebrow: e.target.value })
                      showSavedToast()
                    }}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Story Main Heading</label>
                  <input
                    type="text"
                    value={brandStory.heading}
                    onChange={(e) => {
                      updateBrandStory({ heading: e.target.value })
                      showSavedToast()
                    }}
                    style={inputStyle}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Narrative Paragraph 1</label>
                  <textarea
                    rows={4}
                    value={brandStory.paragraph1}
                    onChange={(e) => {
                      updateBrandStory({ paragraph1: e.target.value })
                      showSavedToast()
                    }}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <div>
                  <label style={labelStyle}>Narrative Paragraph 2</label>
                  <textarea
                    rows={4}
                    value={brandStory.paragraph2}
                    onChange={(e) => {
                      updateBrandStory({ paragraph2: e.target.value })
                      showSavedToast()
                    }}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                <div>
                  <h3 style={{ fontSize: '1rem', color: '#8C6718', margin: '0.6rem 0', fontFamily: 'Cormorant Garamond, serif' }}>
                    4 Brand Statistics
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    {brandStory.stats.map((stat, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: '#FAF6EE',
                          border: '1px solid rgba(196, 154, 70, 0.22)',
                          borderRadius: '12px',
                          padding: '0.85rem',
                        }}
                      >
                        <div style={{ marginBottom: '0.5rem' }}>
                          <label style={{ ...labelStyle, fontSize: '0.64rem' }}>Number / Stat</label>
                          <input
                            type="text"
                            value={stat.number}
                            onChange={(e) => {
                              const updated = [...brandStory.stats]
                              updated[idx] = { ...updated[idx], number: e.target.value }
                              updateBrandStory({ stats: updated })
                              showSavedToast()
                            }}
                            style={{ ...inputStyle, padding: '0.45rem 0.7rem', fontSize: '0.85rem' }}
                          />
                        </div>
                        <div>
                          <label style={{ ...labelStyle, fontSize: '0.64rem' }}>Label / Metric</label>
                          <input
                            type="text"
                            value={stat.label}
                            onChange={(e) => {
                              const updated = [...brandStory.stats]
                              updated[idx] = { ...updated[idx], label: e.target.value }
                              updateBrandStory({ stats: updated })
                              showSavedToast()
                            }}
                            style={{ ...inputStyle, padding: '0.45rem 0.7rem', fontSize: '0.78rem' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              <div style={{ marginBottom: '1.8rem' }}>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.2rem', margin: 0, color: '#2C221A' }}>
                  Global Store Settings
                </h1>
                <p style={{ margin: '0.3rem 0 0', color: '#6E5D4B', fontSize: '0.84rem' }}>
                  Configure customer service contacts, currency symbol, and complimentary shipping limits.
                </p>
              </div>

              <div
                style={{
                  background: '#FFFFFF',
                  border: '1px solid rgba(196, 154, 70, 0.24)',
                  borderRadius: '20px',
                  padding: 'clamp(1.5rem, 2.5vw, 2.2rem)',
                  boxShadow: '0 10px 30px rgba(44, 34, 26, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.4rem',
                }}
              >
                <div>
                  <label style={labelStyle}>Header Announcement Banner Text</label>
                  <input
                    type="text"
                    value={siteSettings.announcement}
                    onChange={(e) => {
                      updateSiteSettings({ announcement: e.target.value })
                      showSavedToast()
                    }}
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.4rem' }}>
                  <div>
                    <label style={labelStyle}>Concierge Support Email</label>
                    <input
                      type="email"
                      value={siteSettings.supportEmail}
                      onChange={(e) => {
                        updateSiteSettings({ supportEmail: e.target.value })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Free Shipping Threshold ($ USD)</label>
                    <input
                      type="number"
                      value={siteSettings.freeShippingThreshold}
                      onChange={(e) => {
                        updateSiteSettings({ freeShippingThreshold: Number(e.target.value) })
                        showSavedToast()
                      }}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(196, 154, 70, 0.15)', paddingTop: '1.4rem' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#8C6718', marginBottom: '0.35rem' }}>
                    Store Data Backup & Management
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#6E5D4B', margin: '0 0 1rem' }}>
                    All changes are immediately stored inside your browser's persistent localStorage store. You can reset to initial artisanal values anytime.
                  </p>
                  <button
                    onClick={handleReset}
                    style={{
                      background: 'rgba(220, 75, 75, 0.15)',
                      border: '1px solid rgba(220, 75, 75, 0.4)',
                      color: '#FC8181',
                      padding: '0.65rem 1.2rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Reset All Storefront Data to Defaults
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.72rem',
  fontWeight: 700,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#8C6718',
  marginBottom: '0.45rem',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#FCFAF7',
  border: '1px solid rgba(196, 154, 70, 0.35)',
  borderRadius: '10px',
  padding: '0.7rem 0.95rem',
  color: '#2C221A',
  fontSize: '0.86rem',
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s ease',
}
