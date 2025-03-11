import type { Options } from 'ky'

import { STORES_RESOURCE } from '@printful-ts/constants'
import { bound, trace } from '@printful-ts/decorators'
import {
  GetStoreResponse,
  GetStoreStatisticsResponse,
  GetStoreStatisticsSearchParams,
  ListStoresResponse,
} from '@printful-ts/schemas'

import { PrintfulApiService } from './printful-api.service'

export class StoresService extends PrintfulApiService {
  @bound
  @trace
  async listStores(store_id?: number, options: Options = {}) {
    return await this.request(
      STORES_RESOURCE,
      { ...options, store_id },
      ListStoresResponse,
    )
  }

  @bound
  @trace
  async getStore(store_id: number, options: Options = {}) {
    return await this.request(
      `${STORES_RESOURCE}/${store_id}`,
      { ...options, store_id },
      GetStoreResponse,
    )
  }

  @bound
  @trace
  async getStoreStatistics(
    store_id: number,
    params: GetStoreStatisticsSearchParams,
    options: Options = {},
  ) {
    const searchParams = GetStoreStatisticsSearchParams.parse(params)

    return await this.request(
      `${STORES_RESOURCE}/${store_id}/statistics`,
      {
        ...options,
        store_id,
        searchParams,
      },
      GetStoreStatisticsResponse,
    )
  }
}
