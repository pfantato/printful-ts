import { z } from 'zod'

import {
  HateoasLink,
  Paging,
  PagingHateoasLinks,
  Localized,
} from '@printful-ts/schemas/common'
import {
  Currency,
  ProductPrice,
  SellingRegionName,
} from '@printful-ts/schemas/entities'

export const ListProductPricesSearchParams = Localized(
  z.object({
    selling_region_name: SellingRegionName.optional(),
    currency: Currency.optional(),
  }),
)
export type ListProductPricesSearchParams = z.infer<
  typeof ListProductPricesSearchParams
>

export const ListProductPricesResponse = z.object({
  data: z.array(ProductPrice),
  paging: Paging,
  _links: PagingHateoasLinks.extend({
    product_details: HateoasLink,
  }),
})
export type ListProductPricesResponse = z.infer<
  typeof ListProductPricesResponse
>
