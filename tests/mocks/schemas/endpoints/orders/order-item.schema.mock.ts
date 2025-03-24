import { faker } from '@faker-js/faker'

import { OrderItemSource } from '@printful-ts/schemas/entities'
import type { OrderItemBody, OrderItemResponse } from '@printful-ts/schemas'

import {
  externalIdMock,
  hateoasLinkMock,
  idMock,
  pagingHateoasLinksMock,
  positiveNumberMock,
} from 'tests/mocks/schemas/common'
import {
  orderItemMock,
  orderItemSourceMock,
  placementListMock,
  productOptionsMock,
} from 'tests/mocks/schemas/entities'

export const orderItemBodyMock = (): OrderItemBody => ({
  store_id: idMock(),
  catalog_variant_id: idMock(),
  external_id: faker.helpers.maybe(externalIdMock),
  name: faker.commerce.productName(),
  product_options: faker.helpers.multiple(productOptionsMock),
  placements: faker.helpers.multiple(placementListMock),
  retail_price: faker.commerce.price(),
  product_template_id: idMock(),
  quantity: positiveNumberMock({ max: 20 }),
  source: orderItemSourceMock([
    OrderItemSource.enum.catalog,
    OrderItemSource.enum.product_template,
  ]) as 'catalog' | 'product_template',
})

export const orderItemResponseMock = (): OrderItemResponse => ({
  data: faker.helpers.multiple(orderItemMock, { count: { min: 1, max: 20 } }),
  _links: {
    ...pagingHateoasLinksMock(),
    order: hateoasLinkMock(),
  },
})
