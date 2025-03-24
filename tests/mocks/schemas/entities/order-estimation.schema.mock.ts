import { faker } from '@faker-js/faker'

import {
  OrderEstimationTaskStatus,
  type OrderEstimationTaskSummary,
} from '@printful-ts/schemas'

import { idMock } from 'tests/mocks/schemas/common'

import { costsMock, retailCostsMock } from './costs.schema.mock'

export const orderEstimationTaskStatusMock = (): OrderEstimationTaskStatus =>
  faker.helpers.arrayElement(OrderEstimationTaskStatus.options)

export const orderEstimationTaskSummaryMock =
  (): OrderEstimationTaskSummary => ({
    id: idMock(),
    status: orderEstimationTaskStatusMock(),
    costs: faker.helpers.maybe(costsMock),
    retail_costs: faker.helpers.maybe(retailCostsMock),
    failure_reasons: faker.helpers.maybe(() =>
      faker.helpers.multiple(faker.lorem.words),
    ),
  })
