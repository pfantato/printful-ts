import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { confirmOrderResponseMock } from 'tests/mocks/schemas'
import { generateErrorScenarios } from 'tests/mocks/utils'

export const confirmOrderScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDERS}/:orderId/confirmation`

  return {
    success: [
      http.post(endpoint, () =>
        HttpResponse.json(confirmOrderResponseMock(), { status: 200 }),
      ),
    ],
    errors: generateErrorScenarios([401], {
      endpoint,
      method: 'post',
    }),
  }
}
