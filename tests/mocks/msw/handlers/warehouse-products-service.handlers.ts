import { BASE_URL } from 'tests/mocks/constants'
import { warehouseProductsScenarios } from 'tests/mocks/scenarios'
import { generateHandlers } from 'tests/mocks/utils'

export const warehouseProductsHandlers = (baseUrl = BASE_URL) =>
  generateHandlers(warehouseProductsScenarios(baseUrl))
