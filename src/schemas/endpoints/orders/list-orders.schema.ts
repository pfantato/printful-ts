import { z } from 'zod'

import {
  Limit,
  Offset,
  Paging,
  PagingHateoasLinks,
  WithStoreId,
} from '@printful-ts/schemas/common'
import { OrderSummary } from '@printful-ts/schemas/entities'

export const ListOrdersSearchParams = WithStoreId(
  z.object({
    limit: Limit.optional(),
    offset: Offset.optional(),
  }),
)
export type ListOrdersSearchParams = z.infer<typeof ListOrdersSearchParams>

export const ListOrdersResponse = z.object({
  data: z.array(OrderSummary),
  paging: Paging,
  _links: PagingHateoasLinks,
})
export type ListOrdersResponse = z.infer<typeof ListOrdersResponse>
