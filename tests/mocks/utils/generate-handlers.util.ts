import type { ScenarioMock, ServiceScenarioMock } from 'tests/utils'

export const generateHandlers = <T>(scenarios: ServiceScenarioMock<T>) =>
  Object.values(scenarios)
    .map((scenario: ScenarioMock) => scenario.success)
    .flat()
