import { NonNegativeNumber } from '@printful-ts/schemas'
import { z } from 'zod'

export const FakerNumberOptions = z.object({
  min: NonNegativeNumber.optional().default(0),
  max: NonNegativeNumber.optional().default(100000),
  multipleOf: z.number().positive().optional(),
})
export type FakerNumberOptions = z.infer<typeof FakerNumberOptions>

export const FakerPositiveNumberOptions = FakerNumberOptions.omit({
  min: true,
})
export type FakerPositiveNumberOptions = z.infer<
  typeof FakerPositiveNumberOptions
>

export const FakerArrayOptions = FakerNumberOptions.omit({
  multipleOf: true,
}).merge(
  z.object({
    min: NonNegativeNumber.min(1).default(1).optional(),
  }),
)
export type FakerArrayOptions = z.infer<typeof FakerArrayOptions>
