import { Link } from '@tanstack/react-router'
import { Facebook, Instagram, MapPin, MessageCircle } from 'lucide-react'
import { deliveryZones, shop } from '@/lib/store'
import type { Category } from '@/data/products'

export function Footer() {
  return (
    <footer className="mt-auto border-t border-plum-800 bg-plum-950 py-14 text-cream-100">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <span className="font-serif text-2xl font-bold text-blush-300">
            {shop.name}
          </span>
          <p className="text-sm text-gray-400">
            Your trusted online shop for luxury abayas, modest fashion and
            elegant gift hampers.
          </p>
          <p className="font-bangla text-sm font-medium text-blush-300">
            ছেলে-মেয়ে সবার জন্য
          </p>
        </div>
        <div>
          <h4 className="mb-4 font-serif text-sm font-bold tracking-wider text-blush-300 uppercase">
            Shop
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-300">
            {[
              ['Abaya Collection', 'Abaya'],
              ['Gift Hampers', 'Gifts'],
              ["Women's Wear", 'Women'],
              ["Men's Panjabi & Attar", 'Men'],
            ].map(([label, category]) => (
              <li key={category}>
                <Link
                  to="/"
                  search={{ category: category as Category }}
                  hash="catalog"
                  className="hover:text-blush-300"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-serif text-sm font-bold tracking-wider text-blush-300 uppercase">
            Customer Care
          </h4>
          <ul className="space-y-2.5 text-sm text-gray-300">
            <li>Cash on Delivery available</li>
            <li>
              Delivery: {deliveryZones.dhaka.eta} (Dhaka),{' '}
              {deliveryZones.outside.eta} (outside)
            </li>
            <li>bKash / Nagad payment</li>
            <li>Easy returns & exchange</li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-serif text-sm font-bold tracking-wider text-blush-300 uppercase">
            Contact
          </h4>
          <p className="mb-2 flex items-center gap-2 text-sm text-gray-300">
            <MessageCircle className="h-4 w-4 text-emerald-400" /> WhatsApp:{' '}
            {shop.whatsappDisplay}
          </p>
          <p className="mb-5 flex items-center gap-2 text-sm text-gray-300">
            <MapPin className="h-4 w-4 text-blush-300" /> {shop.location}
          </p>
          <div className="flex gap-3">
            <a
              href={shop.facebookUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-plum-800 text-blush-300 transition hover:bg-blush-300 hover:text-plum-950"
            >
              <Facebook className="h-4 w-4" />
            </a>
            <a
              href={shop.instagramUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-plum-800 text-blush-300 transition hover:bg-blush-300 hover:text-plum-950"
            >
              <Instagram className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-plum-800/60 px-4 pt-6 text-center text-xs text-gray-500 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {shop.name}. All rights reserved.
      </div>
    </footer>
  )
}
