import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useState } from 'react'
import {
  ArrowLeft,
  Check,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  Truck,
} from 'lucide-react'
import products, { categories } from '@/data/products'
import { ProductCard, productWhatsappMessage } from '@/components/ProductCard'
import { useCart } from '@/lib/cart'
import {
  FREE_DELIVERY_THRESHOLD,
  deliveryZones,
  imageUrl,
  taka,
  whatsappLink,
} from '@/lib/store'

export const Route = createFileRoute('/products/$slug')({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug)
    if (!product) throw notFound()
    return product
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} | MTJZA` },
          { name: 'description', content: loaderData.shortDescription },
          { property: 'og:image', content: loaderData.image },
        ]
      : [],
  }),
  component: ProductPage,
})

function ProductPage() {
  const product = Route.useLoaderData()
  const { add } = useCart()
  const [quantity, setQuantity] = useState(1)
  const category = categories.find((c) => c.id === product.category)
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .concat(products.filter((p) => p.category !== product.category))
    .slice(0, 4)

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/"
        search={{ category: product.category }}
        hash="catalog"
        className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-plum-800 hover:text-blush-500"
      >
        <ArrowLeft className="h-4 w-4" /> Back to {category?.label}
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-blush-300/40 bg-cream-100 shadow-sm">
          <img
            src={imageUrl(product.image, 1000)}
            alt={product.name}
            className="aspect-square h-full w-full object-cover"
          />
        </div>

        <div className="rise space-y-5 md:py-6">
          <div className="flex items-center gap-3 text-xs">
            <span className="rounded-full bg-plum-800 px-3 py-1 font-bold tracking-wider text-blush-300 uppercase">
              {product.badge}
            </span>
            <span className="font-semibold tracking-wider text-blush-500 uppercase">
              {category?.label} ·{' '}
              <span className="font-bangla normal-case">{category?.bn}</span>
            </span>
          </div>
          <h1 className="font-serif text-3xl leading-tight font-bold text-plum-900 md:text-4xl">
            {product.name}
          </h1>
          <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.round(product.rating) ? 'fill-current' : ''}`}
              />
            ))}
            <span className="ml-1 text-plum-800">{product.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-plum-800">
              {taka(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-base text-gray-400 line-through">
                {taka(product.compareAt)}
              </span>
            )}
          </div>
          <p className="leading-relaxed text-gray-700">{product.description}</p>
          <ul className="grid grid-cols-1 gap-2 text-sm text-plum-900 sm:grid-cols-2">
            {product.details.map((d) => (
              <li key={d} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                {d}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="flex items-center rounded-xl border border-blush-300 bg-white">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="p-3 text-plum-900 hover:text-blush-500"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => Math.min(20, q + 1))}
                className="p-3 text-plum-900 hover:text-blush-500"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => add(product.id, quantity)}
              className="flex flex-grow items-center justify-center gap-2 rounded-xl bg-plum-800 px-6 py-3.5 text-sm font-bold tracking-wider text-blush-300 uppercase shadow-md transition hover:bg-plum-900"
            >
              <ShoppingBag className="h-4 w-4" /> Add to bag
            </button>
          </div>
          <a
            href={whatsappLink(productWhatsappMessage(product, quantity))}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-sm font-bold text-white uppercase transition hover:bg-emerald-700"
          >
            <MessageCircle className="h-4 w-4" /> Order on WhatsApp
          </a>

          <div className="flex items-start gap-3 rounded-xl border border-blush-300/40 bg-cream-100 p-4 text-sm text-plum-800">
            <Truck className="mt-0.5 h-5 w-5 shrink-0" />
            <p>
              {deliveryZones.dhaka.label}: {taka(deliveryZones.dhaka.fee)} (
              {deliveryZones.dhaka.eta}) · {deliveryZones.outside.label}:{' '}
              {taka(deliveryZones.outside.fee)} ({deliveryZones.outside.eta}).
              Free delivery over {taka(FREE_DELIVERY_THRESHOLD)}.
            </p>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="mb-6 font-serif text-2xl font-bold text-plum-900">
          You may also like
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  )
}
