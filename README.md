# MTJZA — Gifts · Fashion · Abaya

The online store for **MTJZA**, a Bangladeshi boutique selling abayas, gift hampers and modest fashion for everyone (ছেলে-মেয়ে সবার জন্য).

Customers can browse by category (গিফট হ্যাম্পার, আবায়া কালেকশন, মেয়েদের, ছেলেদের), search, open product pages, fill a shopping bag and place an order with Cash on Delivery, bKash or Nagad. Every order is saved to the shop's database and gets its own receipt page. Customers can also order any product, or the whole bag, straight through WhatsApp with the message already written for them.

## Tech

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, server functions)
- Tailwind CSS 4 with MTJZA's plum / blush / cream theme
- Netlify Database (managed Postgres) with Drizzle ORM for orders
- Netlify Image CDN for optimised product photography

## Run locally

```bash
pnpm install
netlify dev
```

`netlify dev` is recommended so the database and image CDN work locally.

## Making it yours

- **Contact & payment numbers, social links:** `src/lib/store.ts` (`shop`)
- **Delivery fees and free-delivery threshold:** `src/lib/store.ts`
- **Products, prices and photos:** `src/data/products.ts` and `public/img/`

## Viewing orders

Orders are stored in the `orders` table of the site's Netlify Database. You can see them in the Netlify dashboard under the project's Database tab.

## What could come next

- A password-protected owner dashboard to view orders and mark them confirmed, shipped or delivered
- Managing products from the dashboard instead of editing code
- SMS or WhatsApp notifications when a new order arrives
- Automatic bKash / Nagad merchant payment gateway
