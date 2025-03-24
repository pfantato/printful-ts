import type { HttpHandler } from 'msw'
import type { PrintfulApiServiceMock } from 'tests/mocks'
import type { ErrorScenarios } from 'tests/mocks/utils'

export type ExtractServiceMethodNames<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown
    ? K extends keyof PrintfulApiServiceMock
      ? never
      : K
    : never
}[keyof T]

export type ScenarioMock = {
  success: Array<HttpHandler>
  errors: ErrorScenarios
}
export type ServiceScenarioMock<Service> = {
  [Key in keyof Pick<Service, ExtractServiceMethodNames<Service>>]: ScenarioMock
}

export type ServiceMockErrorScenarios<T> = {
  [Key in keyof Pick<T, ExtractServiceMethodNames<T>>]: Array<{
    status: number
    response: unknown
  }>
}
