import { faker } from '@faker-js/faker'
import { http, HttpResponse, type HttpHandler } from 'msw'
import { z } from 'zod'

import type { PrintfulResponseError } from '@printful-ts/schemas'
import { deepMerge } from '@printful-ts/utils'

type ErrorResponseInitFn = (
  status: number,
  customInit?: Omit<ResponseInit, 'status'>,
) => ResponseInit

// Error Response Initialization
const errorResponseInitMock: ErrorResponseInitFn = (status, customInit) =>
  deepMerge(customInit, {
    status,
    headers: {
      'Content-Type': 'application/problem+json',
    },
  })

type ErrorResponseBase = Omit<PrintfulResponseError, 'status'>

type ErrorResponseMockFn = (
  customMock: PrintfulResponseError,
) => PrintfulResponseError

// Error Response Mock
const errorResponseMock: ErrorResponseMockFn = ({
  status,
  title,
  type = faker.internet.url(),
  detail = faker.hacker.phrase(),
  instance = faker.string.uuid(),
}) => {
  return { status, title, type, detail, instance }
}

// Specific Error Response Mocks
const badRequestResponseMock: ErrorResponseMockFn = (
  mocked = { title: 'Bad Request' },
) =>
  errorResponseMock({
    ...mocked,
    status: 400,
  })

const unauthorizedResponseMock: ErrorResponseMockFn = (
  mocked = { title: 'Unauthorized' },
) =>
  errorResponseMock({
    ...mocked,
    status: 401,
  })

const forbiddenResponseMock: ErrorResponseMockFn = (
  mocked = { title: 'Forbidden' },
) =>
  errorResponseMock({
    ...mocked,
    status: 403,
  })

const notFoundResponseMock: ErrorResponseMockFn = (
  mocked = { title: 'Not Found' },
) =>
  errorResponseMock({
    ...mocked,
    status: 404,
  })

const conflictResponseMock: ErrorResponseMockFn = (
  mocked = { title: 'Conflict' },
) =>
  errorResponseMock({
    ...mocked,
    status: 409,
  })

const tooManyRequestsResponseMock: ErrorResponseMockFn = (
  mocked = { title: 'Too Many Requests' },
) =>
  errorResponseMock({
    ...mocked,
    status: 429,
  })

const internalServerErrorResponseMock: ErrorResponseMockFn = (
  mocked = { title: 'Internal Server Error' },
) =>
  errorResponseMock({
    ...mocked,
    status: 500,
  })

enum Status {
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
}
export const HttpStatusCode = z.nativeEnum(Status)
export type HttpStatusCode = z.infer<typeof HttpStatusCode>

type MockErrorResponseFn = (
  status: HttpStatusCode,
  customMock?: ErrorResponseBase,
) => [PrintfulResponseError, ResponseInit]
// Predefined Error Responses
export const mockErrorResponse: MockErrorResponseFn = (status, customMock) => {
  const responses = {
    400: badRequestResponseMock,
    401: unauthorizedResponseMock,
    403: forbiddenResponseMock,
    404: notFoundResponseMock,
    409: conflictResponseMock,
    429: tooManyRequestsResponseMock,
    500: internalServerErrorResponseMock,
  }

  return [responses[status](customMock), errorResponseInitMock(status)]
}

// Error Scenario Options
type ErrorScenarioOptions = {
  endpoint: string
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
}

// Error Scenarios
export type ErrorScenarios = {
  status: HttpStatusCode
  handler: HttpHandler
  responseMock: PrintfulResponseError
  init: ResponseInit
}[]

type GenerateErrorScenariosFn = (
  statusCode: HttpStatusCode[],
  options: ErrorScenarioOptions,
) => ErrorScenarios

// Generate Error Scenarios Function
export const generateErrorScenarios: GenerateErrorScenariosFn = (
  statusCodes,
  { method, endpoint } = {
    method: 'get',
    endpoint: `endpoint-${faker.hacker.noun()}-${faker.number.int()}`,
  },
) =>
  [
    ...statusCodes,
    HttpStatusCode.enum.TOO_MANY_REQUESTS,
    HttpStatusCode.enum.INTERNAL_SERVER_ERROR,
  ].reduce((scenarios, status) => {
    const [responseMock, init] = mockErrorResponse(status)
    return [
      ...scenarios,
      {
        status,
        handler: http[method ?? 'get'](`${endpoint}`, () =>
          HttpResponse.json(responseMock, init),
        ),
        responseMock,
        init,
      },
    ]
  }, [])
