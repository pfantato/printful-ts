import { z } from 'zod'

import { ColorValue } from '@printful-ts/schemas/common'

export const VariantImage = z.object({
  placement: z.string(),
  background_image: z.string().nullable(),
  background_color: ColorValue.nullable(),
  image_url: z.string().url().nullable(),
})
export type VariantImage = z.infer<typeof VariantImage>

export const VariantImages = z.object({
  catalog_variant_id: z.number(),
  color: ColorValue,
  primary_hex_color: ColorValue.nullable(),
  secondary_hex_color: ColorValue.nullable(),
  images: z.array(VariantImage),
})
export type VariantImages = z.infer<typeof VariantImages>
