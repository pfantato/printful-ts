import type { Options } from 'ky'

import { PrintfulApiResources } from '@printful-ts/constants'
import {
  GetStoreResponse,
  GetStoreStatisticsResponse,
  GetStoreStatisticsSearchInput,
  ListStoresResponse,
  InternalId,
} from '@printful-ts/schemas'

import { PrintfulApiService } from './printful-api.service'
import { z } from 'zod'

export class StoresService extends PrintfulApiService {
  async listStores(storeId?: number, options: Options = {}) {
    const store_id = InternalId.optional().parse(storeId)

    return await this.makeRequest(
      PrintfulApiResources.STORES,
      { ...options, store_id },
      ListStoresResponse,
    )
  }

  async getStore(storeId: number, options: Options = {}) {
    const store_id = z.number().parse(storeId)

    return await this.makeRequest(
      `${PrintfulApiResources.STORES}/${store_id}`,
      { ...options, store_id },
      GetStoreResponse,
    )
  }


  async getStoreStatistics(
    storeId: number,
    params: GetStoreStatisticsSearchInput,
    options: Options = {},
  ) {
    const searchParams = GetStoreStatisticsSearchInput.parse(params)
    const store_id = z.number().parse(storeId)

    return await this.makeRequest(
      `${PrintfulApiResources.STORES}/${store_id}/statistics`,
      {
        ...options,
        store_id,
        searchParams,
      },
      GetStoreStatisticsResponse,
    )
  }
}
