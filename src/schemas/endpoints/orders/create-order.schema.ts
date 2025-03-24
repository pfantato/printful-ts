import { z } from 'zod'

import { StoreIdSchema } from '@printful-ts/schemas/common'
import {
  Address,
  BaseRetailCosts,
  Customization,
  OrderItem,
} from '@printful-ts/schemas/entities'

export const OrderBody = z
  .object({
    external_id: z.string().optional(),
    shipping: z.string().default('STANDARD'),
    recipient: Address,
    order_items: OrderItem.array(),
    customization: Customization,
    retail_costs: BaseRetailCosts,
  })
  .merge(StoreIdSchema)
  .required({
    store_id: true,
    recipient: true,
    order_items: true,
  })

export type OrderBody = z.infer<typeof OrderBody>
