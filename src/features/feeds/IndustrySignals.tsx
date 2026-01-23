import { useEffect, useMemo, useState } from 'react'

type FeedItem = {
  title: string
  link: string
  pubDate: string
  summary: string
}

type FeedResponse = {
  source: string
  title: string
  items: FeedItem[]
  fetchedAt: string
}

const FEED_SOURCES = [
  { id: 'nvidia_newsroom', label: 'NVIDIA Newsroom' },
  { id: 'nvidia_blog', label: 'NVIDIA Blog' },
  { id: 'hackaday', label: 'Open Hardware Radar' },
]

export function IndustrySignals() {
  const [feeds, setFeeds] = useState<Record<string, FeedResponse | null>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadFeeds = async () => {
      try {
        setLoading(true)
        setError(null)
        const results = await Promise.all(
          FEED_SOURCES.map(async (source) => {
            const response = await fetch(`/api/rss?source=${source.id}`, {
              signal: controller.signal,
            })
            if (!response.ok) {
              throw new Error(`Feed ${source.id} failed`)
            }
            const data = (await response.json()) as FeedResponse
            return [source.id, data] as const
          }),
        )

        setFeeds(Object.fromEntries(results))
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          setError('Could not load industry signals.')
        }
      } finally {
        setLoading(false)
      }
    }

    loadFeeds()
    return () => controller.abort()
  }, [])

  const formattedDate = useMemo(
    () => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }),
    [],
  )

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="tag">Industry signals</p>
          <h2 className="mt-4 text-3xl font-semibold text-slate-900">Intel brief</h2>
          <p className="text-slate-400">Live scan across NVIDIA and open hardware updates.</p>
        </div>
        <span className="text-xs uppercase tracking-[0.4em] text-slate-400">RSS Radar</span>
      </div>

      {loading ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading signals…
        </div>
      ) : error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-600">{error}</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {FEED_SOURCES.map((source) => {
            const feed = feeds[source.id]
            return (
              <article key={source.id} className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{source.label}</p>
                  <span className="text-xs text-slate-400">Top {feed?.items.length ?? 0}</span>
                </div>
                <div className="mt-4 space-y-3">
                  {feed?.items.slice(0, 3).map((item) => (
                    <a
                      key={item.link || item.title}
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="block rounded-xl border border-slate-100 px-3 py-3 text-sm transition hover:border-core/40 hover:bg-slate-50"
                    >
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                        <span>{item.summary?.slice(0, 80) || 'Brief update'}</span>
                        <span>{item.pubDate ? formattedDate.format(new Date(item.pubDate)) : ''}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
