import type { WarehouseProductsService } from '@printful-ts/services'

import { BASE_URL } from 'tests/mocks/constants'
import type { ServiceScenarioMock } from 'tests/utils'

import { getWarehouseProductScenarios } from './get-warehouse-product.scenarios'
import { listWarehouseProductsScenarios } from './list-warehouse-products.scenarios'

export const warehouseProductsScenarios = (
  baseUrl = BASE_URL,
): ServiceScenarioMock<WarehouseProductsService> => ({
  getWarehouseProduct: getWarehouseProductScenarios(baseUrl),
  listWarehouseProducts: listWarehouseProductsScenarios(baseUrl),
})

export * from './get-warehouse-product.scenarios'
export * from './list-warehouse-products.scenarios'
