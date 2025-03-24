import type { Options } from 'ky'

import { PrintfulApiResources } from '@printful-ts/constants'
import {
  GetWarehouseProductResponse,
  ListWarehouseProductsResponse,
  InternalId,
  ListWarehouseProductsSearchInput,
} from '@printful-ts/schemas'

import { PrintfulApiService } from './printful-api.service'

export class WarehouseProductsService extends PrintfulApiService {
  async listWarehouseProducts(
    params?: ListWarehouseProductsSearchInput,
    options: Options = {},
  ) {
    const { store_id, ...searchParams } =
      ListWarehouseProductsSearchInput.parse(params)

    return await this.makeRequest(
      PrintfulApiResources.WAREHOUSE_PRODUCTS,
      { ...options, store_id, searchParams },
      ListWarehouseProductsResponse,
    )
  }

  async getWarehouseProduct(
    warehouseProductId: number,
    store_id?: number,
    options: Options = {},
  ) {
    const warehouse_product_id = InternalId.parse(warehouseProductId)

    return await this.makeRequest(
      `${PrintfulApiResources.WAREHOUSE_PRODUCTS}/${warehouse_product_id}`,
      {
        ...options,
        store_id,
      },
      GetWarehouseProductResponse,
    )
  }
}
