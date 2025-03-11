import { z } from 'zod'

import {
  Limit,
  Offset,
  Paging,
  PagingHateoasLinks,
  WithStoreId,
} from '@printful-ts/schemas/common'
import { WarehouseProduct } from '@printful-ts/schemas/entities'

export const ListWarehouseProductsSearchParams = WithStoreId(
  z.object({
    filter: z.string().optional(),
    limit: Limit.optional(),
    offset: Offset.optional(),
  }),
)
export type ListWarehouseProductsSearchParams = z.infer<
  typeof ListWarehouseProductsSearchParams
>

export const ListWarehouseProductsResponse = z.object({
  data: z.array(WarehouseProduct),
  paging: Paging,
  _links: PagingHateoasLinks,
})
export type ListWarehouseProductsResponse = z.infer<
  typeof ListWarehouseProductsResponse
>
