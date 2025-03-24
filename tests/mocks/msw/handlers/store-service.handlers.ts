import { BASE_URL } from 'tests/mocks/constants'
import { storeScenarios } from 'tests/mocks/scenarios'
import { generateHandlers } from 'tests/mocks/utils'

export const storeHandlers = (baseUrl = BASE_URL) =>
  generateHandlers(storeScenarios(baseUrl))
