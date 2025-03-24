import { BASE_URL } from 'tests/mocks/constants'
import { shippingRatesScenarios } from 'tests/mocks/scenarios'
import { generateHandlers } from 'tests/mocks/utils'

export const shippingRatesHandlers = (baseUrl = BASE_URL) =>
  generateHandlers(shippingRatesScenarios(baseUrl))
