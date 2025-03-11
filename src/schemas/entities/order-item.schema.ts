import { z } from 'zod'

import { HateoasLink } from '@printful-ts/schemas/common'

import { PlacementsList } from './placements-list.schema'
import { ProductOptions } from './product-options.schema'

export const OrderItemSource = z.enum([
  'catalog',
  'product_template',
  'warehouse',
])
export type OrderItemSource = z.infer<typeof OrderItemSource>

export const BaseOrderItem = z.object({
  id: z.number(),
  source: OrderItemSource,
  external_id: z.string().nullable(),
  quantity: z.number(),
  retail_price: z.string(),
  name: z.string(),
  _links: z.object({
    self: HateoasLink,
  }),
})
export type BaseOrderItem = z.infer<typeof BaseOrderItem>

export const WarehouseOrderItem = BaseOrderItem.extend({
  source: z.literal(OrderItemSource.enum.warehouse),
  warehouse_product_variant_id: z.number(),
})
export type WarehouseOrderItem = z.infer<typeof WarehouseOrderItem>

export const CatalogOrderItem = BaseOrderItem.extend({
  source: z.literal(OrderItemSource.enum.catalog),
  catalog_variant_id: z.number(),
  placements: z.array(PlacementsList),
  product_options: z.array(ProductOptions),
})
export type CatalogOrderItem = z.infer<typeof CatalogOrderItem>

export const ProductTemplateOrderItem = BaseOrderItem.extend({
  source: z.literal(OrderItemSource.enum.product_template),
  product_template_id: z.union([z.number(), z.string()]),
  catalog_variant_id: z.number(),
})
export type ProductTemplateOrderItem = z.infer<typeof ProductTemplateOrderItem>

export const OrderItem = z.discriminatedUnion('source', [
  WarehouseOrderItem,
  CatalogOrderItem,
  ProductTemplateOrderItem,
])
export type OrderItem = z.infer<typeof OrderItem>
