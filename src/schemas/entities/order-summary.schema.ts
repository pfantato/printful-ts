import { z } from 'zod'

import { HateoasLink } from '@printful-ts/schemas/common'

import { Order } from './order.schema'

export const OrderSummary = Order.pick({
  id: true,
  external_id: true,
  store_id: true,
  shipping: true,
  status: true,
  created_at: true,
  updated_at: true,
  recipient: true,
  costs: true,
  retail_costs: true,
  order_items: true,
}).extend({
  _links: z.object({
    self: HateoasLink,
    order_items: HateoasLink,
    shipments: HateoasLink,
  }),
})
export type OrderSummary = z.infer<typeof OrderSummary>
