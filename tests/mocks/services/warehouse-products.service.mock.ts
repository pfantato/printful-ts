import type { PrintfulConfig, RequestOptions } from '@printful-ts/schemas'
import { WarehouseProductsService } from '@printful-ts/services'
import { applyMixins } from '@printful-ts/utils'

import { PrintfulApiServiceMock } from './printful-api.service.mock'

export interface WarehouseProductsServiceMock
  extends PrintfulApiServiceMock,
    WarehouseProductsService {}

export class WarehouseProductsServiceMock
  extends PrintfulApiServiceMock
  implements PrintfulApiServiceMock, WarehouseProductsService
{
  constructor(config?: PrintfulConfig, options?: RequestOptions) {
    super(config, options)
  }
}

applyMixins(WarehouseProductsServiceMock, [
  PrintfulApiServiceMock,
  WarehouseProductsService,
])
