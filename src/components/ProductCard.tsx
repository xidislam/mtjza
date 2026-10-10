import { Link } from '@tanstack/react-router'
import { MessageCircle, ShoppingBag, Star } from 'lucide-react'
import type { Product } from '@/data/products'
import { useCart } from '@/lib/cart'
import { imageUrl, shop, taka, whatsappLink } from '@/lib/store'

export function productWhatsappMessage(product: Product, quantity = 1) {
  return [
    `Hello ${shop.name}! I want to order this product:`,
    '',
    `*${product.name}*${quantity > 1 ? ` (x${quantity})` : ''}`,
    `Price: ${taka(product.price * quantity)}`,
  ].join('\n')
}

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()

  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-blush-300/40 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="block"
      >
        <div className="relative aspect-square overflow-hidden bg-cream-100">
          <img
            src={imageUrl(product.image, 600)}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute top-3 left-3 rounded-full bg-plum-800 px-2.5 py-1 text-[10px] font-bold tracking-wider text-blush-300 uppercase">
            {product.badge}
          </span>
        </div>
        <div className="space-y-2 p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold tracking-wider text-blush-500 uppercase">
              {product.category}
            </span>
            <span className="flex items-center gap-1 font-bold text-amber-500">
              <Star className="h-3 w-3 fill-current" /> {product.rating.toFixed(1)}
            </span>
          </div>
          <h3 className="line-clamp-1 font-serif text-base font-bold text-plum-900 transition group-hover:text-blush-500">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-xs text-gray-600">
            {product.shortDescription}
          </p>
          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-plum-800">
              {taka(product.price)}
            </span>
            {product.compareAt && (
              <span className="text-xs text-gray-400 line-through">
                {taka(product.compareAt)}
              </span>
            )}
          </div>
        </div>
      </Link>
      <div className="grid grid-cols-2 gap-2 p-4 pt-0">
        <button
          onClick={() => add(product.id)}
          className="flex items-center justify-center gap-1.5 rounded-xl bg-plum-800 px-3 py-2.5 text-xs font-bold text-blush-300 shadow transition hover:bg-plum-900"
        >
          <ShoppingBag className="h-3.5 w-3.5" /> Add
        </button>
        <a
          href={whatsappLink(productWhatsappMessage(product))}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-2.5 text-xs font-bold text-white transition hover:bg-emerald-700"
        >
          <MessageCircle className="h-3.5 w-3.5" /> Order
        </a>
      </div>
    </article>
  )
}
