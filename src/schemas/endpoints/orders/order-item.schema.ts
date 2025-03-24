import { z } from 'zod'

import {
  HateoasLink,
  PagingHateoasLinks,
  StoreIdSchema,
} from '@printful-ts/schemas/common'
import {
  CatalogOrderItem,
  OrderItem,
  ProductTemplateOrderItem,
} from '@printful-ts/schemas/entities'

const CatalogItemBody = CatalogOrderItem.pick({
  source: true,
  catalog_variant_id: true,
  external_id: true,
  quantity: true,
  retail_price: true,
  name: true,
  placements: true,
  product_options: true,
})
  .merge(StoreIdSchema)
  .required({
    catalog_variant_id: true,
    source: true,
    quantity: true,
    retail_price: true,
  })
const ProductTemplateItemBody = ProductTemplateOrderItem.pick({
  catalog_variant_id: true,
  external_id: true,
  quantity: true,
  retail_price: true,
  name: true,
  source: true,
  product_template_id: true,
})
  .merge(StoreIdSchema)
  .required({
    catalog_variant_id: true,
    source: true,
    quantity: true,
    retail_price: true,
  })

export const OrderItemBody = z.discriminatedUnion('source', [
  CatalogItemBody,
  ProductTemplateItemBody,
])
export type OrderItemBody = z.infer<typeof OrderItemBody>

export const OrderItemResponse = z.object({
  data: OrderItem.array(),
  _links: PagingHateoasLinks.merge(
    z.object({
      order: HateoasLink,
    }),
  ),
})
export type OrderItemResponse = z.infer<typeof OrderItemResponse>
