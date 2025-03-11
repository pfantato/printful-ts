import { z } from 'zod'

import { ExternalIdParam, HateoasLink } from '@printful-ts/schemas/common'
import { OrderItem } from '@printful-ts/schemas/entities'

export const GetOrderItemPathParams = z.object({
  order_item_id: ExternalIdParam,
  order_id: ExternalIdParam,
})
export type GetOrderItemPathParams = z.infer<typeof GetOrderItemPathParams>

export const GetOrderItemResponse = z.object({
  data: OrderItem,
  _links: z.object({
    self: HateoasLink,
    order: HateoasLink,
    all_items: HateoasLink,
    shipments: HateoasLink,
  }),
})
export type GetOrderItemResponse = z.infer<typeof GetOrderItemResponse>
