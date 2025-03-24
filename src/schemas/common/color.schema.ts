import { z } from 'zod'
import color from 'color-string'

export const ColorValue = z
  .string()
  .pipe(z.coerce.string().refine(val => color.get(val) !== null))

export type ColorValue = z.infer<typeof ColorValue>

export const Color = z.object({
  name: z.string(),
  value: ColorValue,
})
export type Color = z.infer<typeof Color>
