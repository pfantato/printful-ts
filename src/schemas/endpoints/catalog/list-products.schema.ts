import { z } from 'zod'

import {
  ColorValue,
  InternalId,
  Paging,
  PagingHateoasLinks,
  PagingSearchInput,
  PagingSearchParams,
  SortDirection,
  SortType,
  WithLocale,
} from '@printful-ts/schemas/common'
import {
  Product,
  SellingRegionName,
  TechniqueKey,
} from '@printful-ts/schemas/entities'
import { ArrayToString, StringToArray } from '@printful-ts/schemas/utils'

export const ListProductsSearchInput = z
  .object({
    category_ids: ArrayToString(InternalId).optional(),
    colors: ArrayToString(ColorValue).optional(),
    placements: ArrayToString(z.string()).optional(),
    selling_region_name: SellingRegionName.default(
      SellingRegionName.enum.worldwide,
    ).optional(),
    sort_type: SortType.optional(),
    sort_direction: SortDirection.optional(),
    techniques: ArrayToString(TechniqueKey).optional(),
  })
  .merge(PagingSearchInput)
  .merge(WithLocale)
export type ListProductsSearchInput = z.input<typeof ListProductsSearchInput>

export const ListProductsSearchParams = z
  .object({
    category_ids: StringToArray.pipe(InternalId.array()).optional(),
    colors: StringToArray.pipe(ColorValue.array()).optional(),
    placements: StringToArray.optional(),
    selling_region_name: SellingRegionName.optional(),
    sort_type: SortType.optional(),
    sort_direction: SortDirection.optional(),
    techniques: StringToArray.pipe(TechniqueKey.array()).optional(),
  })
  .merge(PagingSearchParams)
  .merge(WithLocale)

export type ListProductsSearchParams = z.input<typeof ListProductsSearchParams>

export const ListProductsResponse = z.object({
  data: Product.array(),
  paging: Paging,
  _links: PagingHateoasLinks,
})
export type ListProductsResponse = z.infer<typeof ListProductsResponse>
