import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { ListOrdersSearchParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { listOrdersResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  validateRequestSchema,
} from 'tests/mocks/utils'

export const listOrdersScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDERS}`

  return {
    success: [
      http.get(endpoint, ({ request }) => {
        const searchParams = Object.fromEntries(
          new URL(request.url).searchParams,
        )

        const { success, response: errorResponse } = validateRequestSchema(
          ListOrdersSearchParams,
          searchParams,
        )

        if (!success) {
          return errorResponse
        }

        return HttpResponse.json(listOrdersResponseMock(), { status: 200 })
      }),
    ],
    errors: generateErrorScenarios([400, 401], { endpoint }),
  }
}
