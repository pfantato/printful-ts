import { z } from 'zod'

import { ExternalOrInternalId, HateoasLink } from '@printful-ts/schemas/common'
import { OrderItem } from '@printful-ts/schemas/entities'

export const OrderItemPathParams = z
  .object({
    order_item_id: ExternalOrInternalId,
    order_id: ExternalOrInternalId,
  })
  .required({
    order_id: true,
    order_item_id: true,
  })
export type OrderItemPathParams = z.infer<typeof OrderItemPathParams>

export const GetOrderItemResponse = z
  .object({
    data: OrderItem,
    _links: z.object({
      self: HateoasLink,
      order: HateoasLink,
      all_items: HateoasLink,
      shipments: HateoasLink,
    }),
  })
  .required()
export type GetOrderItemResponse = z.infer<typeof GetOrderItemResponse>
