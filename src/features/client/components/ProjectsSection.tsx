import type { Project } from '../types'
import { formatCurrency } from '../utils'

export function ProjectsSection({ projects }: { projects: Project[] }) {
  const visibleProjects = projects

  return (
    <section className="glass-panel p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Projects</p>
          <h2 className="mt-2 font-display text-2xl">Active workloads</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Design stage</p>
          <h3 className="font-semibold text-xl text-slate-900">{project.title}</h3>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold text-fuchsia-900 ${project.badgeClass}`}>{project.stage}</span>
      </div>
      <p className="mt-4 text-xs uppercase tracking-[0.3em] text-slate-500">Timeline</p>
      <div className="mt-2 flex gap-2 text-xs font-semibold">
        {project.milestones.map((item, index) => (
          <span key={item} className={index === project.focusIndex ? 'text-slate-900' : 'text-slate-500'}>
            {item}
          </span>
        ))}
      </div>
      <div className="mt-3 h-2 rounded-full bg-slate-200">
        <div className="h-full rounded-full bg-gradient-to-r from-sky-400 via-blue-500 to-blue-700" style={{ width: `${project.progress}%` }} />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 text-sm text-slate-400">
        <div>
          <p className="text-xs uppercase tracking-[0.3em]">Created</p>
          <p className="text-slate-900">{project.created}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em]">Updated</p>
          <p className="text-slate-900">{project.updated}</p>
        </div>
      </div>
      <div className="mt-5 space-y-2 text-sm">
        {project.alerts.map((alert) => (
          <div key={alert} className="flex items-center gap-2 text-slate-600">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
            {alert}
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-slate-400">Budget</p>
      <p className="text-2xl font-semibold text-slate-900">{formatCurrency(project.budget)}</p>
    </article>
  )
}
