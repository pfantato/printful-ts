import { z } from 'zod'

import { HateoasLink } from '@printful-ts/schemas/common'

export const ShipmentStatus = z.enum([
  'pending',
  'onhold',
  'canceled',
  'packaged',
  'shipped',
  'returned',
  'outstock',
])
export type ShipmentStatus = z.infer<typeof ShipmentStatus>

export const DeliveryStatus = z.enum([
  'unknown',
  'delivered',
  'pre_transit',
  'in_transit',
  'out_for_delivery',
  'available_for_pickup',
  'return_to_sender',
  'failure',
  'canceled',
])
export type DeliveryStatus = z.infer<typeof DeliveryStatus>

export const DepartureAddress = z.object({
  country_name: z.string(),
  country_code: z.string(),
  state_code: z.string().optional(),
})
export type DepartureAddress = z.infer<typeof DepartureAddress>

export const TrackingEvent = z.object({
  triggered_at: z.string().datetime(),
  description: z.string(),
})
export type TrackingEvent = z.infer<typeof TrackingEvent>

export const EstimatedDelivery = z.object({
  from_date: z.string().datetime(),
  to_date: z.string().datetime(),
  calculated_at: z.string().datetime(),
})
export type EstimatedDelivery = z.infer<typeof EstimatedDelivery>

export const ShipmentItem = z.object({
  id: z.number(),
  order_item_id: z.number(),
  order_item_external_id: z.string().optional(),
  order_item_name: z.string().optional(),
  quantity: z.number(),
  _links: z.object({
    order_item: z.object({
      href: z.string(),
    }),
  }),
})
export type ShipmentItem = z.infer<typeof ShipmentItem>

export const Shipment = z.object({
  id: z.number(),
  order_id: z.number(),
  carrier: z.string().optional(),
  shipment_status: ShipmentStatus,
  shipped_at: z.string().datetime().optional(),
  delivery_status: DeliveryStatus,
  delivery_at: z.string().datetime().optional(),
  departure_addess: DepartureAddress,
  is_reshipment: z.boolean(),
  tracking_url: z.string().url().optional(),
  tracking_events: TrackingEvent.array(),
  shipment_items: ShipmentItem.array(),
  _links: z.object({
    self: HateoasLink,
    order: HateoasLink,
  }),
})
export type Shipment = z.infer<typeof Shipment>
