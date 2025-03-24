import { z } from 'zod'

import {
  Paging,
  PagingHateoasLinks,
  PagingSearchInput,
  PagingSearchParams,
  StoreIdSchema,
} from '@printful-ts/schemas/common'
import { WarehouseProduct } from '@printful-ts/schemas/entities'

export const ListWarehouseProductsSearchInput = z
  .object({
    filter: z.string().optional(),
  })
  .merge(PagingSearchInput)
  .merge(StoreIdSchema)

export type ListWarehouseProductsSearchInput = z.input<
  typeof ListWarehouseProductsSearchInput
>

export const ListWarehouseProductsSearchParams = z
  .object({
    filter: z.string().optional(),
  })
  .merge(PagingSearchParams)

export type ListWarehouseProductsSearchParams = z.input<
  typeof ListWarehouseProductsSearchParams
>

export const ListWarehouseProductsResponse = z.object({
  data: WarehouseProduct.array(),
  paging: Paging,
  _links: PagingHateoasLinks,
})
export type ListWarehouseProductsResponse = z.infer<
  typeof ListWarehouseProductsResponse
>
