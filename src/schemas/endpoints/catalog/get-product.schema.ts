import { z } from 'zod'

import { WithLocale } from '@printful-ts/schemas/common'
import { Product, SellingRegionName } from '@printful-ts/schemas/entities'

export const GetProductSearchInput = z
  .object({
    selling_region_name: SellingRegionName.optional().default(
      SellingRegionName.Enum.worldwide,
    ),
  })
  .merge(WithLocale)
export type GetProductSearchInput = z.infer<typeof GetProductSearchInput>

export const GetProductResponse = z.object({
  data: Product,
})
export type GetProductResponse = z.infer<typeof GetProductResponse>
