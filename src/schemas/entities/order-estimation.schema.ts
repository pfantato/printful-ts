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
  costs: Costs.optional(),
  retail_costs: RetailCosts.optional(),
  failure_reasons: z.string().array().optional(),
})
export type OrderEstimationTaskSummary = z.infer<
  typeof OrderEstimationTaskSummary
>
