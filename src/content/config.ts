// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tag: z.string(),
    client: z.string().optional(),
    services: z.array(z.string()).optional(),
    team: z.array(z.string()).optional(),
    image: z.string(),
    year: z.string(),
    link: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    
    // Skill 07: Modular Content Blocks
    blocks: z.array(z.union([
      // 1. Full Width Image
      z.object({
        type: z.literal('full-image'),
        src: z.string(),
        alt: z.string().optional(),
        caption: z.string().optional()
      }),
      // 2. Two Column Text
      z.object({
        type: z.literal('two-column'),
        left: z.string(),
        right: z.string()
      }),
      // 3. Video Loop
      z.object({
        type: z.literal('video'),
        src: z.string(),
        poster: z.string().optional()
      }),
      // 4. Code Snippet
      z.object({
        type: z.literal('code'),
        lang: z.string(),
        code: z.string(),
        filename: z.string().optional()
      })
    ])).optional() 
  }),
});

export const collections = {
  'projects': projectsCollection,
};
