import type { PrintfulConfig, RequestOptions } from '@printful-ts/schemas'
import { StoresService } from '@printful-ts/services'
import { applyMixins } from '@printful-ts/utils'

import { PrintfulApiServiceMock } from './printful-api.service.mock'

export interface StoresServiceMock
  extends PrintfulApiServiceMock,
    StoresService {}

export class StoresServiceMock
  extends PrintfulApiServiceMock
  implements PrintfulApiServiceMock, StoresService
{
  constructor(config?: PrintfulConfig, options?: RequestOptions) {
    super(config, options)
  }
}

applyMixins(StoresServiceMock, [PrintfulApiServiceMock, StoresService])
