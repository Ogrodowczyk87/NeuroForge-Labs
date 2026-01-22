import { Link } from 'react-router-dom'
import { stageDetails, type StageId } from '@/features/stages/data'

const stageOrder: StageId[] = ['architecture', 'fabrication', 'optimization', 'community']

function StagePage({ stageId }: { stageId: StageId }) {
  const stage = stageDetails[stageId]
  const currentIndex = stageOrder.indexOf(stageId)
  const previous = currentIndex > 0 ? stageOrder[currentIndex - 1] : null
  const next = stage.next

  return (
    <section className="space-y-10">
      <header className="glass-panel relative overflow-hidden p-8">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-core/10 to-transparent opacity-60" aria-hidden />
        <div className="relative space-y-4">
          <p className="text-xs font-mono uppercase tracking-[0.5em] text-slate-600">{stage.kicker}</p>
          <h1 className="font-display text-4xl text-slate-900 md:text-5xl">{stage.title}</h1>
          <p className="text-lg text-slate-600">{stage.summary}</p>
          <p className="text-slate-400">{stage.description}</p>
          <div className="flex flex-wrap gap-3 pt-4">
            {previous && (
              <Link to={`/${previous}`} className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-5 py-2 text-sm text-slate-900">
                ← Previous module
              </Link>
            )}
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900">
              Back to landing
            </Link>
            {next && (
              <Link to={`/${next}`} className="inline-flex items-center gap-2 rounded-full bg-core px-5 py-2 text-sm font-semibold text-white shadow-core">
                Next module →
              </Link>
            )}
          </div>
        </div>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.5fr,1fr]">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-8">
          <p className="text-sm font-mono uppercase tracking-[0.5em] text-slate-600">Action plan</p>
          <ul className="mt-6 space-y-4">
            {stage.checklist.map((item) => (
              <li key={item} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1 h-2 w-2 rounded-full bg-orbit shadow-aurora" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
        <aside className="rounded-[1.75rem] border border-slate-200 bg-gradient-to-b from-white/10 via-white/5 to-transparent p-8">
          <p className="text-sm font-mono uppercase tracking-[0.5em] text-slate-600">Metrics</p>
          <dl className="mt-6 space-y-4">
            {stage.metrics.map((metric) => (
              <div key={metric.label}>
                <dt className="text-slate-400">{metric.label}</dt>
                <dd className="text-2xl font-semibold text-slate-900">{metric.value}</dd>
              </div>
            ))}
          </dl>
          <blockquote className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">{stage.quote}</blockquote>
        </aside>
      </div>

      <section className="grid gap-6 md:grid-cols-3">
        {stage.insights.map((insight) => (
          <article key={insight.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-orbit">Insights</p>
            <h3 className="mt-3 text-xl font-semibold text-slate-900">{insight.title}</h3>
            <p className="text-slate-600">{insight.body}</p>
          </article>
        ))}
      </section>
    </section>
  )
}

export const ArchitecturePage = () => <StagePage stageId="architecture" />
export const FabricationPage = () => <StagePage stageId="fabrication" />
export const OptimizationPage = () => <StagePage stageId="optimization" />
export const CommunityPage = () => <StagePage stageId="community" />
