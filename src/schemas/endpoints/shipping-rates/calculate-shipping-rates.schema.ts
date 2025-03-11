import { z } from 'zod'

import { Localized, WithStoreId } from '@printful-ts/schemas/common'
import {
  Address,
  Currency,
  OrderItem,
  ShippingRateCalculation,
} from '@printful-ts/schemas/entities'

export const CalculateShippingRatesBody = Localized(
  WithStoreId(
    z.object({
      recipient: Address,
      order_items: z.array(OrderItem),
      currency: Currency.optional(),
    }),
  ),
)

export type CalculateShippingRatesBody = z.infer<
  typeof CalculateShippingRatesBody
>

export const CalculateShippingRatesResponse = z.object({
  data: ShippingRateCalculation,
})
export type CalculateShippingRatesResponse = z.infer<
  typeof CalculateShippingRatesResponse
>
