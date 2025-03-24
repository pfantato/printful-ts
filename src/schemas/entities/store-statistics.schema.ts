import { z } from 'zod'

import { Currency } from './price.schema'

export const ReportType = z.enum([
  'sales_and_costs',
  'profit',
  'average_fulfillment_type',
  'costs_by_amount',
  'costs_by_product',
  'costs_by_variant',
  'printful_costs',
  'sales_and_costs_summary',
  'total_paid_orders',
])
export type ReportType = z.infer<typeof ReportType>

export const SalesAndCostsValue = z.object({
  date: z.string().date(),
  sales: z.string(),
  fulfillment: z.string(),
  profit: z.string(),
  sales_discount: z.string(),
  fulfillment_discount: z.string(),
  sales_shipping: z.string(),
  fulfillment_shipping: z.string(),
})
export type SalesAndCostsValue = z.infer<typeof SalesAndCostsValue>

export const SalesAndCostsSummaryValue = z.object({
  date: z.string().date(),
  order_count: z.number(),
  costs: z.string(),
  profit: z.string(),
})
export type SalesAndCostsSummaryValue = z.infer<
  typeof SalesAndCostsSummaryValue
>

export const RelativeCosts = z.object({
  value: z.string(),
  relative_difference: z.string().optional(),
})
export type RelativeCosts = z.infer<typeof RelativeCosts>

export const CostsByAmountValue = z.object({
  date: z.string().date(),
  product_amount: z.string(),
  digitization: z.string(),
  branding: z.string(),
  vat: z.string(),
  sales_tax: z.string(),
  shipping: z.string(),
  discount: z.string(),
  total: z.string(),
})
export type CostsByAmountValue = z.infer<typeof CostsByAmountValue>

export const CostsByProductValue = z.object({
  product_id: z.number(),
  product_name: z.string(),
  fulfillment: z.string(),
  sales: z.string(),
  quantity: z.number(),
})
export type CostsByProductValue = z.infer<typeof CostsByProductValue>
export const CostsByVariantValue = CostsByProductValue.omit({
  product_name: true,
}).merge(
  z.object({
    variant_id: z.number(),
    variant_name: z.string(),
  }),
)
export type CostsByVariantValue = z.infer<typeof CostsByVariantValue>

export const StoreStatistics = z.object({
  store_id: z.number(),
  currency: Currency,
  sales_and_costs: SalesAndCostsValue.array(),
  sales_and_costs_summary: SalesAndCostsSummaryValue.array(),
  printful_costs: RelativeCosts,
  profit: RelativeCosts,
  total_paid_orders: RelativeCosts,
  costs_by_amount: CostsByAmountValue.array(),
  costs_by_product: CostsByProductValue.array(),
  costs_by_variant: CostsByVariantValue.array(),
  average_fulfillment_time: RelativeCosts,
})
export type StoreStatistics = z.infer<typeof StoreStatistics>
