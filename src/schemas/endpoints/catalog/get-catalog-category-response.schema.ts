import { z } from 'zod'

import { HateoasLink } from '@printful-ts/schemas/common'
import { CatalogCategory } from '@printful-ts/schemas/entities'

export const GetCatalogCategoryResponse = z.object({
  data: CatalogCategory,
  _links: z.object({
    all_categories: HateoasLink,
  }),
})
export type GetCatalogCategoryResponse = z.infer<
  typeof GetCatalogCategoryResponse
>
