import { z } from 'zod'

import {
  Limit,
  Offset,
  Paging,
  PagingHateoasLinks,
  SortDirection,
  SortType,
  Localized,
} from '@printful-ts/schemas/common'
import {
  Product,
  SellingRegionName,
  TechniqueKey,
} from '@printful-ts/schemas/entities'
import {
  arrayToQueryString,
  numberToQueryString,
} from '@printful-ts/schemas/utils'

export const ListProductsSearchParams = Localized(
  z.object({
    category_ids: z.array(z.number()).transform(arrayToQueryString).optional(),
    colors: z.array(z.string()).transform(arrayToQueryString).optional(),
    placements: z.array(z.string()).transform(arrayToQueryString).optional(),
    limit: Limit.transform(numberToQueryString).optional(),
    offset: Offset.transform(numberToQueryString).optional(),
    selling_region_name: SellingRegionName.default(
      SellingRegionName.enum.worldwide,
    ).optional(),
    sort_type: SortType.optional(),
    sort_direction: SortDirection.optional(),
    techniques: z.array(TechniqueKey).transform(arrayToQueryString).optional(),
  }),
)
export type ListProductsSearchParams = z.infer<typeof ListProductsSearchParams>

export const ListProductsResponse = z.object({
  data: z.array(Product),
  paging: Paging,
  _links: PagingHateoasLinks,
})
export type ListProductsResponse = z.infer<typeof ListProductsResponse>
