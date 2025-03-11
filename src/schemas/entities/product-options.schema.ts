import { z } from 'zod'

export const ProductOptionsName = z.enum([
  'inside_pocket',
  'stitch_color',
  'notes',
  'lifelike',
  'custom_border_color',
  'base_color',
  'trim_color',
  'color_reduction_mode',
])
export type ProductOptionsName = z.infer<typeof ProductOptionsName>

export const ProductOptions = z.object({
  name: ProductOptionsName,
  value: z.boolean(),
})
export type ProductOptions = z.infer<typeof ProductOptions>
