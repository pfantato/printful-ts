import { z } from 'zod'

import { StoreIdSchema } from '@printful-ts/schemas/common'
import {
  Address,
  BaseRetailCosts,
  OrderEstimationTaskSummary,
  OrderItem,
} from '@printful-ts/schemas/entities'

export const CreateOrderEstimationTaskBody = z
  .object({
    recipient: Address,
    order_items: OrderItem.array(),
    retail_costs: BaseRetailCosts,
  })
  .merge(StoreIdSchema)
  .required()

export type CreateOrderEstimationTaskBody = z.infer<
  typeof CreateOrderEstimationTaskBody
>

export const CreateOrderEstimationTaskResponse = z.object({
  data: OrderEstimationTaskSummary,
})
export type CreateOrderEstimationTaskResponse = z.infer<
  typeof CreateOrderEstimationTaskResponse
>
