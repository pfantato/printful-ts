import { z } from 'zod'

import { HateoasLink, Unit, Localized } from '@printful-ts/schemas/common'
import { ProductSizeGuide } from '@printful-ts/schemas/entities'
import { arrayToQueryString } from '@printful-ts/schemas/utils'

export const GetProductSizeGuideSearchParams = Localized(
  z.object({
    unit: z.array(Unit).transform(arrayToQueryString).optional(),
  }),
)
export type GetProductSizeGuideSearchParams = z.infer<
  typeof GetProductSizeGuideSearchParams
>

export const GetProductSizeGuideResponse = z.object({
  data: ProductSizeGuide,
  _links: z.object({
    self: HateoasLink,
    product_details: HateoasLink,
  }),
})
export type GetProductSizeGuideResponse = z.infer<
  typeof GetProductSizeGuideResponse
>
