import { faker } from '@faker-js/faker'

import type { OrderSummary } from '@printful-ts/schemas'

import { hateoasLinkMock, idMock } from 'tests/mocks/schemas/common'

import { addressMock } from './address.schema.mock'
import { costsMock, retailCostsMock } from './costs.schema.mock'
import { orderItemMock } from './order-item.schema.mock'
import { orderStatusMock } from './order-status.schema.mock'
import { shippingIdMock } from './order.schema.mock'

export const orderSummaryMock = (): OrderSummary => ({
  id: idMock(),
  external_id: faker.string.uuid(),
  store_id: idMock(),
  shipping: faker.helpers.maybe(shippingIdMock),
  status: orderStatusMock(),
  created_at: faker.date.recent().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  recipient: addressMock(),
  costs: costsMock(),
  retail_costs: retailCostsMock(),
  order_items: faker.helpers.multiple(orderItemMock, {
    count: { min: 1, max: 15 },
  }),
  _links: {
    self: hateoasLinkMock(),
    order_items: hateoasLinkMock(),
    shipments: hateoasLinkMock(),
  },
})
