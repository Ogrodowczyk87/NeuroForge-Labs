import { Link } from 'react-router-dom'
import type { Metric } from '../types'

export type ClientPanelHeaderProps = {
  firstName: string
  onSignOut: () => void
  metrics: Metric[]
}

export function ClientPanelHeader({ firstName, onSignOut, metrics }: ClientPanelHeaderProps) {
  return (
    <header className="glass-panel p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="tag">Orders cockpit</p>
          <h1 className="mt-3 font-display text-3xl md:text-4xl">Welcome back, {firstName}</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Monitor processor projects, review verification orders, and keep fabrication deliverables on-track from a single console.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link to="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold">
            ↖ Return to site
          </Link>
          <button
            type="button"
            onClick={onSignOut}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5"
          >
            Sign out
          </button>
        </div>
      </div>

      <MetricsGrid metrics={metrics} />
    </header>
  )
}

function MetricsGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.label} className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-600">{metric.label}</p>
          <p className="mt-4 text-3xl font-semibold">{metric.value}</p>
          <p className="text-sm text-slate-600">{metric.detail}</p>
        </div>
      ))}
    </div>
  )
}
