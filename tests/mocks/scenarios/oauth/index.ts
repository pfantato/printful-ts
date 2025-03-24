import { BASE_URL } from 'tests/mocks/constants'
import type { ScenarioMock, ServiceScenarioMock } from 'tests/utils'

import { listOauthScopesScenarios } from './list-oauth-scopes.scenarios'

export const oauthScopesScenarios = (
  baseUrl = BASE_URL,
): ServiceScenarioMock<{ isAllowed: ScenarioMock }> => ({
  isAllowed: listOauthScopesScenarios(baseUrl),
})

export * from './list-oauth-scopes.scenarios'
