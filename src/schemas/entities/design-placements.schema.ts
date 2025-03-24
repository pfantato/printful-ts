import { z } from 'zod'

import { CatalogOption } from './catalog-option.schema'
import { Layer } from './layer.schema'
import { TechniqueKey } from './technique.schema'

export const DesignPlacement = z.object({
  placement: z.string(),
  technique: TechniqueKey,
  print_area_width: z.number(),
  print_area_height: z.number(),
  layers: Layer.array(),
  placement_options: CatalogOption.array(),
  conflicting_placements: z.string().array(),
})
export type DesignPlacement = z.infer<typeof DesignPlacement>
