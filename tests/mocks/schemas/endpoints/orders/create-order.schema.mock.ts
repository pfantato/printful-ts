import { faker } from '@faker-js/faker'

import type { OrderBody } from '@printful-ts/schemas'

import { idMock } from 'tests/mocks/schemas/common'
import {
  addressMock,
  baseRetailCostsMock,
  customizationMock,
  orderItemMock,
  shippingIdMock,
} from 'tests/mocks/schemas/entities'

export const createOrderBodyMock = (): OrderBody => ({
  external_id: faker.helpers.maybe(faker.string.uuid),
  shipping: faker.helpers.maybe(shippingIdMock),
  recipient: addressMock(),
  order_items: faker.helpers.multiple(orderItemMock),
  customization: customizationMock(),
  retail_costs: baseRetailCostsMock(),
  store_id: idMock(),
})
