import { z } from 'zod'

import { ColorValue } from '@printful-ts/schemas/common'

import { TechniqueKey } from './technique.schema'

export const TemplatePositioning = z.enum(['overlay', 'background'])
export type TemplatePositioning = z.infer<typeof TemplatePositioning>

export const Orientation = z.enum(['horizontal', 'vertical', 'any'])
export type Orientation = z.infer<typeof Orientation>

export const TemplateType = z.enum([
  'custom',
  'native',
  'color_group',
  'advanced',
])
export type TemplateType = z.infer<typeof TemplateType>

export const MockupTemplates = z.object({
  catalog_variant_ids: z.array(z.number()),
  placement: z.string(),
  technique: TechniqueKey,
  image_url: z.string().url(),
  background_url: z.string().url().nullable(),
  background_color: ColorValue.nullable(),
  template_width: z.number(),
  template_height: z.number(),
  print_area_width: z.number(),
  print_area_height: z.number(),
  print_area_top: z.number(),
  print_area_left: z.number(),
  template_positioning: TemplatePositioning,
  orientation: Orientation,
  template_type: TemplateType,
})
export type MockupTemplates = z.infer<typeof MockupTemplates>
