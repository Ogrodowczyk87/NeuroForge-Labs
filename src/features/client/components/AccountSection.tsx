import type { InvoiceSummary } from '../types'
import { formatCurrency } from '../utils'

export function AccountSection({ invoice, total }: { invoice: InvoiceSummary; total: number }) {
  return (
    <section className="glass-panel space-y-4 p-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Account</p>
        <h2 className="mt-2 font-display text-xl">Invoice overview</h2>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm">
        <div className="flex items-center justify-between text-slate-600">
          <span>Latest invoice</span>
          <span>{invoice.id}</span>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Status</p>
          <span className="rounded-full bg-sky-200 px-3 py-1 text-xs font-semibold text-sky-700">{invoice.status}</span>
        </div>
        <div className="mt-4 text-slate-600">
          <p>Amount</p>
          <p className="text-2xl font-semibold text-slate-900">{formatCurrency(total)}</p>
        </div>
      </div>
      <div className="flex gap-3">
        <button className="flex-1 rounded-2xl border border-slate-200 py-3 text-sm font-semibold text-slate-900">View billing</button>
        <button className="flex-1 rounded-2xl border border-emerald-300 bg-emerald-100 py-3 text-sm font-semibold text-emerald-700">Download PDF</button>
      </div>
    </section>
  )
}
