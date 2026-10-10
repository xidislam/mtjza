export type Category = 'Abaya' | 'Gifts' | 'Women' | 'Men'

export interface Product {
  id: number
  slug: string
  name: string
  category: Category
  price: number
  compareAt?: number
  rating: number
  badge: string
  image: string
  shortDescription: string
  description: string
  details: Array<string>
}

export const categories: Array<{
  id: Category
  label: string
  bn: string
}> = [
  { id: 'Gifts', label: 'Gift Hampers', bn: 'গিফট হ্যাম্পার' },
  { id: 'Abaya', label: 'Abaya Collection', bn: 'আবায়া কালেকশন' },
  { id: 'Women', label: 'Women', bn: 'মেয়েদের' },
  { id: 'Men', label: 'Men', bn: 'ছেলেদের' },
]

const products: Array<Product> = [
  {
    id: 1,
    slug: 'dubai-silk-velvet-luxe-abaya',
    name: 'Dubai Silk Velvet Luxe Abaya',
    category: 'Abaya',
    price: 3850,
    compareAt: 4500,
    rating: 4.9,
    badge: 'Best Seller',
    image: '/img/abaya-velvet.png',
    shortDescription: 'Premium Nidha & silk blend with delicate sleeve embroidery.',
    description:
      'Our signature abaya in a deep plum silk-velvet blend that falls beautifully and stays comfortable all day. Finished with hand-guided rose-gold embroidery along the sleeves for a quiet touch of luxury at weddings, Eid and dawat.',
    details: [
      'Nidha & silk-velvet blend',
      'Sizes 50–60 (custom length on request)',
      'Hand-finished sleeve embroidery',
      'Comes with matching inner belt',
    ],
  },
  {
    id: 2,
    slug: 'customized-luxury-gift-hamper',
    name: 'Customized Luxury Gift Hamper',
    category: 'Gifts',
    price: 2650,
    rating: 5.0,
    badge: 'Popular Gift',
    image: '/img/hamper-luxury.png',
    shortDescription:
      'Scented candle, prayer mat, chocolates and a personalised card.',
    description:
      'A thoughtful hamper you can make your own. Each box is packed by hand with a scented candle, a soft travel prayer mat, premium chocolates and a handwritten card with your message — ready to gift.',
    details: [
      'Personalised handwritten card',
      'Scented soy candle',
      'Travel prayer mat',
      'Premium chocolates',
    ],
  },
  {
    id: 3,
    slug: 'embroidered-cotton-panjabi',
    name: 'Embroidered Cotton Panjabi',
    category: 'Men',
    price: 2200,
    rating: 4.8,
    badge: 'New',
    image: '/img/panjabi-cotton.png',
    shortDescription: 'Breathable cotton Panjabi for traditional occasions.',
    description:
      'A soft, breathable cotton Panjabi with tonal embroidery on the collar and placket. Easy to wear for Jummah, Eid and family gatherings.',
    details: [
      '100% fine cotton',
      'Sizes 38–46',
      'Tonal collar & placket embroidery',
      'Wooden buttons',
    ],
  },
  {
    id: 4,
    slug: 'rose-blush-chiffon-hijab-set',
    name: 'Rose Blush Chiffon Hijab Set',
    category: 'Women',
    price: 1250,
    rating: 4.7,
    badge: 'Must Have',
    image: '/img/hijab-set.png',
    shortDescription: 'Set of 3 Georgette chiffon hijabs with matching caps.',
    description:
      'Three lightweight Georgette chiffon hijabs in rose blush, dusty pink and cream — each with a matching under-cap. Soft, breathable and easy to style.',
    details: [
      '3 hijabs + 3 matching caps',
      'Georgette chiffon',
      '180 × 75 cm each',
      'Gift-ready pouch',
    ],
  },
  {
    id: 5,
    slug: 'classic-black-front-open-abaya',
    name: 'Classic Black Front-Open Abaya',
    category: 'Abaya',
    price: 2950,
    rating: 4.8,
    badge: 'Essential',
    image: '/img/abaya-black.png',
    shortDescription: 'Daily-wear front-open abaya with matching sheila.',
    description:
      'The everyday essential: a comfortable front-open abaya in a soft black crepe with subtle satin trim, paired with a matching sheila.',
    details: [
      'Soft crepe fabric',
      'Sizes 50–60',
      'Matching sheila included',
      'Hidden snap buttons',
    ],
  },
  {
    id: 6,
    slug: 'couple-special-celebration-box',
    name: 'Couple Special Celebration Box',
    category: 'Gifts',
    price: 3400,
    rating: 4.9,
    badge: 'Special',
    image: '/img/couple-box.png',
    shortDescription: 'Curated gift set for anniversaries and celebrations.',
    description:
      'A velvet-lined keepsake box for two, with a pair of fragrances, engraved keepsakes and dried flowers. Made for anniversaries, weddings and special days.',
    details: [
      'Two fragrances',
      'Engraved keepsakes (names on request)',
      'Velvet-lined keepsake box',
      'Dried flower arrangement',
    ],
  },
  {
    id: 7,
    slug: 'royal-attar-trio',
    name: 'Royal Attar Trio',
    category: 'Men',
    price: 1650,
    rating: 4.8,
    badge: 'Gift Idea',
    image: '/img/attar-set.png',
    shortDescription: 'Three alcohol-free attars in ornate glass bottles.',
    description:
      'Three long-lasting, alcohol-free attars — Oud, Musk and Rose — in ornate glass bottles. A classic gift for him (and her).',
    details: [
      'Oud, White Musk & Taifi Rose',
      'Alcohol-free',
      '6 ml × 3 bottles',
      'Presented on a gift tray',
    ],
  },
  {
    id: 8,
    slug: 'eid-mubarak-hamper',
    name: 'Eid Mubarak Hamper',
    category: 'Gifts',
    price: 2950,
    rating: 4.9,
    badge: 'Seasonal',
    image: '/img/eid-hamper.png',
    shortDescription: 'Premium dates, sweets and a crescent lantern basket.',
    description:
      'Share the joy of Eid with a woven basket of premium Ajwa dates, sweets, a crescent lantern and a festive blush ribbon — delivered across Bangladesh.',
    details: [
      'Premium Ajwa dates',
      'Assorted sweets',
      'Decorative crescent lantern',
      'Woven gift basket',
    ],
  },
]

export default products
