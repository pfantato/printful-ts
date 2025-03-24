import type { ShippingRatesService } from '@printful-ts/services'

import { BASE_URL } from 'tests/mocks/constants'
import type { ServiceScenarioMock } from 'tests/utils'

import { calculateShippingRatesScenarios } from './calculate-shipping-rates.scenarios'

export const shippingRatesScenarios = (
  baseUrl = BASE_URL,
): ServiceScenarioMock<ShippingRatesService> => ({
  calculateShippingRates: calculateShippingRatesScenarios(baseUrl),
})

export * from './calculate-shipping-rates.scenarios'
