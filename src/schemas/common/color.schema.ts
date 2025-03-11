import { z } from 'zod'
import color from 'color-string'

export const ColorValue = z.string().refine(val => {
  try {
    return color.get(val) !== null
  } catch {
    return false
  }
})
export type ColorValue = z.infer<typeof ColorValue>

export const Color = z.object({
  name: z.string(),
  value: ColorValue,
})
export type Color = z.infer<typeof Color>
