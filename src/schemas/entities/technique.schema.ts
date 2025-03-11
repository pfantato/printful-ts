import { z } from 'zod'

export const TechniqueKey = z.enum([
  'dtg',
  'digital',
  'cut-sew',
  'uv',
  'embroidery',
  'sublimation',
  'dtfilm',
])
export type TechniqueKey = z.infer<typeof TechniqueKey>

export const Technique = z.object({
  key: TechniqueKey,
  display_name: z.string(),
  is_default: z.boolean(),
})
export type Technique = z.infer<typeof Technique>
