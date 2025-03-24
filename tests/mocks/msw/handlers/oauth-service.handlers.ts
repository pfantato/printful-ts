import { BASE_URL } from 'tests/mocks/constants'
import { oauthScopesScenarios } from 'tests/mocks/scenarios'
import { generateHandlers } from 'tests/mocks/utils'

export const oauthHandlers = (baseUrl = BASE_URL) =>
  generateHandlers(oauthScopesScenarios(baseUrl))
