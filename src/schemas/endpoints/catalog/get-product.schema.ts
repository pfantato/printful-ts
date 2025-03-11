import { z } from 'zod'

import { Localized } from '@printful-ts/schemas/common'
import { Product, SellingRegionName } from '@printful-ts/schemas/entities'

export const GetProductSearchParams = Localized(
  z.object({
    selling_region_name: SellingRegionName.optional().default(
      SellingRegionName.Enum.worldwide,
    ),
  }),
)
export type GetProductSearchParams = z.infer<typeof GetProductSearchParams>

export const GetProductResponse = z.object({
  data: Product,
})
export type GetProductResponse = z.infer<typeof GetProductResponse>
