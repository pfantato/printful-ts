import { z } from 'zod'

import { Paging, PagingHateoasLinks } from '@printful-ts/schemas/common'
import { Product } from '@printful-ts/schemas/entities'

export const ListCatalogProductsResponse = z.object({
  data: z.array(Product),
  paging: Paging,
  _links: PagingHateoasLinks,
})
export type ListCatalogProductsResponse = z.infer<
  typeof ListCatalogProductsResponse
>
