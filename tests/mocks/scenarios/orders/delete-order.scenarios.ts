import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { generateErrorScenarios } from 'tests/mocks/utils'

export const deleteOrderScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDERS}/:orderId`

  return {
    success: [
      http.delete(endpoint, () => HttpResponse.json(null, { status: 204 })),
    ],
    errors: generateErrorScenarios([401, 404, 409], {
      endpoint,
      method: 'delete',
    }),
  }
}
