import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { generateErrorScenarios } from 'tests/mocks/utils'

export const deleteOrderItemScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDERS}/:orderId/order-items/:orderItemId`

  return {
    success: [
      http.delete(endpoint, () => HttpResponse.json(null, { status: 204 })),
    ],
    errors: generateErrorScenarios([400, 401, 403, 404], {
      endpoint,
      method: 'delete',
    }),
  }
}
