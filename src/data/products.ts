// Product & Collection Data
export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  price: number
  originalPrice?: number
  image: string
  hoverImage?: string
  category: string
  collection: string
  description: string
  ingredients?: string
  variants?: { label: string; value: string }[]
  sizes?: { label: string; value: string; price?: number }[]
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
  badge?: string
}

export interface Collection {
  id: string
  slug: string
  name: string
  tagline: string
  description: string
  image: string
  color: string
  textColor: string
}

export interface KitStep {
  step: number
  title: string
  action: string
  productId: string
}

export interface SkincareKit {
  id: string
  slug: string
  name: string
  subtitle: string
  tagline: string
  description: string
  price: number
  originalPrice: number
  savings: number
  badge: string
  skinGoal: string
  skinType: string
  image: string
  rating: number
  reviewCount: number
  productIds: string[]
  keyActives: string[]
  clinicalResults: { stat: string; label: string }[]
  steps: KitStep[]
}

// ─── DEMO PRODUCT IMAGES (Unsplash — editorial beauty) ───
const IMG = {
  serum:        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
  face_oil:     'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=800&q=80',
  cream:        'https://images.unsplash.com/photo-1570194065650-d99fb4ee7694?w=800&q=80',
  mist:         'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80',
  lip:          'https://images.unsplash.com/photo-1586495777744-4e6232bf2ebb?w=800&q=80',
  eye:          'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80',
  mask:         'https://images.unsplash.com/photo-1601233749202-95d04d5b3c00?w=800&q=80',
  toner:        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  body_oil:     'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=800&q=80',
  perfume:      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80',
  candle:       'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&q=80',
  gua_sha:      'https://images.unsplash.com/photo-1614159102467-c2018e7ead49?w=800&q=80',
  cleanser:     'https://images.unsplash.com/photo-1556228722-d9b32cb198bc?w=800&q=80',
}

