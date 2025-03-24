import { faker } from '@faker-js/faker'

import {
  OrderItemSource,
  type BaseOrderItem,
  type CatalogOrderItem,
  type OrderItem,
  type ProductTemplateOrderItem,
  type WarehouseOrderItem,
} from '@printful-ts/schemas'

import {
  externalIdMock,
  externalOrInternalIdMock,
  hateoasLinkMock,
  idMock,
  positiveNumberMock,
} from 'tests/mocks/schemas/common'

import { placementListMock } from './placements-list.schema.mock'
import { productOptionsMock } from './product-options.schema.mock'

export const orderItemSourceMock = (
  options: Array<OrderItemSource> = OrderItemSource.options,
): OrderItemSource => faker.helpers.arrayElement(options)

export const baseOrderItemMock = (): BaseOrderItem => ({
  id: idMock(),
  source: orderItemSourceMock(),
  external_id: externalIdMock(),
  quantity: positiveNumberMock({ max: 25 }),
  retail_price: faker.commerce.price(),
  name: faker.commerce.productName(),
  _links: {
    self: hateoasLinkMock(),
  },
})

export const warehouseOrderItemMock = (): WarehouseOrderItem => ({
  ...baseOrderItemMock(),
  source: OrderItemSource.enum.warehouse,
  warehouse_product_variant_id: idMock(),
})

export const catalogOrderItemMock = (): CatalogOrderItem => ({
  ...baseOrderItemMock(),
  source: OrderItemSource.enum.catalog,
  catalog_variant_id: idMock(),
  placements: faker.helpers.multiple(placementListMock, {
    count: { min: 1, max: 5 },
  }),
  product_options: faker.helpers.multiple(productOptionsMock, {
    count: { min: 1, max: 3 },
  }),
})

export const productTemplateOrderItemMock = (): ProductTemplateOrderItem => ({
  ...baseOrderItemMock(),
  source: OrderItemSource.enum.product_template,
  product_template_id: externalOrInternalIdMock(),
  catalog_variant_id: idMock(),
})

export const orderItemMock = (): OrderItem =>
  faker.helpers.arrayElement([
    warehouseOrderItemMock(),
    catalogOrderItemMock(),
    productTemplateOrderItemMock(),
  ])
