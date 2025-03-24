import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { orderResponseMock } from 'tests/mocks/schemas'
import { generateErrorScenarios } from 'tests/mocks/utils'

export const getOrderScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDERS}/:orderId`

  return {
    success: [
      http.get(endpoint, () =>
        HttpResponse.json(orderResponseMock(), {
          status: 200,
        }),
      ),
    ],
    errors: generateErrorScenarios([401, 404], { endpoint }),
  }
}
