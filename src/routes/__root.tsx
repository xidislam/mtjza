import {
  HeadContent,
  Link,
  Scripts,
  createRootRoute,
} from '@tanstack/react-router'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import { CartProvider } from '@/lib/cart'

import '../styles.css'

const siteName = 'MTJZA | Gifts · Fashion · Abaya'
const siteDescription =
  'Premium abayas, customised gift hampers and modest fashion for everyone — ছেলে-মেয়ে সবার জন্য. Cash on delivery, bKash & Nagad across Bangladesh.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { title: siteName },
      { name: 'description', content: siteDescription },
      { name: 'theme-color', content: '#3D1E36' },
      { property: 'og:title', content: siteName },
      { property: 'og:description', content: siteDescription },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: '/img/hero.png' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
      { rel: 'apple-touch-icon', href: '/img/logo.png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400..800;1,400..800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap',
      },
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex flex-grow flex-col">{children}</main>
            <Footer />
          </div>
          <CartDrawer />
        </CartProvider>
        <Scripts />
      </body>
    </html>
  )
}

function NotFound() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-serif text-3xl font-bold text-plum-900">
        Page not found
      </h1>
      <p className="mt-3 text-sm text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-full bg-plum-800 px-6 py-3 text-xs font-bold tracking-wider text-blush-300 uppercase"
      >
        Back to shop
      </Link>
    </div>
  )
}
