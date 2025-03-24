import { http, HttpResponse } from 'msw'
import { faker } from '@faker-js/faker'

import type { PrintfulResponseError } from '@printful-ts/schemas'
import { BASE_URL } from 'tests/mocks/constants'

export const errorResponseInitMock = (status: number) => ({
  status,
  headers: {
    'Content-Type': 'application/problem+json',
  },
})

export const notFoundResponseMock = (
  detail = faker.lorem.sentence(),
): PrintfulResponseError => ({
  status: 404,
  title: 'NotFound',
  type: faker.internet.url(),
  detail,
  instance: faker.string.uuid(),
})

export const unauthorizedResponseMock = (
  detail = faker.lorem.sentence(),
): PrintfulResponseError => ({
  status: 401,
  title: 'Unauthorized',
  type: faker.internet.url(),
  detail,
  instance: faker.string.uuid(),
})

export const badRequestResponseMock = (
  detail = faker.lorem.sentence(),
): PrintfulResponseError => ({
  status: 400,
  title: 'BadRequest',
  type: faker.internet.url(),
  detail,
  instance: faker.string.uuid(),
})

export const forbiddenResponseMock = (
  detail = faker.lorem.sentence(),
): PrintfulResponseError => ({
  status: 403,
  title: 'BadRequest',
  type: faker.internet.url(),
  detail,
  instance: faker.string.uuid(),
})

export const internalServerErrorResponseMock = (
  detail = faker.lorem.sentence(),
): PrintfulResponseError => ({
  status: 500,
  title: 'InternalServerError',
  type: faker.internet.url(),
  detail,
  instance: faker.string.uuid(),
})

export const generateErrorResponse = status => {
  const responseMap = {
    400: {
      response: badRequestResponseMock(),
      init: errorResponseInitMock(400),
    },
    401: {
      response: unauthorizedResponseMock(),
      init: errorResponseInitMock(401),
    },
    403: {
      response: forbiddenResponseMock(),
      init: errorResponseInitMock(403),
    },
    404: {
      response: notFoundResponseMock(),
      init: errorResponseInitMock(404),
    },
    500: {
      response: internalServerErrorResponseMock(),
      init: errorResponseInitMock(500),
    },
  }

  return responseMap[status]
}

export const generateErrorScenarios = (
  statusCodes: number[],
  baseUrl = BASE_URL,
) =>
  statusCodes.map(status =>
    http.get(`${baseUrl}/v2/stores`, () => {
      const { response, init } = generateErrorResponse(status)
      return HttpResponse.json(response, init)
    }),
  )
