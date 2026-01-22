import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import type { CartItem } from '@/features/client/types'
import { formatCurrency } from '@/features/client/utils'
import { CART_ITEMS } from '@/features/client/panelData'

type CheckoutLocationState = {
  items: CartItem[]
  total: number
}

type PaymentMethod = 'card' | 'invoice'

export function CheckoutPage() {
  const location = useLocation()
  const state = location.state
  const rawItems = Array.isArray((state as CheckoutLocationState | undefined)?.items)
    ? (state as CheckoutLocationState).items
    : CART_ITEMS
  const items = rawItems.filter((item) => item.qty > 0)
  const total = items.reduce((sum, item) => sum + item.qty * item.unitCost, 0)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card')
  const [orderMessage, setOrderMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)

  const handlePlaceOrder = async () => {
    if (items.length === 0 || total === 0) {
      setOrderMessage('Your cart is empty.')
      return
    }
    setOrderMessage(null)
    setSubmitting(true)

    try {
      
      if (paymentMethod === 'invoice') {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items,
            total,
            paymentMethod: 'invoice',
            status: 'submitted',
          }),
        })

        if (!response.ok) {
          throw new Error('Order submission failed.')
        }

        setOrderMessage('Order submitted. We will follow up with the invoice.')
        return
      }

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total }),
      })

      if (!response.ok) {
        throw new Error('Stripe checkout failed.')
      }

      const { url } = (await response.json()) as { url?: string }
      if (!url) {
        throw new Error('Missing Stripe checkout URL.')
      }

      window.location.assign(url)
    } catch (error) {
      console.error(error)
      setOrderMessage('Checkout demo: backend is not configured yet.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative space-y-10 text-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="tag">Checkout</p>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">Review your order</h1>
          <p className="mt-2 max-w-2xl text-slate-600">Confirm verification services before placing the request.</p>
        </div>
        <Link to="/client-panel" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold">
          Back to panel
        </Link>
      </div>

      <div className="grid gap-8 xl:grid-cols-[2.2fr_1fr]">
        <section className="glass-panel p-6">
          <h2 className="font-display text-2xl">Items</h2>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-semibold text-slate-900">{item.title}</p>
                    <p className="text-slate-600">{item.duration} · {item.service}</p>
                  </div>
                  <span className="text-slate-600">{formatCurrency(item.qty * item.unitCost)}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
                  <span>{item.tier}</span>
                  <span>Qty {item.qty}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <div className="glass-panel p-6">
            <h2 className="font-display text-xl">Summary</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>{formatCurrency(total)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxes</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                <div className="flex items-center justify-between">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-600">Payment method</p>
              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                />
                <span>
                  <span className="font-semibold text-slate-900">Card (Stripe)</span>
                  <span className="mt-1 block text-xs text-slate-600">Fast card payment</span>
                </span>
              </label>

              <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-3 text-sm">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="invoice"
                  checked={paymentMethod === 'invoice'}
                  onChange={() => setPaymentMethod('invoice')}
                />
                <span>
                  <span className="font-semibold text-slate-900">Invoice / Bank transfer</span>
                  <span className="mt-1 block text-xs text-slate-600">For B2B, bank transfer after invoice</span>
                </span>
              </label>
            </div>
            
            {items.length === 0 && (
              <p className="mt-4 text-xs text-slate-600">Your cart is empty.</p>
            )}
            <button onClick={handlePlaceOrder} disabled={submitting || items.length === 0 || total <= 0} className="mt-6 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 text-sm font-semibold text-white">
              {submitting ? 'Processing…' : 'Place order'}
            </button>
            {orderMessage && (
              <p className="mt-4 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-600">
                {orderMessage}
              </p>
            )}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 text-sm text-slate-600">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-600">Notes</p>
            <p className="mt-3">
              After checkout, our verification team will review specs and confirm slot availability within 24 hours.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}
