import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { ListOrderItemsSearchParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { listOrderItemsResponseMock } from 'tests/mocks/schemas'
import {
  checkStoreIdHeader,
  generateErrorScenarios,
  getSearchParams,
  validateRequestSchema,
} from 'tests/mocks/utils'

export const listOrderItemScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDERS}/:orderId/order-items`

  return {
    success: [
      http.get(endpoint, ({ request }) => {
        const {
          success: hasStoreId,
          store_id,
          response,
        } = checkStoreIdHeader(request)
        if (!hasStoreId) {
          return response
        }

        const params = getSearchParams(request)

        const { success, response: errorResponse } = validateRequestSchema(
          ListOrderItemsSearchParams,
          { store_id, ...params },
        )

        if (!success) {
          return errorResponse
        }

        return HttpResponse.json(listOrderItemsResponseMock(), { status: 200 })
      }),
    ],
    errors: generateErrorScenarios([401, 404], { endpoint }),
  }
}
