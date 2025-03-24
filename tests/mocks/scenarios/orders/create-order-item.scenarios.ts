import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { OrderItemBody } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { orderItemResponseMock } from 'tests/mocks/schemas'
import {
  checkStoreIdHeader,
  generateErrorScenarios,
  getRequestBody,
  validateRequestSchema,
} from 'tests/mocks/utils'

export const createOrderItemScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDERS}/:orderId/order-items`

  return {
    success: [
      http.post(endpoint, async ({ request }) => {
        const {
          success: hasValidStoreId,
          store_id,
          response,
        } = checkStoreIdHeader(request)

        if (!hasValidStoreId) {
          return response
        }

        const body = await getRequestBody<OrderItemBody>(request)

        const { success, response: errorResponse } = validateRequestSchema(
          OrderItemBody,
          { ...body, store_id },
        )

        if (!success) {
          return errorResponse
        }

        return HttpResponse.json(orderItemResponseMock(), { status: 200 })
      }),
    ],
    errors: generateErrorScenarios([400, 401, 403, 404, 500], {
      endpoint,
      method: 'post',
    }),
  }
}
