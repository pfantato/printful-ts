import type { Options } from 'ky'

import { STORES_RESOURCE } from '@printful-ts/constants'
import {
  GetStoreResponse,
  GetStoreStatisticsResponse,
  GetStoreStatisticsSearchParams,
  ListStoresResponse,
} from '@printful-ts/schemas'

import { PrintfulApiService } from './printful-api.service'

export class StoresService extends PrintfulApiService {
  async listStores(store_id?: number, options: Options = {}) {
    return await this.request(
      STORES_RESOURCE,
      { ...options, store_id },
      ListStoresResponse,
    )
  }

  async getStore(store_id: number, options: Options = {}) {
    return await this.request(
      `${STORES_RESOURCE}/${store_id}`,
      { ...options, store_id },
      GetStoreResponse,
    )
  }

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
