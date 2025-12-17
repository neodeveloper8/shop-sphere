import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  thumbnail: string
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: number) => void
  clearCart: () => void

  // 👉 Agregamos esto
  
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items
        const exists = items.find(i => i.id === item.id)

        if (exists) {
          set({
            items: items.map(i =>
              i.id === item.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          })
        } else {
          set({ items: [...items, { ...item, quantity: 1 }] })
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter(i => i.id !== id) })
      },

      clearCart: () => {
        set({ items: [] })
      },
    }),
    {
      name: 'cart-storage', // 👈 clave en localStorage
    }
  )
)