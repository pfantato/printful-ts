import { z } from 'zod'

import { HateoasLink } from '@printful-ts/schemas/common'
import { ProductVariant } from '@printful-ts/schemas/entities'

export const GetProductVariantResponse = z.object({
  data: z.array(ProductVariant),
  _links: z.object({
    self: HateoasLink.optional(),
    product_variants: HateoasLink.optional(),
    product_details: HateoasLink.optional(),
    variant_prices: HateoasLink.optional(),
    variant_images: HateoasLink.optional(),
  }),
})
export type GetProductVariantResponse = z.infer<
  typeof GetProductVariantResponse
>
