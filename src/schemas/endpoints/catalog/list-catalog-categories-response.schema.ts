import { z } from 'zod'

import { PagingHateoasLinks } from '@printful-ts/schemas/common'
import { CatalogCategory } from '@printful-ts/schemas/entities'

export const ListCatalogCategoriesResponse = z.object({
  data: z.array(CatalogCategory),
  _links: PagingHateoasLinks,
})
export type ListCatalogCategoriesResponse = z.infer<
  typeof ListCatalogCategoriesResponse
>
