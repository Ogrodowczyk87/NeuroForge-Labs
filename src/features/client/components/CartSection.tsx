import type { CartItem } from '../types'
import { formatCurrency } from '../utils'

type CartSectionProps = {
  items: CartItem[]
  total: number
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
  onCheckout: () => void
}

  
export function CartSection({ items, total, onIncrement, onDecrement, onCheckout }: CartSectionProps) {
  const cartItems = items.filter((item) => item.qty > 0)
  const availableItems = items.filter((item) => item.qty === 0)

  return (
    <section className="glass-panel p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Shopping cart</p>
          <h2 className="mt-2 font-display text-xl">Verification services</h2>
        </div>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Total {formatCurrency(total)}</span>
      </div>

      <div className="mt-6 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-sm text-slate-400">Cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <CartLineItem key={item.id} item={item} onIncrement={onIncrement} onDecrement={onDecrement} />
          ))
        )}
      </div>

      {availableItems.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Add services</p>
          {availableItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-3 text-sm">
              <div>
                <p className="font-semibold text-slate-900">{item.title}</p>
                <p className="text-xs text-slate-600">{item.duration} · {item.service}</p>
              </div>
              <button
                type="button"
                onClick={() => onIncrement(item.id)}
                className="rounded-full border border-slate-200 px-3 py-1 text-xs"
              >
                + Add
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <div className="flex items-center justify-between text-slate-600">
          <span>Total</span>
          <span className="text-lg font-semibold text-slate-900">{formatCurrency(total)}</span>
        </div>
        <button
          type="button"
          onClick={onCheckout}
          className="mt-4 w-full rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 py-3 text-sm font-semibold text-white"
        >
          Checkout
        </button>
      </div>
    </section>
  )
}

type CartLineItemProps = {
  item: CartItem
  onIncrement: (id: string) => void
  onDecrement: (id: string) => void
}

function CartLineItem({ item, onIncrement, onDecrement }: CartLineItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between text-sm">
        <div>
          <p className="font-semibold text-slate-900">{item.title}</p>
          <p className="text-slate-600">{item.duration} · {item.service}</p>
        </div>
        <span className="text-slate-600">{formatCurrency(item.qty * item.unitCost)}</span>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-slate-600">
        <span>{item.tier}</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onDecrement(item.id)}
            disabled={item.qty === 0}
            className="rounded-full border border-slate-200 px-2 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label={`Zmniejsz ${item.title}`}
          >
            -
          </button>
          <span className="text-slate-900">{item.qty}</span>
          <button
            type="button"
            onClick={() => onIncrement(item.id)}
            className="rounded-full border border-slate-200 px-2"
            aria-label={`Zwiększ ${item.title}`}
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
