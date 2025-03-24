import { z } from 'zod'

import { TechniqueKey } from './technique.schema'

export const CatalogOption = z.object({
  name: z.string(),
  techniques: TechniqueKey.array(),
  type: z.string(),
  values: z.unknown().array(),
})
export type CatalogOption = z.infer<typeof CatalogOption>
