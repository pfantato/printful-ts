import type { GetWarehouseProductResponse } from '@printful-ts/schemas'

import { warehouseProductMock } from 'tests/mocks/schemas/entities'

export const getWarehouseProductResponseMock =
  (): GetWarehouseProductResponse => ({
    data: warehouseProductMock(),
  })
