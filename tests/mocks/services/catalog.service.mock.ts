import type { PrintfulConfig, RequestOptions } from '@printful-ts/schemas'
import { CatalogProductsService } from '@printful-ts/services'
import { applyMixins } from '@printful-ts/utils'

import { PrintfulApiServiceMock } from './printful-api.service.mock'

export interface CatalogProductsServiceMock
  extends PrintfulApiServiceMock,
    CatalogProductsService {}

export class CatalogProductsServiceMock
  extends PrintfulApiServiceMock
  implements PrintfulApiServiceMock, CatalogProductsService
{
  constructor(config?: PrintfulConfig, options?: RequestOptions) {
    super(config, options)
  }
}

applyMixins(CatalogProductsServiceMock, [
  PrintfulApiServiceMock,
  CatalogProductsService,
])
