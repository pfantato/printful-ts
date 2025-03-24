import type { PrintfulConfig, RequestOptions } from '@printful-ts/schemas'
import { ShippingRatesService } from '@printful-ts/services'
import { applyMixins } from '@printful-ts/utils'

import { PrintfulApiServiceMock } from './printful-api.service.mock'

export interface ShippingRatesServiceMock
  extends PrintfulApiServiceMock,
    ShippingRatesService {}

export class ShippingRatesServiceMock
  extends PrintfulApiServiceMock
  implements PrintfulApiServiceMock, ShippingRatesService
{
  constructor(config?: PrintfulConfig, options?: RequestOptions) {
    super(config, options)
  }
}

applyMixins(ShippingRatesServiceMock, [
  PrintfulApiServiceMock,
  ShippingRatesService,
])
