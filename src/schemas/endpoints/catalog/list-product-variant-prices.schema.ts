import { z } from 'zod'

import {
  HateoasLink,
  Paging,
  PagingHateoasLinks,
  WithLocale,
} from '@printful-ts/schemas/common'
import {
  Currency,
  SellingRegionName,
  VariantPrice,
} from '@printful-ts/schemas/entities'

export const ListProductVariantPricesSearchParams = z
  .object({
    selling_region_name: SellingRegionName.optional(),
    currency: Currency.optional(),
  })
  .merge(WithLocale)
export type ListProductVariantPricesSearchParams = z.infer<
  typeof ListProductVariantPricesSearchParams
>

export const ListProductVariantPricesResponse = z.object({
  data: VariantPrice.array(),
  paging: Paging,
  _links: PagingHateoasLinks.merge(
    z.object({
      product_details: HateoasLink,
      product_prices: HateoasLink,
    }),
  ),
})
export type ListProductVariantPricesResponse = z.infer<
  typeof ListProductVariantPricesResponse
>
