import { OrderEstimationTaskSummary } from '@printful-ts/schemas/entities'
import { z } from 'zod'

export const GetOrderEstimationTaskResponse = z.object({
  data: OrderEstimationTaskSummary,
})
export type GetOrderEstimationTaskResponse = z.infer<
  typeof GetOrderEstimationTaskResponse
>
