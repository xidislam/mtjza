import { Link, createFileRoute } from '@tanstack/react-router'
import { CircleCheck, MessageCircle } from 'lucide-react'
import { getOrder } from '@/server/orders.functions'
import {
  deliveryZones,
  paymentMethods,
  shop,
  taka,
  whatsappLink,
} from '@/lib/store'
import type { DeliveryZone, PaymentMethod } from '@/lib/store'

export const Route = createFileRoute('/order/$code')({
  loader: ({ params }) => getOrder({ data: { code: params.code } }),
  head: () => ({ meta: [{ title: 'Order confirmed | MTJZA' }] }),
  component: OrderPage,
  errorComponent: () => <Missing />,
})

function OrderPage() {
  const order = Route.useLoaderData()
  if (!order) return <Missing />

  const zone = deliveryZones[order.deliveryZone as DeliveryZone]
  const payment = paymentMethods[order.paymentMethod as PaymentMethod]
  const message = [
    `Hello ${shop.name}! I just placed order ${order.code} on your website.`,
    '',
    ...order.items.map(
      (i) => `• ${i.name} (x${i.quantity}) - ${taka(i.price * i.quantity)}`,
    ),
    '',
    `Total: ${taka(order.total)} (${payment.label})`,
  ].join('\n')

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-14">
      <div className="rise overflow-hidden rounded-3xl border border-blush-300/60 bg-white shadow-xl">
        <div className="relative bg-plum-800 px-6 py-10 text-center text-white">
          <CircleCheck className="mx-auto h-14 w-14 text-blush-300" />
          <h1 className="mt-4 font-serif text-3xl font-bold text-blush-300">
            Thank you, {order.customerName.split(' ')[0]}!
          </h1>
          <p className="font-bangla mt-2 text-cream-100">
            আপনার অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে
          </p>
          <p className="mt-4 inline-block rounded-full border border-blush-300/60 px-4 py-1.5 text-sm tracking-widest text-blush-300">
            Order <strong>{order.code}</strong>
          </p>
        </div>

        <div className="space-y-6 p-6 md:p-8">
          <p className="text-sm text-gray-600">
            Our team will call you at <strong>{order.phoneMasked}</strong> to
            confirm your delivery details. Please keep your order number handy.
          </p>

          <div className="divide-y divide-blush-300/40 rounded-xl border border-blush-300/40">
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between p-3 text-sm"
              >
                <span className="text-plum-900">
                  {item.name}{' '}
                  <span className="text-gray-500">× {item.quantity}</span>
                </span>
                <span className="font-semibold">
                  {taka(item.price * item.quantity)}
                </span>
              </div>
            ))}
            <div className="space-y-1 bg-cream-50 p-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>{taka(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery ({zone.label})</span>
                <span>
                  {order.deliveryFee === 0 ? 'Free' : taka(order.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between pt-1 text-base font-bold text-plum-900">
                <span>Total</span>
                <span>{taka(order.total)}</span>
              </div>
            </div>
          </div>

          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-xs tracking-wider text-gray-500 uppercase">
                Payment
              </dt>
              <dd className="font-semibold text-plum-900">{payment.label}</dd>
            </div>
            <div>
              <dt className="text-xs tracking-wider text-gray-500 uppercase">
                Estimated delivery
              </dt>
              <dd className="font-semibold text-plum-900">{zone.eta}</dd>
            </div>
          </dl>

          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink(message)}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white uppercase transition hover:bg-emerald-700"
            >
              <MessageCircle className="h-4 w-4" /> Confirm on WhatsApp
            </a>
            <Link
              to="/"
              className="flex flex-1 items-center justify-center rounded-xl bg-plum-800 px-5 py-3 text-xs font-bold tracking-wider text-blush-300 uppercase transition hover:bg-plum-900"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

function Missing() {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center">
      <h1 className="font-serif text-3xl font-bold text-plum-900">
        Order not found
      </h1>
      <p className="mt-3 text-sm text-gray-600">
        We couldn't find that order. Please contact us on WhatsApp with your
        order number.
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
