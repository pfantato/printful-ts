import { BASE_URL } from 'tests/mocks/constants'
import { ordersScenarios } from 'tests/mocks/scenarios'
import { generateHandlers } from 'tests/mocks/utils'

export const ordersHandlers = (baseUrl = BASE_URL) =>
  generateHandlers(ordersScenarios(baseUrl))
