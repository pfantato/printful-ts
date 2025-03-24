import type { StoresService } from '@printful-ts/services'

import { BASE_URL } from 'tests/mocks/constants'
import type { ServiceScenarioMock } from 'tests/utils'

import { listStoresScenarios } from './list-stores.scenario'
import { getStoreScenarios } from './get-store.scenario'
import { getStoreStatisticsScenarios } from './get-store-statistics.scenario'

export const storeScenarios = (
  baseUrl = BASE_URL,
): ServiceScenarioMock<StoresService> => ({
  listStores: listStoresScenarios(baseUrl),
  getStore: getStoreScenarios(baseUrl),
  getStoreStatistics: getStoreStatisticsScenarios(baseUrl),
})

export * from './get-store-statistics.scenario'
export * from './get-store.scenario'
export * from './list-stores.scenario'