export const products: Product[] = [
  {
    id: 'p-cleanser',
    slug: 'face-cleanser',
    name: 'Face Cleanser',
    tagline: 'Gentle Botanical Purifier',
    price: 48,
    image: 'https://images.unsplash.com/photo-1556228722-d9b32cb198bc?w=800&q=80',
    category: 'cleansers',
    collection: 'botanical-skin',
    description: 'A silky, low-foaming botanical cleanser that gently lifts away daily impurities and pollutants while protecting the skin barrier.',
    ingredients: 'Glycolic Acid, Vitamin C, Papaya Extract, Tulsi Extract, Aloe Extract, Neem Extract, Panthenol',
    inStock: true,
    badge: 'STEP 01',
  },
  {
    id: 'p-day-serum',
    slug: 'day-serum',
    name: 'Day Serum',
    tagline: 'Liquid Gold Antioxidant Shield',
    price: 88,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    category: 'serums',
    collection: 'golden-ritual',
    description: 'Infused with botanical gold extracts and clinical antioxidants, this daytime elixir locks in hydration and creates an illuminated, golden-hour glow.',
    ingredients: 'Vitamin C, Niacinamide, Melazero, Pro Col One+, Caffeine, Pro Vitamin B5, Vitamin E, Hyaluronic Acid',
    inStock: true,
    badge: 'STEP 02',
  },
  {
    id: 'p-night-serum',
    slug: 'night-serum',
    name: 'Night Serum',
    tagline: 'Cellular Renewal Elixir',
    price: 94,
    image: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=800&q=80',
    category: 'serums',
    collection: 'golden-ritual',
    description: 'An intensive overnight concentrate enriched with bakuchiol and regenerative peptide minerals that accelerates skin renewal while you rest.',
    ingredients: 'Neem, Manjishta, Orange Peel, Saffron, Rosehip',
    inStock: true,
    badge: 'STEP 03',
  },
  {
    id: 'p1',
    slug: 'liquid-gold-serum',
    name: 'Liquid Gold Serum',
    tagline: 'Radiance, distilled.',
    price: 128,
    image: IMG.serum,
    hoverImage: IMG.face_oil,
    category: 'serums',
    collection: 'golden-ritual',
    description: 'A weightless, ultra-concentrated serum delivering deep luminosity and visibly firmer skin. Formulated with botanical gold extracts and rare botanical oils.',
    ingredients: 'Water, Glycerin, Niacinamide, Hyaluronic Acid, Centella Asiatica, Vitamin C, Bakuchiol, Squalane',
    variants: [{ label: 'Standard', value: 'standard' }],
    sizes: [
      { label: '15ml', value: '15ml', price: 128 },
      { label: '30ml', value: '30ml', price: 218 },
    ],
    inStock: true,
    isNew: true,
    badge: 'NEW ARRIVAL',
  },
  {
    id: 'p2',
    slug: 'champagne-face-oil',
    name: 'Champagne Face Oil',
    tagline: 'Silk. Warmth. Glow.',
    price: 96,
    image: IMG.face_oil,
    hoverImage: IMG.serum,
    category: 'face-oils',
    collection: 'golden-ritual',
    description: 'A luxurious dry-touch face oil that absorbs instantly, leaving skin with a champagne-lit luminosity and deeply nourished suppleness.',
    sizes: [{ label: '30ml', value: '30ml', price: 96 }],
    inStock: true,
    isBestSeller: true,
    badge: 'BESTSELLER',
  },
  {
    id: 'p3',
    slug: 'ivory-silk-moisturiser',
    name: 'Ivory Silk Moisturiser',
    tagline: 'Porcelain skin, perfected.',
    price: 84,
    image: IMG.cream,
    category: 'moisturisers',
    collection: 'botanical-skin',
    description: 'Rich yet weightless, this signature moisturiser envelops skin in botanical luxury — hydrating, protecting and perfecting texture over time.',
    sizes: [
      { label: '50ml', value: '50ml', price: 84 },
      { label: '100ml', value: '100ml', price: 148 },
    ],
    inStock: true,
  },
  {
    id: 'p4',
    slug: 'luminous-mist',
    name: 'Luminous Setting Mist',
    tagline: 'Dewy. Radiant. Set.',
    price: 54,
    image: IMG.mist,
    category: 'mists',
    collection: 'botanical-skin',
    description: 'A fine, skin-loving mist that sets makeup, refreshes and adds a dewey luminosity to skin at any time of day.',
    inStock: true,
    isNew: true,
    badge: 'NEW',
  },
  {
    id: 'p5',
    slug: 'velvet-lip-oil',
    name: 'Velvet Lip Oil',
    tagline: 'Colour. Gloss. Care.',
    price: 42,
    image: IMG.lip,
    category: 'lips',
    collection: 'colour-luxe',
    description: 'A tinted lip oil delivering sheer, buildable colour with an ultra-glossy, plumping finish. Deeply conditioning with botanical extract complex.',
    variants: [
      { label: 'Champagne Rose', value: 'champagne-rose' },
      { label: 'Bare Gold', value: 'bare-gold' },
      { label: 'Deep Plum', value: 'deep-plum' },
      { label: 'Nude Espresso', value: 'nude-espresso' },
    ],
    inStock: true,
    isBestSeller: true,
    badge: 'BESTSELLER',
  },
  {
    id: 'p6',
    slug: 'botanical-eye-serum',
    name: 'Botanical Eye Serum',
    tagline: 'Lift. Brighten. Restore.',
    price: 72,
    image: IMG.eye,
    category: 'serums',
    collection: 'golden-ritual',
    description: 'A potent, ultra-fine serum formulated for the delicate eye area. Visibly reduces dark circles, fine lines and puffiness.',
    sizes: [{ label: '15ml', value: '15ml', price: 72 }],
    inStock: true,
  },
  {
    id: 'p7',
    slug: 'gold-mask-treatment',
    name: 'Gold Mask Treatment',
    tagline: 'The weekly ritual.',
    price: 68,
    image: IMG.mask,
    category: 'masks',
    collection: 'golden-ritual',
    description: `An intensive overnight mask that transforms skin texture while you sleep. Gold-kissed botanical actives work in harmony with your skin's natural renewal cycle.`,
    sizes: [
      { label: '60ml', value: '60ml', price: 68 },
      { label: '120ml', value: '120ml', price: 118 },
    ],
    inStock: true,
    isNew: false,
  },
  {
    id: 'p8',
    slug: 'botanical-toner',
    name: 'Botanical Toner',
    tagline: 'Prepare. Balance. Refine.',
    price: 48,
    image: IMG.toner,
    category: 'toners',
    collection: 'botanical-skin',
    description: 'An alcohol-free botanical toner that primes skin for the next steps of your ritual. Balancing, clarifying and deeply hydrating.',
    sizes: [{ label: '200ml', value: '200ml', price: 48 }],
    inStock: true,
  },
  {
    id: 'p9',
    slug: 'golden-body-oil',
    name: 'Golden Body Oil',
    tagline: 'Body, beautifully nourished.',
    price: 78,
    image: IMG.body_oil,
    category: 'body',
    collection: 'body-ritual',
    description: 'A lustrous, fast-absorbing body oil that leaves skin silky, radiant and delicately scented with warm botanicals. The ultimate body ritual.',
    sizes: [
      { label: '100ml', value: '100ml', price: 78 },
      { label: '200ml', value: '200ml', price: 138 },
    ],
    inStock: true,
    isBestSeller: true,
    badge: 'BESTSELLER',
  },
  {
    id: 'p10',
    slug: 'espresso-eau-de-parfum',
    name: 'Espresso Eau de Parfum',
    tagline: 'Warm. Dark. Unforgettable.',
    price: 168,
    image: IMG.perfume,
    category: 'fragrance',
    collection: 'signature-scent',
    description: 'A warm, sophisticated fragrance layered with dark espresso, rich amber, sandalwood and a whisper of white florals. Unmistakably THE BEAUTYWOOD.',
    sizes: [
      { label: '30ml', value: '30ml', price: 98 },
      { label: '50ml', value: '50ml', price: 138 },
      { label: '100ml', value: '100ml', price: 168 },
    ],
    inStock: true,
    badge: 'SIGNATURE',
  },
  {
    id: 'p11',
    slug: 'champagne-candle',
    name: 'Champagne Ritual Candle',
    tagline: 'Scent the atmosphere.',
    price: 58,
    image: IMG.candle,
    category: 'home',
    collection: 'signature-scent',
    description: 'A hand-poured luxury candle in champagne tones, crafted with a warm botanical fragrance. 60+ hour burn. The perfect ritual companion.',
    inStock: true,
  },
  {
    id: 'p12',
    slug: 'rose-gua-sha',
    name: 'Rose Gua Sha Tool',
    tagline: 'Sculpt. Lift. Energise.',
    price: 64,
    image: IMG.gua_sha,
    category: 'tools',
    collection: 'golden-ritual',
    description: 'A hand-carved rose quartz gua sha tool designed to promote lymphatic drainage, sculpt facial contours and elevate your skincare ritual.',
    inStock: true,
    isNew: true,
    badge: 'NEW',
  },
]

