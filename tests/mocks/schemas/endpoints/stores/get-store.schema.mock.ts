import type { GetStoreResponse } from '@printful-ts/schemas'

import { storeMock } from 'tests/mocks/schemas/entities'

export const getStoreResponseMock = (): GetStoreResponse => ({
  data: storeMock(),
})
