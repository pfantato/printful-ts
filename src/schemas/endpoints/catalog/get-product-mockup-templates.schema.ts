import { z } from 'zod'

import {
  HateoasLink,
  Paging,
  PagingHateoasLinks,
  PagingSearchInput,
  PagingSearchParams,
  WithLocale,
} from '@printful-ts/schemas/common'
import {
  MockupTemplates,
  SellingRegionName,
} from '@printful-ts/schemas/entities'
import { ArrayToString, StringToArray } from '@printful-ts/schemas/utils'

export const GetProductMockupTemplatesSearchInput = z
  .object({
    placements: ArrayToString(z.string()).optional(),
    selling_region_name: SellingRegionName.default(
      SellingRegionName.Enum.worldwide,
    ).optional(),
  })
  .merge(WithLocale)
  .merge(PagingSearchInput)
export type GetProductMockupTemplatesSearchInput = z.input<
  typeof GetProductMockupTemplatesSearchInput
>
export const GetProductMockupTemplatesSearchParams = z
  .object({
    placements: StringToArray.optional(),
    selling_region_name: SellingRegionName.default(
      SellingRegionName.Enum.worldwide,
    ).optional(),
  })
  .merge(WithLocale)
  .merge(PagingSearchParams)
export type GetProductMockupTemplatesSearchParams = z.input<
  typeof GetProductMockupTemplatesSearchParams
>

export const GetProductMockupTemplatesResponse = z.object({
  data: MockupTemplates.array(),
  paging: Paging,
  _links: PagingHateoasLinks.merge(
    z.object({
      product: HateoasLink,
    }),
  ),
})
export type GetProductMockupTemplatesResponse = z.infer<
  typeof GetProductMockupTemplatesResponse
>
