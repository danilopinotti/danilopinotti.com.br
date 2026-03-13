import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    articles: defineCollection({
      type: 'page',
      source: 'articles/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        image: z.string().optional(),
        publishedAt: z.string(),
        tags: z.string().optional(),
        keywords: z.string().optional(),
        author: z.object({
          name: z.string(),
        }),
      }),
    }),
    presentations: defineCollection({
      type: 'page',
      source: 'presentations/**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        link: z.string(),
        embed_link: z.string(),
        publishedAt: z.string(),
        keywords: z.string().optional(),
        author: z.object({
          name: z.string(),
        }),
      }),
    }),
  },
})

