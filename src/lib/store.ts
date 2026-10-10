// Shop-wide settings. Update these to match the real MTJZA business details.
export const shop = {
  name: 'MTJZA',
  tagline: 'Gifts · Fashion · Abaya',
  // International format without "+" for wa.me links
  whatsappNumber: '8801700000000',
  whatsappDisplay: '+880 1700-000000',
  // Personal/merchant number customers send bKash / Nagad payments to
  paymentNumber: '01700-000000',
  location: 'Dhaka, Bangladesh',
  facebookUrl: 'https://facebook.com/',
  instagramUrl: 'https://instagram.com/',
}

export const deliveryZones = {
  dhaka: { label: 'Inside Dhaka', bn: 'ঢাকার ভিতরে', fee: 70, eta: '2–3 days' },
  outside: {
    label: 'Outside Dhaka',
    bn: 'ঢাকার বাইরে',
    fee: 130,
    eta: '3–5 days',
  },
} as const

export type DeliveryZone = keyof typeof deliveryZones

export const FREE_DELIVERY_THRESHOLD = 2000

export const paymentMethods = {
  COD: { label: 'Cash on Delivery', bn: 'ক্যাশ অন ডেলিভারি' },
  bKash: { label: 'bKash', bn: 'বিকাশ' },
  Nagad: { label: 'Nagad', bn: 'নগদ' },
} as const

export type PaymentMethod = keyof typeof paymentMethods

export function deliveryFee(zone: DeliveryZone, subtotal: number) {
  if (subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD) return 0
  return deliveryZones[zone].fee
}

export function taka(amount: number) {
  return `৳${amount.toLocaleString('en-IN')}`
}

export function imageUrl(src: string, width: number) {
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp`
}

export function whatsappLink(message: string) {
  return `https://wa.me/${shop.whatsappNumber}?text=${encodeURIComponent(message)}`
}