export const collections: Collection[] = [
  {
    id: 'c1',
    slug: 'golden-ritual',
    name: 'The Golden Ritual',
    tagline: 'Your daily devotion to radiance',
    description: 'A complete skincare system built around liquid gold botanicals. Transformative formulas for luminous, perfected skin.',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&q=80',
    color: '#C4A46C',
    textColor: '#FFFDF9',
  },
  {
    id: 'c2',
    slug: 'botanical-skin',
    name: 'Botanical Skin',
    tagline: 'The purest expressions of nature',
    description: 'Potent plant actives in their most sophisticated form. Science meets botanical wisdom for visible, lasting results.',
    image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=1200&q=80',
    color: '#F5F0E7',
    textColor: '#332B26',
  },
  {
    id: 'c3',
    slug: 'colour-luxe',
    name: 'Colour Luxe',
    tagline: 'Colour as art',
    description: 'Where editorial colour meets extraordinary skincare. Each product wears beautifully and cares deeply.',
    image: 'https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=1200&q=80',
    color: '#332B26',
    textColor: '#EAD8B5',
  },
  {
    id: 'c4',
    slug: 'signature-scent',
    name: 'Signature Scent',
    tagline: 'Wear your world',
    description: 'Fragrances and home objects designed to create atmosphere. Your scent tells your story.',
    image: 'https://images.unsplash.com/photo-1600612253971-1e7058a053a3?w=1200&q=80',
    color: '#EAD8B5',
    textColor: '#332B26',
  },
  {
    id: 'c5',
    slug: 'body-ritual',
    name: 'Body Ritual',
    tagline: 'The ceremony of self-care',
    description: 'Luxurious body treatments that transform the everyday into the exceptional. For skin that glows from head to toe.',
    image: 'https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=1200&q=80',
    color: '#D9C3A0',
    textColor: '#332B26',
  },
]

