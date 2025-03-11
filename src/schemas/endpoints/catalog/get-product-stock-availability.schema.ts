import { z } from 'zod'

import {
  FilterSettings,
  HateoasLink,
  Limit,
  Offset,
  Paging,
  PagingHateoasLinks,
  Localized,
} from '@printful-ts/schemas/common'
import {
  SellingRegionName,
  TechniqueKey,
  VariantStockAvailability,
} from '@printful-ts/schemas/entities'
import {
  arrayToQueryString,
  numberToQueryString,
} from '@printful-ts/schemas/utils'

export const GetProductStockAvailabilitySearchParams = Localized(
  z.object({
    techniques: z.array(TechniqueKey).transform(arrayToQueryString).optional(),
    selling_region_name: SellingRegionName.default(
      SellingRegionName.Enum.worldwide,
    ).optional(),
    limit: Limit.transform(numberToQueryString).optional(),
    offset: Offset.transform(numberToQueryString).optional(),
  }),
)
export type GetProductStockAvailabilitySearchParams = z.infer<
  typeof GetProductStockAvailabilitySearchParams
>

export const GetProductStockAvailabilityResponse = z.object({
  data: z.array(VariantStockAvailability),
  paging: Paging,
  filter_settings: FilterSettings,
  _links: PagingHateoasLinks.extend({
    product: HateoasLink,
  }),
})
export type GetProductStockAvailabilityResponse = z.infer<
  typeof GetProductStockAvailabilityResponse
>
