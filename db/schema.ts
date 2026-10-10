import { integer, jsonb, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export type OrderLine = {
  productId: number
  name: string
  price: number
  quantity: number
}

export const orders = pgTable('orders', {
  id: serial().primaryKey(),
  code: text().notNull().unique(),
  customerName: text('customer_name').notNull(),
  phone: text().notNull(),
  address: text().notNull(),
  deliveryZone: text('delivery_zone').notNull(),
  paymentMethod: text('payment_method').notNull(),
  transactionId: text('transaction_id'),
  note: text(),
  items: jsonb().$type<Array<OrderLine>>().notNull(),
  subtotal: integer().notNull(),
  deliveryFee: integer('delivery_fee').notNull(),
  total: integer().notNull(),
  status: text().notNull().default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})
