import type { CountriesService } from '@printful-ts/services'

import { BASE_URL } from 'tests/mocks/constants'
import type { ServiceScenarioMock } from 'tests/utils'

import { listCountriesScenarios } from './list-countries.scenarios'

export const countriesScenarios = (
  baseUrl = BASE_URL,
): ServiceScenarioMock<CountriesService> => ({
  listCountries: listCountriesScenarios(baseUrl),
})

export * from './list-countries.scenarios'
