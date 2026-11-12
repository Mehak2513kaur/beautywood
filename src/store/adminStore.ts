import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AdminProduct {
  id: string
  slug: string
  roman: string
  step: string
  name: string
  tagline: string
  quantity: string
  price: number
  originalPrice?: number
  rating: string
  reviewCount: string
  texture: string
  skinGoal: string
  image: string
  description: string
  ingredients: string[]
  heroActives: string[]
  inStock: boolean
}

export interface AdminSkincareKit {
  id: string
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
}

export interface SandookBadge {
  title: string
  subtitle: string
}

export interface SandookThumbnail {
  title: string
  desc: string
  image: string
}

export interface AdminSandook {
  eyebrow: string
  titleLine1: string
  titleLine2: string
  storyNarrative: string
  watermarkText: string
  heroMainImage: string
  heroMemoriesImage: string
  badges: SandookBadge[]
  thumbnails: SandookThumbnail[]
}

export interface AdminHero {
  eyebrow: string
  headlinePart1: string
  headlinePart2: string
  subtitle: string
  ctaText: string
  secondaryCtaText: string
  heroImage: string
}

export interface BrandStoryStat {
  number: string
  label: string
}

export interface AdminBrandStory {
  eyebrow: string
  heading: string
  paragraph1: string
  paragraph2: string
  stats: BrandStoryStat[]
}

export interface AdminSiteSettings {
  announcement: string
  supportEmail: string
  currencySymbol: string
  freeShippingThreshold: number
}

interface AdminState {
  products: AdminProduct[]
  kit: AdminSkincareKit
  sandook: AdminSandook
  hero: AdminHero
  marquee: string[]
  brandStory: AdminBrandStory
  siteSettings: AdminSiteSettings

  // Actions
  updateProduct: (id: string, partial: Partial<AdminProduct>) => void
  addProduct: (product: AdminProduct) => void
  deleteProduct: (id: string) => void
  updateKit: (partial: Partial<AdminSkincareKit>) => void
  updateSandook: (partial: Partial<AdminSandook>) => void
  updateHero: (partial: Partial<AdminHero>) => void
  updateMarquee: (items: string[]) => void
  updateBrandStory: (partial: Partial<AdminBrandStory>) => void
  updateSiteSettings: (partial: Partial<AdminSiteSettings>) => void
  resetToDefaults: () => void
}

export const defaultProducts: AdminProduct[] = [
  {
    id: 'p-cleanser',
    slug: 'face-cleanser',
    roman: 'I',
    step: 'STEP 01 · PURIFY',
    name: 'Face Cleanser',
    tagline: 'Gentle Botanical Purifier',
    quantity: '120 ml · 4.0 fl oz',
    price: 48,
    originalPrice: 56,
    rating: '4.9',
    reviewCount: '142',
    texture: 'Silky, low-foaming botanical gel',
    skinGoal: 'Pore purification & barrier protection',
    image: '/kits/face-cleanser.jpg',
    description: 'A silky, low-foaming botanical cleanser that gently lifts daily impurities, sunscreen, and excess sebum while preserving the vital moisture mantle.',
    ingredients: [
      'Glycolic Acid',
      'Vitamin C',
      'Papaya Extract',
      'Tulsi Extract',
      'Aloe Extract',
      'Neem Extract',
      'Panthenol',
    ],
    heroActives: ['Glycolic Acid', 'Vitamin C', 'Tulsi Extract'],
    inStock: true,
  },
  {
    id: 'p-day-serum',
    slug: 'day-serum',
    roman: 'II',
    step: 'STEP 02 · ILLUMINATE',
    name: 'Day Serum',
    tagline: 'Liquid Gold Antioxidant Shield',
    quantity: '30 ml · 1.0 fl oz',
    price: 88,
    originalPrice: 98,
    rating: '5.0',
    reviewCount: '218',
    texture: 'Weightless fast-absorbing golden nectar',
    skinGoal: 'All-day antioxidant shield & lit-from-within glow',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80',
    description: 'Clinically formulated daytime elixir that shields skin against oxidative stressors, hyperpigmentation, and blue light while locking in continuous hydration.',
    ingredients: [
      'Vitamin C',
      'Niacinamide',
      'Melazero',
      'Pro Col One+',
      'Caffeine',
      'Pro Vitamin B5',
      'Vitamin E',
      'Hyaluronic Acid',
    ],
    heroActives: ['Vitamin C', 'Niacinamide', 'Melazero', 'Hyaluronic Acid'],
    inStock: true,
  },
  {
    id: 'p-night-serum',
    slug: 'night-serum',
    roman: 'III',
    step: 'STEP 03 · RESTORE',
    name: 'Night Serum',
    tagline: 'Cellular Renewal Elixir',
    quantity: '30 ml · 1.0 fl oz',
    price: 94,
    originalPrice: 108,
    rating: '4.9',
    reviewCount: '185',
    texture: 'Nutrient-dense overnight restorative elixir',
    skinGoal: 'Deep cellular regeneration & skin tone balancing',
    image: 'https://images.unsplash.com/photo-1611080541599-8c6dbde6ed28?w=800&q=80',
    description: 'Intensive overnight restorative concentrate with revered Ayurvedic botanicals that deeply repairs, refines texture, and revitalizes elasticity while you sleep.',
    ingredients: [
      'Neem',
      'Manjishta',
      'Orange Peel',
      'Saffron',
      'Rosehip',
    ],
    heroActives: ['Saffron', 'Rosehip', 'Manjishta', 'Neem'],
    inStock: true,
  },
]

