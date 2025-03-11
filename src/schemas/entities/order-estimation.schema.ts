import { z } from 'zod'

import { Costs, RetailCosts } from './costs.schema'

export const OrderEstimationTaskStatus = z.enum([
  'pending',
  'failed',
  'completed',
])
export type OrderEstimationTaskStatus = z.infer<
  typeof OrderEstimationTaskStatus
>

export const OrderEstimationTaskSummary = z.object({
  id: z.number(),
  status: OrderEstimationTaskStatus,
  costs: Costs.nullable(),
  retail_costs: RetailCosts.nullable(),
  failure_reasons: z.array(z.string()).nullable(),
})
export type OrderEstimationTaskSummary = z.infer<
  typeof OrderEstimationTaskSummary
>
