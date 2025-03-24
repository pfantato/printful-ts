import { z } from 'zod'

import {
  Paging,
  PagingHateoasLinks,
  PagingSearchInput,
  PagingSearchParams,
  StoreIdSchema,
} from '@printful-ts/schemas/common'
import { OrderSummary } from '@printful-ts/schemas/entities'

export const ListOrdersSearchInput = PagingSearchInput.merge(StoreIdSchema)
export type ListOrdersSearchInput = z.input<typeof ListOrdersSearchInput>

export const ListOrdersSearchParams = PagingSearchParams
export type ListOrdersSearchParams = z.input<typeof ListOrdersSearchParams>

export const ListOrdersResponse = z.object({
  data: OrderSummary.array(),
  paging: Paging,
  _links: PagingHateoasLinks,
})
export type ListOrdersResponse = z.infer<typeof ListOrdersResponse>