export const categories = [
  { label: 'All', value: 'all' },
  { label: 'Serums', value: 'serums' },
  { label: 'Moisturisers', value: 'moisturisers' },
  { label: 'Face Oils', value: 'face-oils' },
  { label: 'Masks', value: 'masks' },
  { label: 'Toners', value: 'toners' },
  { label: 'Lips', value: 'lips' },
  { label: 'Eye', value: 'serums' },
  { label: 'Fragrance', value: 'fragrance' },
  { label: 'Body', value: 'body' },
  { label: 'Home', value: 'home' },
  { label: 'Tools', value: 'tools' },
]

// ─── CURATED SKINCARE KITS ────────────────────────
export const skincareKits: SkincareKit[] = [
  {
    id: 'complete-skincare-kit',
    slug: 'complete-skincare-kit',
    name: 'Complete Skincare Kit',
    subtitle: 'Face Cleanser · Day Serum · Night Serum',
    tagline: 'Complete skincare kit crafted with research-based ingredients for healthy, radiant, and timeless skin.',
    description:
      'Engineered as your definitive 24-hour skincare ritual. Cleanses away impurities without stripping, protects and illuminates by day with an active antioxidant shield, and accelerates cellular renewal and collagen repair overnight.',
    price: 168,
    originalPrice: 230,
    savings: 62,
    badge: 'COMPLETE 3-PIECE RITUAL',
    skinGoal: '24-Hour Cellular Radiance, Deep Hydration & Barrier Harmony',
    skinType: 'All Skin Types — Dermatologist Verified',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=85',
    rating: 4.99,
    reviewCount: 248,
    productIds: ['p-cleanser', 'p-day-serum', 'p-night-serum'],
    keyActives: [
      'Glycolic Acid & Vitamin C',
      'Niacinamide, Melazero & Caffeine',
      'Pro Col One+ & Hyaluronic Acid',
      'Neem, Manjishta, Saffron & Rosehip',
    ],
    clinicalResults: [
      { stat: '99%', label: 'saw visibly clearer, healthier, and glowing skin' },
      { stat: '97%', label: 'reported all-day luminous hydration without heaviness' },
      { stat: '95%', label: 'noticed smoother texture & softened fine lines in 14 days' },
    ],
    steps: [
      {
        step: 1,
        title: 'Step 1: Face Cleanser',
        action: 'Purifying botanical wash that removes impurities and balances pH without stripping.',
        productId: 'p-cleanser',
      },
      {
        step: 2,
        title: 'Step 2: Day Serum',
        action: 'Antioxidant & Liquid Gold infusion that shields from daily stressors and illuminates skin.',
        productId: 'p-day-serum',
      },
      {
        step: 3,
        title: 'Step 3: Night Serum',
        action: 'Deep cellular renewal with bakuchiol and peptides that restores bounce overnight.',
        productId: 'p-night-serum',
      },
    ],
  },
]

export function getKitBySlug(slug: string): SkincareKit | undefined {
  return skincareKits.find(kit => kit.slug === slug)
}

export function getProductsForKit(kit: SkincareKit): Product[] {
  return kit.productIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined)
}
