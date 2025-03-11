import { z } from 'zod'

import { CatalogOption } from './catalog-option.schema'
import { Layer } from './layer.schema'
import { TechniqueKey } from './technique.schema'

export const DesignPlacement = z.object({
  placement: z.string(),
  technique: TechniqueKey,
  print_area_width: z.number(),
  print_area_height: z.number(),
  layers: z.array(Layer),
  placement_options: z.array(CatalogOption),
  conflicting_placements: z.array(z.string()),
})
export type DesignPlacement = z.infer<typeof DesignPlacement>