export const defaultKit: AdminSkincareKit = {
  id: 'kit-complete',
  name: 'The Complete Skincare Kit',
  subtitle: 'The Botanical Trilogy · Face Cleanser + Day Serum + Night Serum',
  tagline: 'THE SIGNATURE BOTANICAL RITUAL',
  description: 'A complete morning-to-night ritual uniting our three foundational formulas: gentle purifying botanical cleanser, daytime liquid gold antioxidant shield, and intensive overnight cellular restorative elixir. Arrives encased in our bespoke handcrafted Taali Ki Lakkad keepsake Sandook with embroidered linen dust tote.',
  price: 168,
  originalPrice: 230,
  savings: 62,
  badge: 'COMPLETE RITUAL · SAVE $62',
  skinGoal: 'Complete skin rejuvenation, luminous antioxidant glow & barrier repair',
  skinType: 'All Skin Types · Dermatologist Formulated',
  image: '/kits/skincare-kit-bg.jpg',
  rating: 5.0,
  reviewCount: 384,
  productIds: ['p-cleanser', 'p-day-serum', 'p-night-serum'],
  keyActives: [
    'Glycolic Acid (Purifying Exfoliant)',
    '15% Vitamin C (Radiance Shield)',
    'Niacinamide (Barrier Fortification)',
    'Pure Kashmiri Saffron (Cellular Renewal)',
    'Ayurvedic Neem & Manjishta (Tone Clarifier)',
    'Cold-Pressed Rosehip Seed Oil (Lipid Restoration)',
  ],
}

export const defaultSandook: AdminSandook = {
  eyebrow: 'TAALI KI LAKKAD — THE HEIRLOOM SANDOOK',
  titleLine1: 'Not Just Beauty.',
  titleLine2: 'The Sandook.',
  storyNarrative: 'In our ancestral homes, a Sandook is never just carved wood—it is an heirloom of blessings, love, and sacred time. Every complete skincare kit from THE BEAUTYWOOD arrives encased in a bespoke wooden chest handcrafted from genuine Taali ki Lakkad (Indian Rosewood).',
  watermarkText: 'SANDOOK',
  heroMainImage: '/sandook/hero-main.png',
  heroMemoriesImage: '/sandook/hero-memories.png',
  badges: [
    { title: 'SOLID TAALI WOOD', subtitle: 'INDIAN ROSEWOOD' },
    { title: 'RICH, NATURAL FRAGRANCE', subtitle: 'AROMATIC WOOD' },
    { title: 'BUILT TO LAST GENERATIONS', subtitle: 'TIMELESS HEIRLOOM' },
  ],
  thumbnails: [
    {
      title: 'Taali Ki Lakkad',
      desc: 'Deep amber Indian Rosewood known for its strength and resilience.',
      image: '/sandook/thumb-taali.png',
    },
    {
      title: 'Artisanal Sandook',
      desc: 'Handcrafted by master artisans with antique brass fittings.',
      image: '/sandook/thumb-artisanal.png',
    },
    {
      title: 'Vessel of Memories',
      desc: 'Designed to treasure your most intimate heirlooms.',
      image: '/sandook/thumb-vessel.png',
    },
  ],
}

