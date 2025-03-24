import { BASE_URL } from 'tests/mocks/constants'
import { countriesScenarios } from 'tests/mocks/scenarios'
import { generateHandlers } from 'tests/mocks/utils'

export const countriesHandlers = (baseUrl = BASE_URL) =>
  generateHandlers(countriesScenarios(baseUrl))
