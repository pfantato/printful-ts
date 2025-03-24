import { z } from 'zod'

import {
  HateoasLink,
  Paging,
  PagingHateoasLinks,
  WithLocale,
} from '@printful-ts/schemas/common'
import {
  Currency,
  ProductPrice,
  SellingRegionName,
} from '@printful-ts/schemas/entities'

export const ListProductPricesSearchParams = z
  .object({
    selling_region_name: SellingRegionName.optional(),
    currency: Currency.optional(),
  })
  .merge(WithLocale)

export type ListProductPricesSearchParams = z.infer<
  typeof ListProductPricesSearchParams
>

export const ListProductPricesResponse = z.object({
  data: ProductPrice.array(),
  paging: Paging,
  _links: PagingHateoasLinks.merge(
    z.object({
      product_details: HateoasLink,
    }),
  ),
})
export type ListProductPricesResponse = z.infer<
  typeof ListProductPricesResponse
>
