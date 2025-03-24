import { faker } from '@faker-js/faker'

import { OrderStatus } from '@printful-ts/schemas'

export const orderStatusMock = (): OrderStatus =>
  faker.helpers.arrayElement(OrderStatus.options)
