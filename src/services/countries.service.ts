import type { Options } from 'ky'

import { PrintfulApiResources } from '@printful-ts/constants'
import {
  ListCountriesResponse,
  ListCountriesSearchParams,
} from '@printful-ts/schemas'

import { PrintfulApiService } from './printful-api.service'

export class CountriesService extends PrintfulApiService {

  async listCountries(
    params?: ListCountriesSearchParams,
    options: Options = {},
  ) {
    const requestOptions = options

    if (params !== undefined && Object.keys(params).length >= 1) {
      requestOptions.searchParams = ListCountriesSearchParams.parse(params)
    }

    return await this.makeRequest(
      PrintfulApiResources.COUNTRIES,
      requestOptions,
      ListCountriesResponse,
    )
  }
}
