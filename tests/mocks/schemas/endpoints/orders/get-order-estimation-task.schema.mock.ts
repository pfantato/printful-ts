import type { GetOrderEstimationTaskResponse } from '@printful-ts/schemas'

import { orderEstimationTaskSummaryMock } from 'tests/mocks/schemas/entities'

export const getOrderEstimationTaskResponseMock =
  (): GetOrderEstimationTaskResponse => ({
    data: orderEstimationTaskSummaryMock(),
  })
