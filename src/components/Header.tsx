import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { MessageCircle, Search, ShoppingBag } from 'lucide-react'
import { Logo } from './Logo'
import { useCart } from '@/lib/cart'
import { FREE_DELIVERY_THRESHOLD, shop, taka, whatsappLink } from '@/lib/store'

const nav = [
  { label: 'Home', category: undefined },
  { label: 'Abayas', category: 'Abaya' },
  { label: 'Gift Hampers', category: 'Gifts' },
  { label: 'Women', category: 'Women' },
  { label: 'Men', category: 'Men' },
] as const

export function Header() {
  const { count, setOpen } = useCart()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate({
      to: '/',
      search: { q: query.trim() || undefined },
      hash: 'catalog',
    })
  }

  return (
    <>
      <div className="bg-plum-800 px-4 py-2 text-center text-xs font-medium tracking-wide text-blush-300 md:text-sm">
        🎉 Free delivery across Bangladesh on orders over{' '}
        {taka(FREE_DELIVERY_THRESHOLD)}!{' '}
        <span className="font-bangla opacity-90">
          | সারা বাংলাদেশে ক্যাশ অন ডেলিভারি
        </span>
      </div>
      <header className="sticky top-0 z-40 border-b border-blush-300/40 bg-cream-50/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <form onSubmit={submit} className="relative hidden max-w-xs md:block">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-plum-800/50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search abayas, gift hampers…"
                aria-label="Search products"
                className="w-full rounded-full border border-blush-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none transition placeholder:text-plum-800/40 focus:border-plum-800"
              />
            </form>
            <a
              href={whatsappLink(`Hello ${shop.name}! I have a question.`)}
              target="_blank"
              rel="noreferrer"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-white md:hidden"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <Link to="/" aria-label="MTJZA home">
              <Logo />
            </Link>
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(true)}
                className="relative flex h-11 w-11 items-center justify-center rounded-full bg-plum-800 text-blush-300 shadow-md transition hover:bg-plum-900"
                aria-label={`Open shopping bag, ${count} items`}
              >
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blush-300 px-1 text-[10px] font-bold text-plum-950">
                  {count}
                </span>
              </button>
            </div>
          </div>
          <form onSubmit={submit} className="relative mt-3 md:hidden">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-plum-800/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search abayas, gift hampers…"
              aria-label="Search products"
              className="w-full rounded-full border border-blush-300 bg-white py-2.5 pr-4 pl-10 text-sm outline-none focus:border-plum-800"
            />
          </form>
          <nav className="mt-3 flex items-center justify-start gap-6 overflow-x-auto border-t border-blush-300/30 pt-2.5 text-xs font-semibold tracking-wider text-plum-900 uppercase sm:justify-center">
            {nav.map((item) => (
              <Link
                key={item.label}
                to="/"
                search={item.category ? { category: item.category } : {}}
                hash={item.category ? 'catalog' : undefined}
                className="py-1 whitespace-nowrap transition hover:text-blush-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}
