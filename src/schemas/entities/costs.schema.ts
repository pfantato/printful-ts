import { z } from 'zod'

import { Currency } from './price.schema'

export const CalculationStatus = z.enum(['done', 'calculating', 'failed'])
export type CalculationStatus = z.infer<typeof CalculationStatus>

export const Costs = z.object({
  calculation_status: CalculationStatus,
  currency: Currency.nullable(),
  subtotal: z.string().nullable(),
  discount: z.string().nullable(),
  shipping: z.string().nullable(),
  digitization: z.string().nullable(),
  additional_fee: z.string().nullable(),
  fulfillment_fee: z.string().nullable(),
  total: z.string().nullable(),
  retail_delivery_fee: z.string().nullable(),
  vat: z.string().nullable(),
  tax: z.string().nullable(),
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
