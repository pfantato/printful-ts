import { z } from 'zod'

import { ColorValue } from '@printful-ts/schemas/common'

export const VariantImage = z.object({
  placement: z.string(),
  background_image: z.string().optional(),
  background_color: ColorValue.optional(),
  image_url: z.string().url().optional(),
})
export type VariantImage = z.infer<typeof VariantImage>

export const VariantImages = z.object({
  catalog_variant_id: z.number(),
  color: ColorValue,
  primary_hex_color: ColorValue.optional(),
  secondary_hex_color: ColorValue.optional(),
  images: VariantImage.array(),
})
export type VariantImages = z.infer<typeof VariantImages>
