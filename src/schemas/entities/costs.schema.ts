import { z } from 'zod'

import { Currency } from './price.schema'

export const CalculationStatus = z.enum(['done', 'calculating', 'failed'])
export type CalculationStatus = z.infer<typeof CalculationStatus>

export const Costs = z.object({
  calculation_status: CalculationStatus,
  currency: Currency.optional(),
  subtotal: z.string().optional(),
  discount: z.string().optional(),
  shipping: z.string().optional(),
  digitization: z.string().optional(),
  additional_fee: z.string().optional(),
  fulfillment_fee: z.string().optional(),
  total: z.string().optional(),
  retail_delivery_fee: z.string().optional(),
  vat: z.string().optional(),
  tax: z.string().optional(),
})
export type Costs = z.infer<typeof Costs>

export const BaseRetailCosts = Costs.pick({
  currency: true,
  discount: true,
  shipping: true,
  tax: true,
})
export type BaseRetailCosts = z.infer<typeof BaseRetailCosts>

export const RetailCosts = Costs.pick({
  currency: true,
  discount: true,
  shipping: true,
  tax: true,
  calculation_status: true,
  subtotal: true,
  vat: true,
  total: true,
})
export type RetailCosts = z.infer<typeof RetailCosts>
