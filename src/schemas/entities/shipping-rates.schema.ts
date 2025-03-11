import { z } from 'zod'

import { Currency } from './price.schema'

export const ShippingRateShipmentItems = z.object({
  catalog_variant_id: z.number(),
  quantity: z.number(),
})
export type ShippingRateShipmentItems = z.infer<
  typeof ShippingRateShipmentItems
>

export const ShippingRateShipment = z.object({
  departure_country: z.string().nullable(),
  shipment_items: z.array(ShippingRateShipmentItems),
  custom_fees_possible: z.boolean(),
})
export type ShippingRateShipment = z.infer<typeof ShippingRateShipment>

export const ShippingRateCalculation = z.object({
  shipping: z.string(),
  shipping_method_name: z.string(),
  rate: z.string(),
  currency: Currency,
  min_delivery_days: z.number().optional(),
  max_delivery_days: z.number().optional(),
  min_delivery_date: z.string().date().optional(),
  max_delivery_date: z.string().date().optional(),
  shipments: z.array(ShippingRateShipment),
})
export type ShippingRateCalculation = z.infer<typeof ShippingRateCalculation>
