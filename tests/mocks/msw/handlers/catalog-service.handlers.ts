import { BASE_URL } from 'tests/mocks/constants'
import { catalogScenarios } from 'tests/mocks/scenarios/catalog'
import { generateHandlers } from 'tests/mocks/utils'

export const catalogHandlers = (baseUrl = BASE_URL) =>
  generateHandlers(catalogScenarios(baseUrl))
