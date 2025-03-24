import { z } from 'zod'
import { HateoasLink, MeasurementSystem } from '../common'
import { Currency } from './price.schema'

export const StockLocation = z.object({
  facility: z.string(),
  stocked: z.number(),
  available: z.number(),
})
export type StockLocation = z.infer<typeof StockLocation>

export const Dimensions = z.object({
  measurement_system: MeasurementSystem,
  width: z.number(),
  height: z.number(),
  length: z.number(),
  weight: z.number(),
})
export type Dimensions = z.infer<typeof Dimensions>

export const WarehouseProductStatus = z.enum([
  'draft',
  'awaiting_approval',
  'approved',
  'declined',
  'suspended',
])
export type WarehouseProductStatus = z.infer<typeof WarehouseProductStatus>

export const WarehouseProductVariant = z.object({
  id: z.number(),
  name: z.string(),
  sku: z.string(),
  image_url: z.string().url(),
  retail_price: z.string(),
  quantity: z.number(),
  stock_location: StockLocation.array(),
  dimensions: Dimensions,
  _links: z.object({
    self: HateoasLink,
  }),
})
export type WarehouseProductVariant = z.infer<typeof WarehouseProductVariant>

export const WarehouseProduct = z.object({
  id: z.number(),
  name: z.string(),
  status: WarehouseProductStatus,
  currency: Currency,
  image_url: z.string().url(),
  variants: WarehouseProductVariant.array(),
  _links: z.object({
    self: HateoasLink,
    warehouse_variants: HateoasLink,
  }),
})
export type WarehouseProduct = z.infer<typeof WarehouseProduct>
