import { createServerFn } from '@tanstack/react-start'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '../../db/index.js'
import { orders } from '../../db/schema.js'
import type { OrderLine } from '../../db/schema.js'
import products from '@/data/products'
import { deliveryFee } from '@/lib/store'

const orderInput = z
  .object({
    customerName: z.string().trim().min(2).max(100),
    phone: z
      .string()
      .trim()
      .transform((v) => v.replace(/[\s-]/g, '').replace(/^\+?88/, ''))
      .pipe(z.string().regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi number')),
    address: z.string().trim().min(8).max(500),
    deliveryZone: z.enum(['dhaka', 'outside']),
    paymentMethod: z.enum(['COD', 'bKash', 'Nagad']),
    transactionId: z.string().trim().max(40).optional(),
    note: z.string().trim().max(500).optional(),
    items: z
      .array(
        z.object({
          productId: z.number().int(),
          quantity: z.number().int().min(1).max(20),
        }),
      )
      .min(1)
      .max(30),
  })
  .refine(
    (d) => d.paymentMethod === 'COD' || (d.transactionId?.length ?? 0) >= 6,
    { message: 'Transaction ID is required for bKash / Nagad', path: ['transactionId'] },
  )

export type OrderInput = z.input<typeof orderInput>

function makeCode() {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += alphabet[Math.floor(Math.random() * alphabet.length)]
  }
  return `MTJ-${code}`
}

export const placeOrder = createServerFn({ method: 'POST' })
  .inputValidator((data: OrderInput) => orderInput.parse(data))
  .handler(async ({ data }) => {
    // Prices always come from the catalog, never from the client
    const items: Array<OrderLine> = data.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (!product) throw new Error('A product in your bag is no longer available')
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
      }
    })
    const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
    const fee = deliveryFee(data.deliveryZone, subtotal)

    const [order] = await db
      .insert(orders)
      .values({
        code: makeCode(),
        customerName: data.customerName,
        phone: data.phone,
        address: data.address,
        deliveryZone: data.deliveryZone,
        paymentMethod: data.paymentMethod,
        transactionId:
          data.paymentMethod === 'COD' ? null : data.transactionId || null,
        note: data.note || null,
        items,
        subtotal,
        deliveryFee: fee,
        total: subtotal + fee,
      })
      .returning({ code: orders.code })

    return { code: order.code }
  })

export const getOrder = createServerFn({ method: 'GET' })
  .inputValidator((data: { code: string }) => ({
    code: z.string().regex(/^MTJ-[A-Z0-9]{6}$/).parse(data.code),
  }))
  .handler(async ({ data }) => {
    const [order] = await db
      .select()
      .from(orders)
      .where(eq(orders.code, data.code))
      .limit(1)
    if (!order) return null
    // Only expose what the customer needs on their receipt
    return {
      code: order.code,
      customerName: order.customerName,
      phoneMasked: `${order.phone.slice(0, 3)}*****${order.phone.slice(-3)}`,
      deliveryZone: order.deliveryZone,
      paymentMethod: order.paymentMethod,
      items: order.items,
      subtotal: order.subtotal,
      deliveryFee: order.deliveryFee,
      total: order.total,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
    }
  })
