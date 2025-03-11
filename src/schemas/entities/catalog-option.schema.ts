import { z } from 'zod'

import { TechniqueKey } from './technique.schema'

export const CatalogOption = z.object({
  name: z.string(),
  techniques: z.array(TechniqueKey),
  type: z.string(),
  values: z.array(z.unknown()),
})
export type CatalogOption = z.infer<typeof CatalogOption>
