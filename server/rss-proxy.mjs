import express from 'express'
import cors from 'cors'
import Parser from 'rss-parser'
import { error } from 'console'

const app = express()
const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (RSS Proxy; +https://localhost)',
    Accept: 'application/rss+xml, application/xml;q=0.9, */*;q=0.8',
  },
})

const PORT = process.env.RSS_PROXY_PORT || 5051
const CACHE_TTL_MS = 10 * 60 * 1000

const FEEDS = {
  nvidia_newsroom: [
    'https://nvidianews.nvidia.com/releases.xml',
    'https://nvidianews.nvidia.com/cats/press_release.xml',
  ],
  nvidia_blog: ['https://feeds.feedburner.com/nvidiablog'],
  hackaday: ['https://hackaday.com/blog/feed/'],
}

const cache = new Map()

app.use(cors())


app.get('/api/rss', async (req, res) => {
  const source = String(req.query.source || '').trim()
  const feedUrls = FEEDS[source]

  if (!feedUrls) {
    return res.status(400).json({
      error: 'Unknown feed source.',
      available: Object.keys(FEEDS),
    })
  }

  const cached = cache.get(source)
  const now = Date.now()
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    return res.json(cached.payload)
  }

  try {
    let feed = null
    let lastError = null

    for (const feedUrl of feedUrls) {
      try {
        feed = await parser.parseURL(feedUrl)
        if (feed?.items?.length) {
          break
        }
      } catch (error) {
        lastError = error
      }
    }

    if (!feed) {
      throw lastError || new Error('No feed available.')
    }

    const items = (feed.items || []).slice(0, 10).map((item) => ({
      title: item.title || 'Untitled',
      link: item.link || '',
      pubDate: item.isoDate || item.pubDate || '',
      summary: item.contentSnippet || item.content || '',
    }))

    const payload = {
      source,
      title: feed.title || source,
      items,
      fetchedAt: new Date().toISOString(),
    }

    cache.set(source, { payload, timestamp: now })
    return res.json(payload)
  } catch (error) {
    console.error(`RSS fetch failed for ${source}:`, error)
    return res.status(502).json({ error: 'Failed to fetch RSS feed.' })
  }
})

app.get('/api/rss/sources', (_req, res) => {
  res.json(FEEDS)
})

app.listen(PORT, () => {
  console.log(`RSS proxy listening on http://localhost:${PORT}`)
})
