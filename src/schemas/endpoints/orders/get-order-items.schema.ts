import { z } from 'zod'

import {
  HateoasLink,
  Limit,
  Offset,
  PagingHateoasLinks,
  WithStoreId,
} from '@printful-ts/schemas/common'
import { OrderItem } from '@printful-ts/schemas/entities'
import { arrayToQueryString } from '@printful-ts/schemas/utils'

export const GetOrderItemsSearchParams = WithStoreId(
  z.object({
    type: z.array(z.string()).transform(arrayToQueryString).optional(),
    limit: Limit.optional(),
    offset: Offset.optional(),
  }),
)
export type GetOrderItemsSearchParams = z.infer<
  typeof GetOrderItemsSearchParams
>

export const GetOrderItemsResponse = z.object({
  data: z.array(OrderItem),
  _links: PagingHateoasLinks.extend({
    order: HateoasLink,
  }),
})
export type GetOrderItemsResponse = z.infer<typeof GetOrderItemsResponse>
