import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import products from '@/data/products'
import type { Product } from '@/data/products'

type CartLine = { productId: number; quantity: number }

type CartContextValue = {
  lines: Array<CartLine & { product: Product }>
  count: number
  subtotal: number
  isOpen: boolean
  setOpen: (open: boolean) => void
  add: (productId: number, quantity?: number) => void
  update: (productId: number, delta: number) => void
  remove: (productId: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'mtjza-cart'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<Array<CartLine>>([])
  const [isOpen, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setRaw(JSON.parse(saved))
    } catch {
      // ignore corrupt storage
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(raw))
  }, [raw, loaded])

  const value = useMemo<CartContextValue>(() => {
    const lines = raw.flatMap((line) => {
      const product = products.find((p) => p.id === line.productId)
      return product ? [{ ...line, product }] : []
    })
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: lines.reduce((sum, l) => sum + l.quantity * l.product.price, 0),
      isOpen,
      setOpen,
      add: (productId, quantity = 1) => {
        setRaw((prev) => {
          const existing = prev.find((l) => l.productId === productId)
          if (existing) {
            return prev.map((l) =>
              l.productId === productId
                ? { ...l, quantity: l.quantity + quantity }
                : l,
            )
          }
          return [...prev, { productId, quantity }]
        })
        setOpen(true)
      },
      update: (productId, delta) =>
        setRaw((prev) =>
          prev
            .map((l) =>
              l.productId === productId
                ? { ...l, quantity: l.quantity + delta }
                : l,
            )
            .filter((l) => l.quantity > 0),
        ),
      remove: (productId) =>
        setRaw((prev) => prev.filter((l) => l.productId !== productId)),
      clear: () => setRaw([]),
    }
  }, [raw, isOpen])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
