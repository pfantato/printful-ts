import { z } from 'zod'

import {
  HateoasLink,
  Paging,
  PagingHateoasLinks,
  PagingSearchInput,
  PagingSearchParams,
  WithLocale,
} from '@printful-ts/schemas/common'
import { MockupStyles, SellingRegionName } from '@printful-ts/schemas/entities'
import { ArrayToString, StringToArray } from '@printful-ts/schemas/utils'

export const GetProductMockupsSearchInput = z
  .object({
    placements: ArrayToString(z.string()).optional(),
    selling_region_name: SellingRegionName.default(
      SellingRegionName.Enum.worldwide,
    ).optional(),
  })
  .merge(PagingSearchInput)
  .merge(WithLocale)
export type GetProductMockupsSearchInput = z.input<
  typeof GetProductMockupsSearchInput
>

export const GetProductMockupsSearchParams = z
  .object({
    placements: StringToArray.optional(),
    selling_region_name: SellingRegionName.default(
      SellingRegionName.Enum.worldwide,
    ).optional(),
  })
  .merge(PagingSearchParams)
  .merge(WithLocale)

export type GetProductMockupsSearchParams = z.input<
  typeof GetProductMockupsSearchParams
>

export const GetProductMockupsResponse = z.object({
  data: MockupStyles.array(),
  paging: Paging,
  _links: PagingHateoasLinks.merge(
    z.object({
      product: HateoasLink,
    }),
  ),
})
export type GetProductMockupsResponse = z.infer<
  typeof GetProductMockupsResponse
>
