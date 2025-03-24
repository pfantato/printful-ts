import { z } from 'zod'

import { TechniqueKey } from './technique.schema'

export const MockupStyle = z.object({
  id: z.number(),
  category_name: z.string(),
  view_name: z.string(),
  restricted_to_variants: z.any().array().array().optional(),
})
export type MockupStyle = z.infer<typeof MockupStyle>

export const MockupStyles = z.object({
  placement: z.string(),
  display_name: z.string(),
  technique: TechniqueKey,
  print_area_width: z.number(),
  print_area_height: z.number(),
  print_area_type: z.enum(['simple', 'advanced']),
  dpi: z.number(),
  mockup_styles: MockupStyle.array(),
})
export type MockupStyles = z.infer<typeof MockupStyles>
