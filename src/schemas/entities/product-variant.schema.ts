import { z } from 'zod'

import { ColorValue, HateoasLink } from '@printful-ts/schemas/common'

export const ProductVariant = z.object({
  id: z.number(),
  catalog_product_id: z.number(),
  name: z.string(),
  image: z.string().url(),
  size: z.string(),
  color: ColorValue,
  color_code: ColorValue,
  color_code2: ColorValue,
  _links: z.object({
    self: HateoasLink,
    product_details: HateoasLink,
    product_variants: HateoasLink,
    variant_prices: HateoasLink,
    variant_images: HateoasLink,
    variant_availability: HateoasLink,
  }),
})
export type ProductVariant = z.infer<typeof ProductVariant>
