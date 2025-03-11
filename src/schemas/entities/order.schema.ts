import { z } from 'zod'

import { HateoasLink } from '@printful-ts/schemas/common'

import { Address } from './address.schema'
import { Costs, RetailCosts } from './costs.schema'
import { Customization } from './customization.schema'
import { OrderStatus } from './order-status.schema'
import { OrderItem } from './order-item.schema'

export const Order = z.object({
  id: z.number(),
  external_id: z.string().nullable(),
  store_id: z.number(),
  shipping: z.string().default('STANDARD'),
  status: OrderStatus,
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
  recipient: Address,
  costs: Costs,
  retail_costs: RetailCosts,
  order_items: z.array(OrderItem),
  customization: Customization,
  _links: z.object({
    self: HateoasLink,
    order_items: HateoasLink,
    order_confirmation: HateoasLink,
    order_invoices: HateoasLink,
    shipments: HateoasLink,
  }),
})
export type Order = z.infer<typeof Order>
