import { faker } from '@faker-js/faker'

import type { Order } from '@printful-ts/schemas'

import { hateoasLinkMock, idMock } from 'tests/mocks/schemas/common'

import { addressMock } from './address.schema.mock'
import { costsMock, retailCostsMock } from './costs.schema.mock'
import { customizationMock } from './customization.schema.mock'
import { orderStatusMock } from './order-status.schema.mock'
import { orderItemMock } from './order-item.schema.mock'

export const shippingIdMock = () =>
  faker.helpers.arrayElement(['STANDARD', 'EXPRESS'])

export const orderMock = (): Order => ({
  id: idMock(),
  external_id: faker.helpers.maybe(faker.string.uuid),
  store_id: idMock(),
  shipping: faker.helpers.maybe(shippingIdMock),
  status: orderStatusMock(),
  created_at: faker.date.recent().toISOString(),
  updated_at: faker.date.recent().toISOString(),
  recipient: addressMock(),
  costs: costsMock(),
  retail_costs: retailCostsMock(),
  order_items: faker.helpers.multiple(orderItemMock),
  customization: customizationMock(),
  _links: {
    self: hateoasLinkMock(),
    order_items: hateoasLinkMock(),
    order_confirmation: hateoasLinkMock(),
    order_invoices: hateoasLinkMock(),
    shipments: hateoasLinkMock(),
  },
})
