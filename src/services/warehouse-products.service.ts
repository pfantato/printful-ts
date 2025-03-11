import type { Options } from 'ky'

import { WAREHOUSE_PRODUCTS_SERVICE } from '@printful-ts/constants'
import {
  GetWarehouseProductResponse,
  ListWarehouseProductsResponse,
  ListWarehouseProductsSearchParams,
} from '@printful-ts/schemas'

import { PrintfulApiService } from './printful-api.service'

export class WarehouseProductsService extends PrintfulApiService {
  async listWarehouseProducts(
    params: ListWarehouseProductsSearchParams,
    options: Options = {},
  ) {
    const { store_id, ...searchParams } =
      ListWarehouseProductsSearchParams.parse(params)

    return await this.request(
      WAREHOUSE_PRODUCTS_SERVICE,
      { ...options, store_id, searchParams },
      ListWarehouseProductsResponse,
    )
  }

  async getWarehouseProduct(
    warehouse_product_id: number,
    store_id?: number,
    options: Options = {},
  ) {
    return await this.request(
      `${WAREHOUSE_PRODUCTS_SERVICE}/${warehouse_product_id}`,
      {
        ...options,
        store_id,
      },
      GetWarehouseProductResponse,
    )
  }
}
