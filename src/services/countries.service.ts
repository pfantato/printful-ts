import type { Options } from 'ky'

import { COUNTRIES_RESOURCE } from '@printful-ts/constants'
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
    const searchParams = ListCountriesSearchParams.parse(params)
    return await this.request(
      COUNTRIES_RESOURCE,
      { ...options, searchParams },
      ListCountriesResponse,
    )
  }
}
