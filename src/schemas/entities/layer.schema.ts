import { z } from 'zod'

import { CatalogOption } from './catalog-option.schema'

export const Layer = z.object({
  type: z.string(),
  layer_options: z.array(CatalogOption),
})
export type Layer = z.infer<typeof Layer>
