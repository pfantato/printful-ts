import type { PrintfulConfig, RequestOptions } from '@printful-ts/schemas'
import { CountriesService } from '@printful-ts/services'
import { applyMixins } from '@printful-ts/utils'

import { PrintfulApiServiceMock } from './printful-api.service.mock'

export interface CountriesServiceMock
  extends PrintfulApiServiceMock,
    CountriesService {}

export class CountriesServiceMock
  extends PrintfulApiServiceMock
  implements PrintfulApiServiceMock, CountriesService
{
  constructor(config?: PrintfulConfig, options?: RequestOptions) {
    super(config, options)
  }
}

applyMixins(CountriesServiceMock, [PrintfulApiServiceMock, CountriesService])
