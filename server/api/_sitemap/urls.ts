import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async () => {
  const urls: { loc: string; lastmod?: string; changefreq?: string; priority?: number }[] = []

  // Static pages
  urls.push(
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/tools', changefreq: 'monthly', priority: 0.8 },
    { loc: '/tools/uuid-generator', changefreq: 'monthly', priority: 0.7 },
    { loc: '/tools/base64', changefreq: 'monthly', priority: 0.7 },
    { loc: '/tools/document-generator', changefreq: 'monthly', priority: 0.7 },
    { loc: '/tools/device-battery-life-estimator', changefreq: 'monthly', priority: 0.7 },
    { loc: '/presentations', changefreq: 'monthly', priority: 0.8 },
    { loc: '/open-source-usages', changefreq: 'yearly', priority: 0.3 },
  )

  // Dynamic blog articles
  try {
    const articlesDir = resolve('./content/articles')
    const articleFiles = await readdir(articlesDir)
    for (const file of articleFiles) {
      if (!file.endsWith('.md')) continue
      const slug = file.replace(/\.md$/, '')
      urls.push({ loc: `/blog/${slug}`, changefreq: 'yearly', priority: 0.6 })
    }
  } catch {}

  // Dynamic presentations
  try {
    const presentationsDir = resolve('./content/presentations')
    const presentationFiles = await readdir(presentationsDir)
    for (const file of presentationFiles) {
      if (!file.endsWith('.md')) continue
      const slug = file.replace(/\.md$/, '')
      urls.push({ loc: `/presentations/${slug}`, changefreq: 'yearly', priority: 0.5 })
    }
  } catch {}

  return urls
})

