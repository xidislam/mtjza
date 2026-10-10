import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { LoaderCircle, X } from 'lucide-react'
import { useCart } from '@/lib/cart'
import {
  deliveryFee,
  deliveryZones,
  paymentMethods,
  shop,
  taka,
} from '@/lib/store'
import type { DeliveryZone, PaymentMethod } from '@/lib/store'
import { placeOrder } from '@/server/orders.functions'

const inputClass =
  'w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm outline-none transition focus:border-plum-800 focus:ring-2 focus:ring-blush-300/50'

export function CheckoutModal({ onClose }: { onClose: () => void }) {
  const { lines, subtotal, clear, setOpen } = useCart()
  const navigate = useNavigate()
  const [zone, setZone] = useState<DeliveryZone>('dhaka')
  const [payment, setPayment] = useState<PaymentMethod>('COD')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fee = deliveryFee(zone, subtotal)
  const total = subtotal + fee

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    setSubmitting(true)
    setError(null)
    try {
      const { code } = await placeOrder({
        data: {
          customerName: String(form.get('name') ?? ''),
          phone: String(form.get('phone') ?? ''),
          address: String(form.get('address') ?? ''),
          deliveryZone: zone,
          paymentMethod: payment,
          transactionId: String(form.get('trx') ?? '') || undefined,
          note: String(form.get('note') ?? '') || undefined,
          items: lines.map((l) => ({
            productId: l.productId,
            quantity: l.quantity,
          })),
        },
      })
      clear()
      setOpen(false)
      onClose()
      navigate({ to: '/order/$code', params: { code } })
    } catch (err) {
      const message = err instanceof Error ? err.message : ''
      setError(
        message.includes('Bangladeshi')
          ? 'Please enter a valid mobile number, e.g. 017XXXXXXXX.'
          : message.includes('Transaction')
            ? 'Please enter the bKash / Nagad Transaction ID (TrxID).'
            : 'Something went wrong placing your order. Please check your details and try again.',
      )
      setSubmitting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-plum-950/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title"
        onClick={(e) => e.stopPropagation()}
        className="rise max-h-[92vh] w-full max-w-lg space-y-4 overflow-y-auto rounded-2xl border border-blush-300 bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-blush-300/40 pb-3">
          <h3
            id="checkout-title"
            className="font-serif text-xl font-bold text-plum-900"
          >
            Complete Your Order
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-plum-900"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Full Name" bn="আপনার নাম">
            <input
              name="name"
              required
              minLength={2}
              autoComplete="name"
              placeholder="e.g. Nusrat Jahan"
              className={inputClass}
            />
          </Field>
          <Field label="Phone Number" bn="মোবাইল নাম্বার">
            <input
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              inputMode="tel"
              placeholder="017XXXXXXXX"
              className={inputClass}
            />
          </Field>
          <Field label="Full Delivery Address" bn="ঠিকানা">
            <textarea
              name="address"
              required
              minLength={8}
              rows={2}
              autoComplete="street-address"
              placeholder="House no, Road no, Area, City"
              className={inputClass}
            />
          </Field>

          <Field label="Delivery Area" bn="ডেলিভারি এলাকা">
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(deliveryZones) as Array<DeliveryZone>).map((z) => (
                <Choice
                  key={z}
                  name="zone"
                  checked={zone === z}
                  onChange={() => setZone(z)}
                >
                  <span className="text-xs font-bold">
                    {deliveryZones[z].label}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {deliveryFee(z, subtotal) === 0
                      ? 'Free'
                      : taka(deliveryZones[z].fee)}{' '}
                    · {deliveryZones[z].eta}
                  </span>
                </Choice>
              ))}
            </div>
          </Field>

          <Field label="Payment Method" bn="পেমেন্ট পদ্ধতি">
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(paymentMethods) as Array<PaymentMethod>).map(
                (p) => (
                  <Choice
                    key={p}
                    name="payment"
                    checked={payment === p}
                    onChange={() => setPayment(p)}
                  >
                    <span
                      className={`text-xs font-bold ${
                        p === 'bKash'
                          ? 'text-pink-600'
                          : p === 'Nagad'
                            ? 'text-orange-600'
                            : ''
                      }`}
                    >
                      {paymentMethods[p].label}
                    </span>
                  </Choice>
                ),
              )}
            </div>
          </Field>

          {payment !== 'COD' && (
            <div className="space-y-3 rounded-lg border border-blush-300/60 bg-cream-50 p-3 text-xs text-plum-800">
              <p>
                Send <strong>{taka(total)}</strong> via{' '}
                <strong>{payment}</strong> ("Send Money") to{' '}
                <strong>{shop.paymentNumber}</strong>, then enter the
                Transaction ID below.
              </p>
              <input
                name="trx"
                required
                minLength={6}
                maxLength={40}
                placeholder="Transaction ID (TrxID)"
                className={inputClass}
              />
            </div>
          )}

          <Field label="Note (optional)" bn="বিশেষ নির্দেশনা" optional>
            <input
              name="note"
              maxLength={500}
              placeholder="Size, gift message, preferred delivery time…"
              className={inputClass}
            />
          </Field>

          <div className="space-y-1.5 rounded-lg border border-blush-300/40 bg-cream-50 p-3 text-sm text-plum-900">
            <Row label="Subtotal" value={taka(subtotal)} />
            <Row
              label="Delivery"
              value={fee === 0 ? 'Free' : taka(fee)}
            />
            <div className="flex items-center justify-between border-t border-blush-300/40 pt-2 font-bold">
              <span>Total</span>
              <span className="text-lg text-plum-800">{taka(total)}</span>
            </div>
          </div>

          {error && (
            <p role="alert" className="rounded-lg bg-red-50 p-3 text-xs text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting || lines.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-plum-800 py-3 text-sm font-bold tracking-wider text-blush-300 uppercase shadow transition hover:bg-plum-900 disabled:opacity-60"
          >
            {submitting ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" /> Placing order…
              </>
            ) : (
              <>
                Confirm Order{' '}
                <span className="font-bangla normal-case">
                  (অর্ডার কনফার্ম করুন)
                </span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  bn,
  optional,
  children,
}: {
  label: string
  bn: string
  optional?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-plum-900">
        {label} / <span className="font-bangla">{bn}</span>
        {!optional && ' *'}
      </span>
      {children}
    </label>
  )
}

function Choice({
  name,
  checked,
  onChange,
  children,
}: {
  name: string
  checked: boolean
  onChange: () => void
  children: React.ReactNode
}) {
  return (
    <label
      className={`flex cursor-pointer flex-col items-center justify-center gap-0.5 rounded-lg border p-2.5 text-center transition ${
        checked
          ? 'border-plum-800 bg-cream-50 ring-1 ring-plum-800'
          : 'border-gray-300 hover:bg-cream-50'
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      {children}
    </label>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-gray-600">
      <span>{label}</span>
      <span className="font-semibold text-plum-900">{value}</span>
    </div>
  )
}
