import { z } from 'zod'

import {
  FilterSettings,
  HateoasLink,
  Limit,
  Offset,
  Paging,
  PagingHateoasLinks,
  PagingSearchInput,
  WithLocale,
} from '@printful-ts/schemas/common'
import {
  SellingRegionName,
  TechniqueKey,
  VariantStockAvailability,
} from '@printful-ts/schemas/entities'
import {
  ArrayToString,
  StringToArray,
  StringToNumber,
} from '@printful-ts/schemas/utils'

export const GetProductStockAvailabilitySearchInput = z
  .object({
    techniques: ArrayToString(TechniqueKey.optional()).optional(),
    selling_region_name: SellingRegionName.default(
      SellingRegionName.Enum.worldwide,
    ).optional(),
  })
  .merge(WithLocale)
  .merge(PagingSearchInput)

export type GetProductStockAvailabilitySearchInput = z.input<
  typeof GetProductStockAvailabilitySearchInput
>

export const GetProductStockAvailabilitySearchParams = z
  .object({
    techniques: StringToArray.pipe(TechniqueKey.array().optional()).optional(),
    selling_region_name: SellingRegionName.default(
      SellingRegionName.Enum.worldwide,
    ).optional(),
    limit: StringToNumber.pipe(Limit).optional(),
    offset: StringToNumber.pipe(Offset).optional(),
  })
  .merge(WithLocale)
export type GetProductStockAvailabilitySearchParams = z.input<
  typeof GetProductStockAvailabilitySearchParams
>

export const GetProductStockAvailabilityResponse = z.object({
  data: VariantStockAvailability.array(),
  paging: Paging,
  filter_settings: FilterSettings,
  _links: PagingHateoasLinks.merge(
    z.object({
      product: HateoasLink,
    }),
  ),
})
export type GetProductStockAvailabilityResponse = z.infer<
  typeof GetProductStockAvailabilityResponse
>
