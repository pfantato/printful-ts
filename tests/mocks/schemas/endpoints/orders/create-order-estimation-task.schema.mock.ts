import { faker } from '@faker-js/faker'

import type {
  CreateOrderEstimationTaskBody,
  CreateOrderEstimationTaskResponse,
} from '@printful-ts/schemas'

import { idMock } from 'tests/mocks/schemas/common'
import {
  addressMock,
  baseRetailCostsMock,
  orderEstimationTaskSummaryMock,
  orderItemMock,
} from 'tests/mocks/schemas/entities'

export const createOrderEstimationTaskBodyMock =
  (): CreateOrderEstimationTaskBody => ({
    recipient: addressMock(),
    order_items: faker.helpers.multiple(orderItemMock, {
      count: { min: 1, max: 25 },
    }),
    retail_costs: baseRetailCostsMock(),
    store_id: idMock(),
  })

export const createOrderEstimationTaskResponseMock =
  (): CreateOrderEstimationTaskResponse => ({
    data: orderEstimationTaskSummaryMock(),
  })
