import type { OrderResponse } from '@printful-ts/schemas'

import { orderMock } from 'tests/mocks/schemas/entities'

export const orderResponseMock = (): OrderResponse => ({
  data: orderMock(),
})
