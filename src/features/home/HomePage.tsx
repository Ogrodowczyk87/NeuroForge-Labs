import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { stageCards } from '@/features/stages/data'

const stats = [
  { label: 'Weekly iterations', value: '36', detail: 'full RTL → GDS loops' },
  { label: 'Response time', value: '48 min', detail: 'average lab feedback' },
  { label: 'Partners', value: '57', detail: 'active validation labs' },
]

const roadmap = [
  {
    title: 'Concept & ISA',
    detail: 'Rapid microarchitecture sketches, test-suite setup, and power-budget analysis.',
  },                                    
  {
    title: 'RTL model',
    detail: 'Auto-generated IP blocks, timing reports, and exports to P&R flows.',
  },
  {
    title: 'Fabrication',
    detail: 'Mask control, DRC/LVS checklists, and fab-slot scheduling.',
  },
  {
    title: 'Validation',
    detail: 'Probe data, binning, and OEM feedback in a single cockpit.',
  },
]

export function HomePage() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!elements.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="space-y-20">
      <section className="grid items-center gap-10 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-8">
          <p className="tag">NeuroForge Labs</p>
          <div className="space-y-6">
            <h1 className="font-display text-4xl leading-tight text-slate-900 md:text-6xl">
              Build processors from core sketch to fab validation
            </h1>
            <p className="text-lg text-slate-600 md:text-xl">
              One environment that steers architecture, fabrication, and testing. Remove friction between firmware,
              QA, and foundry partners.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/architecture"
              className="inline-flex items-center gap-2 rounded-full bg-core px-6 py-3 font-semibold text-white shadow-core transition hover:-translate-y-0.5"
            >
              Start core design
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/fabrication"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-900 hover:border-core/60"
            >
              Plan fabrication
            </Link>
           
          </div>
          <dl className="grid gap-6 text-sm sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-slate-200 bg-white px-4 py-5">
                <dt className="text-slate-400">{stat.label}</dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-900">{stat.value}</dd>
                <p className="text-slate-400">{stat.detail}</p>
              </div>
            ))}
          </dl>
        </div>
        <div className="glass-panel relative overflow-hidden p-8">
          <div className="absolute inset-0 bg-mesh opacity-60" aria-hidden />
          <div className="relative space-y-6">
            <p className="text-sm uppercase tracking-[0.5em] text-slate-600">Chip map</p>
            <h2 className="text-3xl font-semibold text-slate-900">Pipeline from sketch to wafer</h2>
            <p className="text-slate-600">
              Visualize every stage of the process: ownership, risks, and checklist completion.
            </p>
            <div className="grid gap-5 text-sm">
              {roadmap.map((step, index) => (
                <div
                  key={step.title}
                  className="reveal relative flex items-start gap-4"
                  data-reveal
                  style={{ ['--reveal-delay' as string]: `${index * 120}ms` }}
                >
                  <span
                    className="timeline-line"
                    aria-hidden
                    data-last={index === roadmap.length - 1}
                  />
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white font-mono text-sm">
                    {index + 1}
                  </div>
                  <div className="timeline-glow" aria-hidden />
                  <div>
                    <p className="font-semibold text-slate-900">{step.title}</p>
                    <p className="text-slate-400">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="tag">Process stages</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900">Four modules guiding the processor build</h2>
            <p className="text-slate-400">
              Each module works as its own workspace while sharing data and checklists.
            </p>
          </div>
          <Link to="/community" className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm text-slate-900">
            View validation ↗
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {stageCards.map((stage) => (
            <article
              key={stage.id}
              className="relative overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            >
              <div className={`pointer-events-none absolute inset-0 opacity-70 blur-3xl bg-gradient-to-br ${stage.accent}`} aria-hidden />
              <div className="relative flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.4em] text-slate-600">{stage.label}</p>
                  <span className="rounded-full border border-slate-200 px-3 py-1 text-xs font-mono text-slate-600">{stage.signal}</span>
                </div>
                <p className="text-lg text-slate-700">{stage.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                  <span className="font-semibold text-slate-900">{stage.metricValue}</span>
                  <span>{stage.metricLabel}</span>
                </div>
                <Link
                  to={stage.path}
                  className="group inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Enter module
                  <span className="transition group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-600">End-to-end process</p>
            <h2 className="text-2xl font-semibold text-slate-900">Unify architecture, fabrication, and QA teams</h2>
          </div>
          <Link to="/optimization" className="inline-flex items-center gap-2 rounded-full bg-orbit/15 px-4 py-2 text-sm font-semibold text-slate-900">
            Optimize DVFS profiles
          </Link>
        </div>
        <ol className="mt-8 grid gap-6 md:grid-cols-2">
          {roadmap.map((phase, index) => (
            <li key={phase.title} className="rounded-2xl border border-slate-200 bg-white p-5">
              <p className="text-sm font-mono text-slate-400">Stage {index + 1}</p>
              <h3 className="mt-2 text-xl font-semibold text-slate-900">{phase.title}</h3>
              <p className="text-slate-400">{phase.detail}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  )
}
