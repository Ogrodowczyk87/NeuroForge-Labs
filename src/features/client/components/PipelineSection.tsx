import type { PipelineStage, TimelineEvent } from '../types'

export function PipelineSection({ stages, events }: { stages: PipelineStage[]; events: TimelineEvent[] }) {
  return (
    <section className="glass-panel p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-2xl">Project pipeline</h2>
        <button className="text-sm text-slate-600 hover:text-core">View all</button>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {stages.map((stage) => (
          <div key={stage.title} className="rounded-2xl border border-slate-200/50 bg-white p-4">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{stage.title}</p>
              <span className="text-xs text-slate-600">Due {stage.due}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{stage.detail}</p>
            <p className="mt-1 text-xs text-emerald-700">{stage.status}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {events.map((event) => (
          <div key={event.title} className="rounded-2xl border border-dashed border-slate-200/70 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-600">{event.tag}</p>
            <p className="mt-2 font-semibold">{event.title}</p>
            <p className="text-sm text-slate-600">{event.date}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
