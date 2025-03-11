import { z } from 'zod'

import {
  HateoasLink,
  PagingHateoasLinks,
  StoreId,
} from '@printful-ts/schemas/common'
import {
  CatalogOrderItem,
  OrderItem,
  ProductTemplateOrderItem,
} from '@printful-ts/schemas/entities'

export const CreateOrderItemBody = z.discriminatedUnion('source', [
  CatalogOrderItem.pick({
    source: true,
    catalog_variant_id: true,
    external_id: true,
    quantity: true,
    retail_price: true,
    name: true,
    placements: true,
    product_options: true,
  }).extend({
    store_id: StoreId.optional(),
  }),
  ProductTemplateOrderItem.pick({
    catalog_variant_id: true,
    external_id: true,
    quantity: true,
    retail_price: true,
    name: true,
    source: true,
    product_template_id: true,
  }).extend({
    store_id: StoreId.optional(),
  }),
])
export type CreateOrderItemBody = z.infer<typeof CreateOrderItemBody>

export const CreateOrderItemResponse = z.object({
  data: z.array(OrderItem),
  _links: PagingHateoasLinks.extend({
    order: HateoasLink,
  }),
})
export type CreateOrderItemResponse = z.infer<typeof CreateOrderItemResponse>
