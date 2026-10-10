import { Link, createFileRoute } from '@tanstack/react-router'
import {
  Gift,
  MessageCircle,
  PackageCheck,
  Shirt,
  ShieldCheck,
  Sparkles,
  Truck,
  User,
} from 'lucide-react'
import products, { categories } from '@/data/products'
import type { Category } from '@/data/products'
import { ProductCard } from '@/components/ProductCard'
import {
  FREE_DELIVERY_THRESHOLD,
  imageUrl,
  shop,
  taka,
  whatsappLink,
} from '@/lib/store'

type CatalogSearch = { category?: Category; q?: string }

const categoryIds = categories.map((c) => c.id)

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): CatalogSearch => ({
    category: categoryIds.includes(search.category as Category)
      ? (search.category as Category)
      : undefined,
    q: typeof search.q === 'string' && search.q ? search.q : undefined,
  }),
  component: Home,
})

const categoryIcons = {
  Gifts: Gift,
  Abaya: Shirt,
  Women: Sparkles,
  Men: User,
} as const

function Home() {
  const { category, q } = Route.useSearch()
  const query = q?.toLowerCase()
  const visible = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!query ||
        [p.name, p.category, p.shortDescription].some((t) =>
          t.toLowerCase().includes(query),
        )),
  )
  const activeLabel = categories.find((c) => c.id === category)

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-plum-800 text-white">
        <img
          src={imageUrl('/img/hero.png', 1600)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-plum-950/95 via-plum-900/80 to-plum-800/30" />
        <div className="dot-grid absolute inset-0 opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-28 lg:px-8">
          <div className="rise max-w-2xl space-y-5">
            <span className="inline-block rounded-full border border-blush-300 px-4 py-1 text-xs font-medium tracking-widest text-blush-300 uppercase">
              New Arrivals Collection
            </span>
            <h1 className="font-serif text-4xl leading-[1.1] font-bold text-blush-300 md:text-6xl">
              Gifts, Fashion
              <br />
              <span className="text-cream-50 italic">& Abaya</span>
            </h1>
            <p className="max-w-xl text-base font-light text-cream-100 md:text-lg">
              Premium abayas, customised gift hampers and modest fashion,
              carefully crafted for your special moments.
            </p>
            <p className="font-bangla text-base font-medium text-blush-300 md:text-lg">
              ✨ ছেলে-মেয়ে সবার জন্য ✨
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#catalog"
                className="rounded-full bg-blush-300 px-7 py-3.5 text-xs font-bold tracking-wider text-plum-950 uppercase shadow-lg transition hover:-translate-y-0.5 hover:bg-blush-400"
              >
                Explore Collection
              </a>
              <a
                href={whatsappLink(
                  `Hello ${shop.name}! I have an inquiry about your products.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-xs font-bold tracking-wider text-white uppercase shadow-lg transition hover:bg-emerald-700"
              >
                <MessageCircle className="h-4 w-4" /> Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick categories */}
      <section className="relative z-10 mx-auto -mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-blush-300/50 bg-white p-4 shadow-xl md:p-6">
          <p className="mb-3 text-center text-xs font-bold tracking-wider text-plum-800 uppercase md:text-left">
            Shop by category /{' '}
            <span className="font-bangla normal-case">ক্যাটাগরি বেছে নিন</span>
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((c) => {
              const Icon = categoryIcons[c.id]
              const active = category === c.id
              return (
                <Link
                  key={c.id}
                  to="/"
                  search={active ? {} : { category: c.id }}
                  hash="catalog"
                  className={`group flex flex-col items-center justify-center gap-1 rounded-xl border px-4 py-3.5 text-center transition ${
                    active
                      ? 'border-plum-800 bg-plum-800 text-white'
                      : 'border-plum-800/15 bg-plum-800/5 hover:bg-plum-800 hover:text-white'
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${active ? 'text-blush-300' : 'text-blush-500 group-hover:text-blush-300'}`}
                  />
                  <span className="font-bangla text-sm font-bold">{c.bn}</span>
                  <span
                    className={`text-[10px] tracking-wider uppercase ${active ? 'text-blush-300' : 'text-gray-500 group-hover:text-blush-300'}`}
                  >
                    {c.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section
        id="catalog"
        className="mx-auto w-full max-w-7xl scroll-mt-40 px-4 py-14 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="font-serif text-3xl font-bold text-plum-900 md:text-4xl">
              {activeLabel ? activeLabel.label : 'Featured Catalog'}
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              {q ? `Results for “${q}” · ` : ''}
              {visible.length} {visible.length === 1 ? 'product' : 'products'}
            </p>
          </div>
          {(category || q) && (
            <Link
              to="/"
              hash="catalog"
              className="text-xs font-semibold text-blush-500 underline hover:text-plum-800"
            >
              Clear filters
            </Link>
          )}
        </div>
        {visible.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-blush-300 py-16 text-center text-gray-500">
            <p className="text-sm">No products found. Try another search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Promises */}
      <section className="border-y border-blush-300/40 bg-cream-100">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            {
              icon: Truck,
              title: 'Delivery across Bangladesh',
              text: `Free on orders over ${taka(FREE_DELIVERY_THRESHOLD)}`,
            },
            {
              icon: ShieldCheck,
              title: 'Cash on Delivery',
              text: 'Or pay securely with bKash / Nagad',
            },
            {
              icon: PackageCheck,
              title: 'Easy Returns & Exchange',
              text: 'Hassle-free size exchange',
            },
          ].map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-plum-800 text-blush-300">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-serif font-bold text-plum-900">{title}</p>
                <p className="text-sm text-gray-600">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
