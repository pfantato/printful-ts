import { z } from 'zod'

import { StoreIdSchema, WithLocale } from '@printful-ts/schemas/common'
import {
  Address,
  Currency,
  OrderItemSource,
  ShippingRateCalculation,
} from '@printful-ts/schemas/entities'

export const ShippingOrderItem = z.object({
  source: OrderItemSource,
  quantity: z.number().int().positive(),
  catalog_variant_id: z.number().int().positive(),
})

export const CalculateShippingRatesBody = z
  .object({
    recipient: Address,
    order_items: ShippingOrderItem.array(),
    currency: Currency.optional(),
  })
  .merge(StoreIdSchema)
  .merge(WithLocale)
export type CalculateShippingRatesBody = z.infer<
  typeof CalculateShippingRatesBody
>

export const CalculateShippingRatesResponse = z.object({
  data: ShippingRateCalculation.array(),
})
export type CalculateShippingRatesResponse = z.infer<
  typeof CalculateShippingRatesResponse
>
