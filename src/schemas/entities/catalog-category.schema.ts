import { z } from 'zod'

import { HateoasLink } from '@printful-ts/schemas/common'

export const CatalogCategory = z.object({
  id: z.number(),
  parent_id: z.number().optional(),
  image_url: z.string().url(),
  title: z.string(),
  _links: z.object({
    self: HateoasLink,
  }),
})
export type CatalogCategory = z.infer<typeof CatalogCategory>
