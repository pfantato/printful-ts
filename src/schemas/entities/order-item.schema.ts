import { z } from 'zod'

import { ExternalId, HateoasLink } from '@printful-ts/schemas/common'

import { PlacementsList } from './placements-list.schema'
import { ProductOptions } from './product-options.schema'

export const OrderItemSource = z.enum([
  'catalog',
  'product_template',
  'warehouse',
])
export type OrderItemSource = z.infer<typeof OrderItemSource>

export const BaseOrderItem = z.object({
  id: z.number().optional(),
  source: OrderItemSource,
  external_id: ExternalId.optional(),
  quantity: z.number(),
  retail_price: z.string().optional(),
  name: z.string().optional(),
  _links: z.object({
    self: HateoasLink,
  }),
})
export type BaseOrderItem = z.infer<typeof BaseOrderItem>

export const WarehouseOrderItem = BaseOrderItem.merge(
  z.object({
    source: z.literal(OrderItemSource.enum.warehouse),
    warehouse_product_variant_id: z.number(),
  }),
)
export type WarehouseOrderItem = z.infer<typeof WarehouseOrderItem>

export const CatalogOrderItem = BaseOrderItem.merge(
  z.object({
    source: z.literal(OrderItemSource.enum.catalog),
    catalog_variant_id: z.number(),
    placements: PlacementsList.array(),
    product_options: ProductOptions.array(),
  }),
)
export type CatalogOrderItem = z.infer<typeof CatalogOrderItem>

export const ProductTemplateOrderItem = BaseOrderItem.merge(
  z.object({
    source: z.literal(OrderItemSource.enum.product_template),
    product_template_id: z.number().or(z.string()),
    catalog_variant_id: z.number(),
  }),
)
export type ProductTemplateOrderItem = z.infer<typeof ProductTemplateOrderItem>

// export const OrderItem = z.discriminatedUnion('source', [
//   WarehouseOrderItem,
//   CatalogOrderItem,
//   ProductTemplateOrderItem,
// ])

export const OrderItem = WarehouseOrderItem.or(CatalogOrderItem).or(
  ProductTemplateOrderItem,
)

export type OrderItem = z.infer<typeof OrderItem>