export const defaultHero: AdminHero = {
  eyebrow: 'THE HEIRLOOM BOTANICAL COLLECTION',
  headlinePart1: 'Liquid Gold',
  headlinePart2: 'Botanical Luxury',
  subtitle: 'Revered Ayurvedic botanicals meet clinical dermatological science. Handcrafted formulations encased in bespoke Taali wood heirlooms.',
  ctaText: 'Shop Skincare Kits',
  secondaryCtaText: 'The Sandook Legacy',
  heroImage: '/hero-luxury-gold.png',
}

export const defaultMarquee: string[] = [
  'DERMATOLOGIST FORMULATED',
  '100% CLEAN BOTANICALS',
  'HANDCRAFTED TAALI SANDOOK',
  'NO HARSH PARABENS OR SULFATES',
  'ETHICALLY HARVESTED AYURVEDA',
  'LIMITED ARTISANAL BATCHES',
  'ZERO ARTIFICIAL FRAGRANCE',
]

export const defaultBrandStory: AdminBrandStory = {
  eyebrow: 'THE ESSENCE OF BEAUTYWOOD',
  heading: 'Where Botanical Science Meets Liquid Gold Luxury',
  paragraph1: 'THE BEAUTYWOOD was conceived with a singular vision: to create beauty that doesn\'t just enhance — it transforms. Our formulations are built on rare botanical actives, precision science and an unwavering commitment to the extraordinary.',
  paragraph2: 'Every product in our collection is designed as an experience — a sensorial ritual that begins the moment you open the bottle. We believe beauty should be felt deeply, worn confidently and remembered long after.',
  stats: [
    { number: '40+', label: 'Botanical Actives' },
    { number: '100%', label: 'Cruelty Free' },
    { number: '3-Piece', label: 'Signature Ritual' },
    { number: '∞', label: 'The Promise' },
  ],
}

export const defaultSiteSettings: AdminSiteSettings = {
  announcement: 'Complimentary shipping across the world on all Complete Skincare Kits.',
  supportEmail: 'concierge@thebeautywood.com',
  currencySymbol: '$',
  freeShippingThreshold: 100,
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set) => ({
      products: defaultProducts,
      kit: defaultKit,
      sandook: defaultSandook,
      hero: defaultHero,
      marquee: defaultMarquee,
      brandStory: defaultBrandStory,
      siteSettings: defaultSiteSettings,

      updateProduct: (id, partial) =>
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...partial } : p
          ),
        })),

      addProduct: (product) =>
        set((state) => ({
          products: [...state.products, product],
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
        })),

      updateKit: (partial) =>
        set((state) => ({
          kit: { ...state.kit, ...partial },
        })),

      updateSandook: (partial) =>
        set((state) => ({
          sandook: { ...state.sandook, ...partial },
        })),

      updateHero: (partial) =>
        set((state) => ({
          hero: { ...state.hero, ...partial },
        })),

      updateMarquee: (items) =>
        set(() => ({
          marquee: items,
        })),

      updateBrandStory: (partial) =>
        set((state) => ({
          brandStory: { ...state.brandStory, ...partial },
        })),

      updateSiteSettings: (partial) =>
        set((state) => ({
          siteSettings: { ...state.siteSettings, ...partial },
        })),

      resetToDefaults: () =>
        set({
          products: defaultProducts,
          kit: defaultKit,
          sandook: defaultSandook,
          hero: defaultHero,
          marquee: defaultMarquee,
          brandStory: defaultBrandStory,
          siteSettings: defaultSiteSettings,
        }),
    }),
    {
      name: 'the-beautywood-admin-store-v2',
    }
  )
)
