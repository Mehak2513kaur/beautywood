// Cart Store — Zustand
import { create } from 'zustand'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  variant?: string
  size?: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (id: string, variant?: string) => void
  updateQuantity: (id: string, quantity: number, variant?: string) => void
  clearCart: () => void
  toggleCart: () => void
  openCart: () => void
  closeCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isOpen: false,

  addItem: (item) => {
    const { items } = get()
    const key = `${item.id}-${item.variant || 'default'}`
    const existing = items.find(i => `${i.id}-${i.variant || 'default'}` === key)

    if (existing) {
      set({
        items: items.map(i =>
          `${i.id}-${i.variant || 'default'}` === key
            ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
            : i
        ),
        isOpen: true,
      })
    } else {
      set({ items: [...items, { ...item, quantity: item.quantity ?? 1 }], isOpen: true })
    }
  },

  removeItem: (id, variant) => {
    const key = `${id}-${variant || 'default'}`
    set(state => ({
      items: state.items.filter(i => `${i.id}-${i.variant || 'default'}` !== key),
    }))
  },

  updateQuantity: (id, quantity, variant) => {
    const key = `${id}-${variant || 'default'}`
    if (quantity <= 0) {
      set(state => ({
        items: state.items.filter(i => `${i.id}-${i.variant || 'default'}` !== key),
      }))
    } else {
      set(state => ({
        items: state.items.map(i =>
          `${i.id}-${i.variant || 'default'}` === key ? { ...i, quantity } : i
        ),
      }))
    }
  },

  clearCart: () => set({ items: [] }),
  toggleCart: () => set(state => ({ isOpen: !state.isOpen })),
  openCart: () => set({ isOpen: true }),
  closeCart: () => set({ isOpen: false }),

  total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}))
