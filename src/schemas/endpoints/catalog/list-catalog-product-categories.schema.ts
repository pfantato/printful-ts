import { z } from 'zod'

import {
  HateoasLink,
  Paging,
  PagingHateoasLinks,
} from '@printful-ts/schemas/common'
import {
  CatalogCategory,
  SellingRegionName,
} from '@printful-ts/schemas/entities'

export const ListProductCategoriesSearchParams = z.object({
  selling_region_name: SellingRegionName.default(
    SellingRegionName.Enum.worldwide,
  ).optional(),
})
export type ListProductCategoriesSearchParams = z.infer<
  typeof ListProductCategoriesSearchParams
>

export const ListProductCategoriesResponse = z.object({
  data: CatalogCategory.array(),
  paging: Paging,
  _links: PagingHateoasLinks.merge(
    z.object({
      all_categories: HateoasLink,
    }),
  ),
})
export type ListProductCategoriesResponse = z.infer<
  typeof ListProductCategoriesResponse
>
