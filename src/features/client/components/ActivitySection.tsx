import type { ActivityItem } from '../types'

export function ActivitySection({ entries }: { entries: ActivityItem[] }) {
  return (
    <section className="glass-panel p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl">Recent activity</h2>
        <button className="text-xs text-slate-600 hover:text-core">Show all</button>
      </div>
      <div className="mt-5 space-y-4">
        {entries.map((activity) => (
          <ActivityEntry key={activity.id} activity={activity} />
        ))}
      </div>
    </section>
  )
}

function ActivityEntry({ activity }: { activity: ActivityItem }) {
  const initials = activity.author
    .split(' ')
    .map((word) => word[0])
    .join('')

  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold">{initials}</div>
      <div>
        <p className="text-sm text-slate-900">
          <span className="font-semibold">{activity.author}</span> {activity.action}
        </p>
        <p className="text-xs text-slate-600">{activity.timeAgo}</p>
      </div>
    </div>
  )
}
