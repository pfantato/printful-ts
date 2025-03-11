import { z } from 'zod'

import {
  HateoasLink,
  Paging,
  PagingHateoasLinks,
  Localized,
} from '@printful-ts/schemas/common'
import {
  Currency,
  SellingRegionName,
  VariantPrice,
} from '@printful-ts/schemas/entities'

export const ListProductVariantPricesSearchParams = Localized(
  z.object({
    selling_region_name: SellingRegionName.optional(),
    currency: Currency.optional(),
  }),
)
export type ListProductVariantPricesSearchParams = z.infer<
  typeof ListProductVariantPricesSearchParams
>

export const ListProductVariantPricesResponse = z.object({
  data: z.array(VariantPrice),
  paging: Paging,
  _links: PagingHateoasLinks.extend({
    product_details: HateoasLink,
    product_prices: HateoasLink,
  }),
})
export type ListProductVariantPricesResponse = z.infer<
  typeof ListProductVariantPricesResponse
>
