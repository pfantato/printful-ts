import { z } from 'zod'

import { WithStoreId } from '@printful-ts/schemas/common'
import {
  Address,
  BaseRetailCosts,
  Customization,
  OrderItem,
} from '@printful-ts/schemas/entities'

export const CreateOrderBody = WithStoreId(
  z.object({
    external_id: z.string(),
    shipping: z.string().default('STANDARD'),
    recipient: Address,
    order_items: z.array(OrderItem),
    customization: Customization,
    retail_costs: BaseRetailCosts,
  }),
)
export type CreateOrderBody = z.infer<typeof CreateOrderBody>
