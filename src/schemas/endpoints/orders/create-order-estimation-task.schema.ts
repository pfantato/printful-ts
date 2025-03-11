import { WithStoreId } from '@printful-ts/schemas/common'
import {
  Address,
  BaseRetailCosts,
  OrderEstimationTaskSummary,
  OrderItem,
} from '@printful-ts/schemas/entities'
import { z } from 'zod'

export const CreateOrderEstimationTaskBody = WithStoreId(
  z.object({
    recipient: Address,
    order_items: z.array(OrderItem),
    retail_costs: BaseRetailCosts,
  }),
)
export type CreateOrderEstimationTaskBody = z.infer<
  typeof CreateOrderEstimationTaskBody
>

export const CreateOrderEstimationTaskResponse = z.object({
  data: OrderEstimationTaskSummary,
})
export type CreateOrderEstimationTaskResponse = z.infer<
  typeof CreateOrderEstimationTaskResponse
>
