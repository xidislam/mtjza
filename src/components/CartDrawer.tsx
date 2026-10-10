import { useEffect, useState } from 'react'
import {
  ArrowRight,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react'
import { CheckoutModal } from './CheckoutModal'
import { useCart } from '@/lib/cart'
import {
  FREE_DELIVERY_THRESHOLD,
  imageUrl,
  shop,
  taka,
  whatsappLink,
} from '@/lib/store'

export function CartDrawer() {
  const { lines, subtotal, isOpen, setOpen, update, remove } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])

  const remaining = FREE_DELIVERY_THRESHOLD - subtotal
  const whatsappMessage = [
    `Hello ${shop.name}! I would like to place an order:`,
    '',
    ...lines.map(
      (l) =>
        `• ${l.product.name} (x${l.quantity}) - ${taka(l.product.price * l.quantity)}`,
    ),
    '',
    `Subtotal: ${taka(subtotal)}`,
    'Please let me know how to proceed!',
  ].join('\n')

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-50 bg-plum-950/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-label="Shopping bag"
        inert={!isOpen}
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between bg-plum-800 p-4 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-blush-300" />
            <h3 className="font-serif text-lg font-bold text-blush-300">
              Your Shopping Bag
            </h3>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="p-1 text-gray-300 hover:text-white"
            aria-label="Close bag"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {lines.length > 0 && (
          <div className="border-b border-blush-300/40 bg-cream-50 px-4 py-3 text-xs text-plum-800">
            {remaining > 0 ? (
              <>
                Add <strong>{taka(remaining)}</strong> more for{' '}
                <strong>free delivery</strong>
              </>
            ) : (
              <strong>🎉 You've unlocked free delivery!</strong>
            )}
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-blush-200">
              <div
                className="h-full rounded-full bg-plum-800 transition-all"
                style={{
                  width: `${Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100)}%`,
                }}
              />
            </div>
          </div>
        )}

        <div className="flex-grow space-y-3 overflow-y-auto p-4">
          {lines.length === 0 ? (
            <div className="space-y-3 py-16 text-center text-gray-400">
              <ShoppingBag className="mx-auto h-12 w-12 text-blush-300" />
              <p className="text-sm">Your shopping bag is empty.</p>
              <button
                onClick={() => setOpen(false)}
                className="text-sm font-semibold text-blush-500 underline"
              >
                Continue shopping
              </button>
            </div>
          ) : (
            lines.map((line) => (
              <div
                key={line.productId}
                className="flex items-center gap-3 rounded-xl border border-blush-300/30 bg-cream-50 p-3"
              >
                <img
                  src={imageUrl(line.product.image, 120)}
                  alt=""
                  className="h-14 w-14 rounded-lg border border-blush-300 object-cover"
                />
                <div className="min-w-0 flex-grow">
                  <h4 className="line-clamp-1 text-sm font-bold text-plum-900">
                    {line.product.name}
                  </h4>
                  <p className="text-xs font-semibold text-plum-800">
                    {taka(line.product.price)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => update(line.productId, -1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-plum-900 ring-1 ring-blush-300 hover:bg-blush-200"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-4 text-center text-sm font-bold">
                    {line.quantity}
                  </span>
                  <button
                    onClick={() => update(line.productId, 1)}
                    className="flex h-7 w-7 items-center justify-center rounded-md bg-white text-plum-900 ring-1 ring-blush-300 hover:bg-blush-200"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <button
                    onClick={() => remove(line.productId)}
                    className="ml-1 p-1 text-gray-400 hover:text-red-600"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-3 border-t border-blush-300/40 bg-cream-50 p-4">
          <div className="flex items-center justify-between text-sm font-semibold text-plum-900">
            <span>Subtotal</span>
            <span className="text-lg font-bold text-plum-800">
              {taka(subtotal)}
            </span>
          </div>
          <p className="text-[11px] text-gray-500">
            Delivery charge is calculated at checkout.
          </p>
          <button
            disabled={lines.length === 0}
            onClick={() => setCheckoutOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-plum-800 px-4 py-3 text-sm font-bold tracking-wider text-blush-300 uppercase shadow-md transition hover:bg-plum-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Proceed to Order{' '}
            <span className="font-bangla normal-case">(অর্ডার করুন)</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <a
            href={lines.length ? whatsappLink(whatsappMessage) : undefined}
            target="_blank"
            rel="noreferrer"
            aria-disabled={lines.length === 0}
            className={`flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white uppercase shadow transition hover:bg-emerald-700 ${
              lines.length === 0 ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            <MessageCircle className="h-4 w-4" /> Quick order via WhatsApp
          </a>
        </div>
      </aside>
      {checkoutOpen && (
        <CheckoutModal onClose={() => setCheckoutOpen(false)} />
      )}
    </>
  )
}
