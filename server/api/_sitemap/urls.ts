import { readdir } from 'node:fs/promises'
import { resolve } from 'node:path'

export default defineEventHandler(async () => {
  const urls: { loc: string; lastmod?: string }[] = []

  try {
    const articlesDir = resolve('./content/articles')
    const articleFiles = await readdir(articlesDir)
    for (const file of articleFiles) {
      if (!file.endsWith('.md')) continue
      const slug = file.replace(/\.md$/, '')
      urls.push({ loc: `/blog/${slug}` })
    }
  } catch {}

  try {
    const presentationsDir = resolve('./content/presentations')
    const presentationFiles = await readdir(presentationsDir)
    for (const file of presentationFiles) {
      if (!file.endsWith('.md')) continue
      const slug = file.replace(/\.md$/, '')
      urls.push({ loc: `/presentations/${slug}` })
    }
  } catch {}

  return urls
})

